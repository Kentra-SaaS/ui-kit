import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("release quality gates", () => {
  it("keeps build, test, typecheck and pack validation before publish", () => {
    const workflow = readProjectFile(".github/workflows/release-ui-kit.yml");

    const installStepIndex = workflow.indexOf("run: npm ci");
    const testStepIndex = workflow.indexOf("run: npm run test");
    const typecheckStepIndex = workflow.indexOf("run: npm run test:typecheck");
    const buildStepIndex = workflow.indexOf("run: npm run build");
    const packStepIndex = workflow.indexOf("run: npm run pack:dry");
    const publishStepIndex = workflow.indexOf("name: Publish package");

    expect(installStepIndex).toBeGreaterThanOrEqual(0);
    expect(testStepIndex).toBeGreaterThanOrEqual(0);
    expect(typecheckStepIndex).toBeGreaterThanOrEqual(0);
    expect(buildStepIndex).toBeGreaterThanOrEqual(0);
    expect(packStepIndex).toBeGreaterThanOrEqual(0);
    expect(publishStepIndex).toBeGreaterThanOrEqual(0);

    expect(testStepIndex).toBeGreaterThan(installStepIndex);
    expect(typecheckStepIndex).toBeGreaterThan(testStepIndex);
    expect(buildStepIndex).toBeGreaterThan(typecheckStepIndex);
    expect(packStepIndex).toBeGreaterThan(buildStepIndex);
    expect(publishStepIndex).toBeGreaterThan(packStepIndex);
  });

  it("keeps release branch and version guard semantics", () => {
    const workflow = readProjectFile(".github/workflows/release-ui-kit.yml");

    expect(workflow).toContain("branches:");
    expect(workflow).toContain("- master");
    expect(workflow).toContain("id: version_check");
    expect(workflow).toContain("if: steps.version_check.outputs.exists == 'false'");
    expect(workflow).toContain("if: steps.version_check.outputs.exists == 'true'");
  });

  it("uses Node 24-based GitHub Action majors in both workflows", () => {
    const releaseWorkflow = readProjectFile(".github/workflows/release-ui-kit.yml");
    const mrWorkflow = readProjectFile(".github/workflows/mr-check.yml");

    expect(releaseWorkflow).toContain("uses: actions/checkout@v6");
    expect(releaseWorkflow).toContain("uses: actions/setup-node@v6");
    expect(releaseWorkflow).toContain("uses: actions/upload-artifact@v7");
    expect(releaseWorkflow).toContain("uses: actions/download-artifact@v8");

    expect(mrWorkflow).toContain("uses: actions/checkout@v6");
    expect(mrWorkflow).toContain("uses: actions/setup-node@v6");
  });

  it("keeps publish-to-release automation with tag + release + package link", () => {
    const workflow = readProjectFile(".github/workflows/release-ui-kit.yml");

    const publishStepIndex = workflow.indexOf("name: Publish package");
    const packageUrlStepIndex = workflow.indexOf("id: package_url");
    const releaseTagStepIndex = workflow.indexOf("id: release_tag");
    const releaseStepIndex = workflow.indexOf("gh release create \"$TAG\"");

    expect(workflow).toContain("contents: write");
    expect(workflow).toContain("packages: write");
    expect(workflow).toContain("TARBALL=$(find ./artifacts -maxdepth 1 -name '*.tgz' -print -quit)");
    expect(workflow).toContain('npm publish "$TARBALL"');
    expect(workflow).toContain("gh api \"/orgs/${{ github.repository_owner }}/packages/npm/${ENCODED_NAME}\"");
    expect(workflow).toContain("git push origin \"refs/tags/${TAG}\"");
    expect(workflow).toContain("--verify-tag");
    expect(workflow).toContain("--generate-notes");
    expect(workflow).toContain("[GitHub Packages](${PACKAGE_URL})");
    expect(workflow).toContain("Skip publish and release (version already exists)");

    expect(packageUrlStepIndex).toBeGreaterThan(publishStepIndex);
    expect(releaseTagStepIndex).toBeGreaterThan(packageUrlStepIndex);
    expect(releaseStepIndex).toBeGreaterThan(releaseTagStepIndex);
  });
});

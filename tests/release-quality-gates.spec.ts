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
    const publishStepIndex = workflow.indexOf("run: npm publish");

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
});

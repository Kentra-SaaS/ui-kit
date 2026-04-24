import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface TokenLike {
  readonly css: string;
  readonly var: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isTokenLike = (value: unknown): value is TokenLike =>
  isRecord(value) && typeof value.css === "string" && typeof value.var === "string";

const walkTokens = (source: unknown, collector: (token: TokenLike) => void): void => {
  if (isTokenLike(source)) {
    collector(source);
    return;
  }

  if (!isRecord(source)) {
    return;
  }

  for (const value of Object.values(source)) {
    walkTokens(value, collector);
  }
};

export const collectTokens = (source: unknown): TokenLike[] => {
  const tokens: TokenLike[] = [];
  walkTokens(source, (token) => tokens.push(token));
  return tokens;
};

const listScssFiles = (
  directory: string,
  ignoredDirectoryNames: ReadonlySet<string>,
): string[] => {
  const files: string[] = [];

  for (const dirent of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, dirent.name);

    if (dirent.isDirectory()) {
      if (ignoredDirectoryNames.has(dirent.name)) {
        continue;
      }

      files.push(...listScssFiles(absolutePath, ignoredDirectoryNames));
      continue;
    }

    if (dirent.isFile() && absolutePath.endsWith(".scss")) {
      files.push(absolutePath);
    }
  }

  return files;
};

export const collectDeclaredCssVariables = (stylesDirectory: string): Set<string> => {
  const declarations = new Set<string>();
  const declarationRegex = /--k-[a-z0-9-]+(?=\s*:)/g;
  const ignoredDirectoryNames = new Set<string>(["generated"]);

  for (const filePath of listScssFiles(stylesDirectory, ignoredDirectoryNames)) {
    const source = readFileSync(filePath, "utf8");
    const matches = source.match(declarationRegex) ?? [];

    for (const match of matches) {
      declarations.add(match);
    }
  }

  return declarations;
};

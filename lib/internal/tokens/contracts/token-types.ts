export type CssTokenName = `--k-${string}`;

export type CssVarRef<TTokenName extends CssTokenName = CssTokenName> = `var(${TTokenName})`;

export interface CssToken<TTokenName extends CssTokenName = CssTokenName> {
  readonly css: TTokenName;
  readonly var: CssVarRef<TTokenName>;
}

export const token = <TTokenName extends CssTokenName>(css: TTokenName): CssToken<TTokenName> => ({
  css,
  var: `var(${css})` as CssVarRef<TTokenName>,
});

export interface TokenMap {
  readonly [key: string]: CssToken | TokenMap;
}

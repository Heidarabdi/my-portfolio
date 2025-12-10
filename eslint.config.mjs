import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import astroParser from "astro-eslint-parser";

export default [
  {
    ignores: [".astro/", "dist/", "node_modules/", "scripts/"],
  },
  ...eslintPluginAstro.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // "astro/no-set-html-directive": "error"
    },
  },
];

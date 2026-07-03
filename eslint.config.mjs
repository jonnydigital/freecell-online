import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next.bak/**",
    ".claude/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    // Build-time scripts (use require(), not app code)
    "scripts/**",
    "dump-dom.js",
    "run-qa.js",
    "screenshot-test.js",
    // Local scratch space for QA/audit one-offs — never app code
    "tmp/**",
  ]),
  {
    rules: {
      // Data fetching and state initialization in useEffect is standard React.
      // The rule flags async patterns that are actually correct.
      "react-hooks/set-state-in-effect": "warn",
      // Legacy game wrappers and long-form content predate the stricter Next 16 lint set.
      // Keep surfacing these as debt without blocking deploys.
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
]);

export default eslintConfig;

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
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build-time scripts (use require(), not app code)
    "scripts/**",
  ]),
  {
    rules: {
      // Data fetching and state initialization in useEffect is standard React.
      // The rule flags async patterns that are actually correct.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;

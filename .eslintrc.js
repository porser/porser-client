module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    JSX: true
  },
  plugins: [
    "eslint-plugin-import",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "@typescript-eslint/eslint-plugin"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "no-alert": "error",
    "no-console": "warn",
    "prefer-const": "error",
    "default-case": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@next/next/no-img-element": "off"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      parserOptions: {
        sourceType: "module",
        project: ["./tsconfig.json"]
      }
    }
  ],
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      node: {
        paths: ["."]
      }
    }
  }
};

import eslintConfig from "@package/eslint-config/native";
import { defineConfig } from "eslint/config";

export default defineConfig(...eslintConfig, {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text"],
            message: "Please import from `@/components/native` instead.",
          },
          {
            name: "heroui-native",
            importNames: ["Button", "ButtonLabel"],
            message: "Please import from `@/components/button` instead.",
          },
        ],
      },
    ],
  },
});

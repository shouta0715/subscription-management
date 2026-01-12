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
          {
            name: "react-native-safe-area-context",
            importNames: ["SafeAreaView"],
            message:
              "Please import from `@/components/native/safe-area-view` instead.",
          },
          {
            name: "expo-glass-effect",
            importNames: ["GlassView", "GlassContainer"],
            message:
              "Please import from `@/components/native/glass-effect` instead.",
          },
          {
            name: "react-native-context-menu-view",
            importNames: ["default"],
            message:
              "Please import from `@/components/native/context-menu` instead.",
          },
        ],
      },
    ],
  },
});

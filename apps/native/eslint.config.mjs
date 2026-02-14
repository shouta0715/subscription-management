import eslintConfig from "@package/eslint-config/native";
import { defineConfig } from "eslint/config";

export default defineConfig(...eslintConfig, {
  rules: {
    "jsx-a11y/aria-role": "off",
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
            name: "react-native-safe-area-context",
            importNames: ["SafeAreaView"],
            message:
              "Please import from `@/components/native/safe-area-view` instead.",
          },
          {
            name: "@expo/ui/swift-ui",
            importNames: ["Host"],
            message: "Please import from `@/components/native/host` instead.",
          },
        ],
      },
    ],
  },
});

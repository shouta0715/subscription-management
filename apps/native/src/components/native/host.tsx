/* eslint-disable no-restricted-imports */
import { Host as ExpoHost } from "@expo/ui/swift-ui";
import { ComponentPropsWithRef } from "react";
import { useUniwind, withUniwind } from "uniwind";

type Props = ComponentPropsWithRef<typeof ExpoHost>;
const ThemeHost = (props: Props) => {
  const { theme } = useUniwind();

  return <ExpoHost colorScheme={theme} {...props} />;
};
export const Host = withUniwind(ThemeHost);

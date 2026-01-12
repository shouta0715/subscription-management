// eslint-disable-next-line no-restricted-imports
import { SafeAreaView as ReactNativeSafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledSafeAreaView = withUniwind(ReactNativeSafeAreaView);

export const SafeAreaView = StyledSafeAreaView;

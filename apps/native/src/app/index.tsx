import { Link, Redirect } from "expo-router";
import { View } from "react-native";
import { Button, ButtonLabel } from "@/components/button";
import {
  currentOnboardingStep,
  currentOnboardingStepIsFirstStep,
} from "@/features/onboarding/utils/step";

function Page() {
  // MEMO: すでにオンボーディングを行っている場合はそのステップにリダイレクト
  if (!currentOnboardingStepIsFirstStep()) {
    return <Redirect href={`/(onboarding)/${currentOnboardingStep()}`} />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Link asChild href="/(onboarding)/choose-signup">
        <Button size="sm" variant="primary">
          <ButtonLabel bold>はじめる</ButtonLabel>
        </Button>
      </Link>
    </View>
  );
}

export default Page;

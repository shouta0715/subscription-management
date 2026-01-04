import { isNullish } from "@package/lib/guard";
import { parseSchema } from "@package/lib/parser";
import { OnboardingStep, onboardingStepSchema } from "../schema/step";
import { storageClient } from "@/lib/storage/client";
import { STORAGE_KEYS } from "@/lib/storage/keys";

export const currentOnboardingStep = (): OnboardingStep => {
  const currentStep = storageClient.getString(
    STORAGE_KEYS.onboarding.currentStep,
  );

  return isNullish(currentStep)
    ? "choose-signup"
    : parseSchema(onboardingStepSchema, currentStep);
};

export const currentOnboardingStepIsFirstStep = () =>
  currentOnboardingStep() === "choose-signup";

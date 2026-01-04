import * as v from "valibot";

// TODO: Add more steps
export const onboardingStepSchema = v.picklist(["choose-signup"]);

export type OnboardingStep = v.InferOutput<typeof onboardingStepSchema>;

import { isNullish } from "@package/lib/guard";
import { storageClient } from "@/lib/storage/client";
import { STORAGE_KEYS } from "@/lib/storage/keys";

export const isOnboardingCompleted = () => {
  const onboardingCompleted = storageClient.getBoolean(
    STORAGE_KEYS.onboarding.isCompleted,
  );

  return isNullish(onboardingCompleted) ? false : onboardingCompleted;
};

const ONBOARDING_KEYS = {
  isCompleted: "isCompleted",
  currentStep: "currentStep",
} as const;

const USER_SETTING_KEYS = {
  theme: "theme",
  shouldReduceMotion: "shouldReduceMotion",
} as const;

export const STORAGE_KEYS = {
  onboarding: ONBOARDING_KEYS,
  userSetting: USER_SETTING_KEYS,
} as const;

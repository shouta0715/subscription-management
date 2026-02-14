import { passkey } from "@better-auth/passkey";
import { BetterAuthOptions } from "better-auth";
import { anonymous } from "better-auth/plugins";
import { AppEnv } from "@/types/app-env";

const socialProvidersOptions = (
  env: CloudflareBindings,
): BetterAuthOptions["socialProviders"] => ({
  google: {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  },
  apple: {
    clientId: env.APPLE_CLIENT_ID,
    clientSecret: env.APPLE_CLIENT_SECRET,
  },
});

/**
 * @see https://www.better-auth.com/docs/authentication/apple#configure-the-provider
 */
const APPLE_TRUSTED_ORIGIN = "https://appleid.apple.com";

/**
 * @see https://www.better-auth.com/docs/integrations/expo#scheme-and-trusted-origins
 */
const trustedOrigins = (
  env: AppEnv["Bindings"],
): BetterAuthOptions["trustedOrigins"] => [
  env.CLIENT_URL,
  APPLE_TRUSTED_ORIGIN,
  ...(env.ENV === "development"
    ? [
        "exp://*/*",
        "exp://10.0.0.*:*/*",
        "exp://192.168.*.*:*/*",
        "exp://172.*.*.*:*/*",
        "exp://localhost:*/*",
      ]
    : []),
];

export const betterAuthOptions = (
  env: CloudflareBindings,
): BetterAuthOptions => ({
  appName: "Sub Mana",
  socialProviders: socialProvidersOptions(env),
  trustedOrigins: trustedOrigins(env),
  plugins: [
    passkey(),
    /** @see https://github.com/better-auth/better-auth/issues/5568 */
    anonymous(),
  ],
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});

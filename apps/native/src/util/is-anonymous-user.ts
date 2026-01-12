import { isNullish } from "@package/lib/guard";
import { useSession } from "@/lib/auth-client";

type UseSessionReturnType = NonNullable<ReturnType<typeof useSession>["data"]>;

export const isAnonymousUser = (
  session: UseSessionReturnType | null,
): boolean => {
  if (isNullish(session)) return false;

  if (session.user.isAnonymous) return true;

  return false;
};

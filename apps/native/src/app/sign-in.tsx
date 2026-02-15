import { isNullish } from "@package/lib/guard";
import { Redirect } from "expo-router";
import { PageContainer } from "@/components/container/page-container";
import { SignIn } from "@/features/auth/components/sign-in";
import { useSession } from "@/lib/auth-client";
import { isAnonymousUser } from "@/util/is-anonymous-user";

function Page() {
  const { data: session } = useSession();

  if (!isNullish(session) && !isAnonymousUser(session)) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <PageContainer className="flex-1">
      <SignIn />
    </PageContainer>
  );
}

export default Page;

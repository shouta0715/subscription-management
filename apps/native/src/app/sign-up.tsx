import { isNullish } from "@package/lib/guard";
import { Redirect } from "expo-router";
import { PageContainer } from "@/components/container/page-container";
import { SignUp } from "@/features/auth/components/sing-up";
import { useSession } from "@/lib/auth-client";
import { isAnonymousUser } from "@/util/is-anonymous-user";

function Page() {
  const { data: session } = useSession();

  // MEMO: 匿名アカウントじゃない場合はダッシュボードにリダイレクト
  if (!isNullish(session) && !isAnonymousUser(session)) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <PageContainer className="flex-1">
      <SignUp />
    </PageContainer>
  );
}

export default Page;

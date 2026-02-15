import { Button, VStack } from "@expo/ui/swift-ui";
import { isNullish } from "@package/lib/guard";
import { Link, Redirect } from "expo-router";
import React from "react";
import { PageContainer } from "@/components/container/page-container";
import { Host } from "@/components/native/host";
import { useSession } from "@/lib/auth-client";

function Page() {
  const { data: session } = useSession();
  const isAuthenticated = !isNullish(session);

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <PageContainer className="pt-safe flex-1">
      <Host className="flex-1">
        <VStack spacing={4}>
          <Link asChild href="/sign-up">
            <Button label="新しくはじめる" />
          </Link>

          <Link asChild href="/sign-in">
            <Button label="既存のアカウントでログイン" />
          </Link>
        </VStack>
      </Host>
    </PageContainer>
  );
}

export default Page;

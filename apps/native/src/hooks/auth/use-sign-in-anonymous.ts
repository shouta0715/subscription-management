import { useMutation } from "@tanstack/react-query";
import { betterAuthClient } from "@/lib/auth-client";

type Props = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useSignInAnonymous({ onSuccess, onError }: Props = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await betterAuthClient.signIn.anonymous();

      if (error) {
        throw new Error(error.message ?? "Failed to sign in anonymously", {
          cause: error,
        });
      }

      return data;
    },
    onSuccess,
    onError,
  });

  return { signInAnonymous: mutateAsync, isPending };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forwardRef } from "react";

import { Message, sendMessage } from "~/lib/messaging";

export const Logout = forwardRef<HTMLButtonElement>((_, ref) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => sendMessage(Message.SESSION_DELETE, undefined),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [Message.SESSION_GET] }),
  });

  return (
    <button
      className="w-full text-left font-sans"
      onClick={() => mutate()}
      ref={ref}
    >
      Log out
    </button>
  );
});

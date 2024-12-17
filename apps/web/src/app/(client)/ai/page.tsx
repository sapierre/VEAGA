"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { marked } from "marked";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-web/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import { ScrollArea } from "@turbostarter/ui-web/scroll-area";
import { Textarea } from "@turbostarter/ui-web/textarea";

import { api } from "~/lib/api/react";

import type { KeyboardEvent } from "react";

const EXAMPLES = [
  {
    icon: Icons.Globe2,
    prompt: "Tell the history of the internet",
  },
  {
    icon: Icons.GraduationCap,
    prompt: "Quiz me on the world capitals",
  },
  {
    icon: Icons.Atom,
    prompt: "Explain quantum computing",
  },
  {
    icon: Icons.Brain,
    prompt: "Describe a real-world AI case",
  },
] as const;

const promptSchema = z.object({
  prompt: z.string(),
});

const AI = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const { mutate, isPending } = api.ai.chat.useMutation({
    onMutate: () => {
      setIsThinking(true);
    },
    onSuccess: async (data) => {
      for await (const chunk of data) {
        setMessages((prev) => {
          if (prev.at(-1)?.role === "user") {
            return [...prev, { role: "assistant", content: chunk }];
          }

          return [
            ...prev.slice(0, -1),
            {
              role: "assistant",
              content: (prev.at(-1)?.content ?? "") + chunk,
            },
          ];
        });

        setIsThinking(false);
      }
    },
  });

  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
  });

  const messagesToDisplay = messages.filter((message) =>
    ["assistant", "user"].includes(message.role),
  );

  const onSubmit = (values: z.infer<typeof promptSchema>) => {
    const message = { role: "user", content: values.prompt } as const;
    form.reset({
      prompt: "",
    });
    mutate({
      messages: [...messages, message],
    });
    setMessages((prev) => [...prev, message]);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex w-full max-w-2xl grow flex-col items-center justify-between gap-6 self-stretch">
      <ScrollArea className="w-full grow">
        <div className="prose flex flex-col gap-2 dark:prose-invert">
          {messagesToDisplay.map((message) => (
            <article
              key={message.content}
              className={cn("max-w-full", {
                "max-w-4/5 self-end rounded-lg bg-muted px-5 py-2.5":
                  message.role === "user",
              })}
            >
              {message.role === "assistant" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(message.content) as string,
                  }}
                ></div>
              ) : (
                message.content
              )}
            </article>
          ))}
          {isThinking && <span className="block py-5">Thinking...</span>}
        </div>
      </ScrollArea>

      {!messagesToDisplay.length && !isThinking && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {EXAMPLES.map((example) => (
            <Button
              onClick={() => onSubmit({ prompt: example.prompt })}
              key={example.prompt}
              variant="outline"
              className="h-auto grow flex-col items-start gap-2 whitespace-normal py-3 text-left text-muted-foreground"
            >
              <example.icon className="size-5 shrink-0" />
              {example.prompt}
            </Button>
          ))}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sticky bottom-0 w-full bg-background pb-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Ask a question..."
                    className="resize-none text-base"
                    rows={3}
                    onKeyDown={handleKeyDown}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="absolute bottom-6 right-2 size-8 rounded-full"
            size="icon"
            type="submit"
            disabled={isPending}
          >
            <Icons.ArrowUp className="size-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AI;

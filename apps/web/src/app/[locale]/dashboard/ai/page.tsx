"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { marked } from "marked";
import { useState } from "react";

import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";
import { ScrollArea } from "@turbostarter/ui-web/scroll-area";
import { Textarea } from "@turbostarter/ui-web/textarea";

import { api } from "~/lib/api/client";

import type { KeyboardEvent } from "react";

const EXAMPLES = [
  {
    icon: Icons.Globe2,
    prompt: "ai.prompt.history",
  },
  {
    icon: Icons.GraduationCap,
    prompt: "ai.prompt.capitals",
  },
  {
    icon: Icons.Atom,
    prompt: "ai.prompt.quantum",
  },
  {
    icon: Icons.Brain,
    prompt: "ai.prompt.realWorld",
  },
] as const;

const AI = () => {
  const { t } = useTranslation("marketing");
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: api.ai.chat.$url().toString(),
    }),
  });

  const messagesToDisplay = messages.filter((message) =>
    ["assistant", "user"].includes(message.role),
  );

  const isLoading = ["submitted", "streaming"].includes(status);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-between gap-6 self-stretch px-4">
      <ScrollArea className="w-full grow">
        <div className="prose flex flex-col gap-2 dark:prose-invert">
          {messagesToDisplay.map((message) => (
            <article
              key={message.id}
              className={cn("max-w-full", {
                "max-w-4/5 self-end rounded-lg bg-muted px-5 py-2.5":
                  message.role === "user",
              })}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return message.role === "assistant" ? (
                      <div
                        key={`${message.id}-${i}`}
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(part.text),
                        }}
                      ></div>
                    ) : (
                      <div key={`${message.id}-${i}`}>{part.text}</div>
                    );
                }
              })}
            </article>
          ))}
          {isLoading && (
            <Icons.Loader className="size-5 animate-spin text-muted-foreground" />
          )}
        </div>
      </ScrollArea>

      {!messagesToDisplay.length && !isLoading && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {EXAMPLES.map((example) => (
            <Button
              onClick={() => sendMessage({ text: t(example.prompt) })}
              key={example.prompt}
              variant="outline"
              className="h-auto grow flex-col items-start gap-2 whitespace-normal py-3 text-left text-muted-foreground"
            >
              <example.icon className="size-5 shrink-0" />
              {t(example.prompt)}
            </Button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessage({ text: input });
          setInput("");
        }}
        className="sticky bottom-0 w-full bg-background pb-4"
      >
        <Textarea
          placeholder={t("ai.placeholder")}
          className="resize-none text-base"
          rows={3}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />

        <Button
          className="absolute bottom-6 right-2 size-8 rounded-full"
          size="icon"
          type="submit"
          disabled={isLoading}
          aria-label={t("ai.cta")}
        >
          <Icons.ArrowUp className="size-5" />
        </Button>
      </form>
    </div>
  );
};

export default AI;

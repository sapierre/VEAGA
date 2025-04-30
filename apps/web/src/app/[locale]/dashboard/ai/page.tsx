"use client";

import { useChat } from "@ai-sdk/react";
import { marked } from "marked";

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
  const { messages, handleSubmit, append, input, status, handleInputChange } =
    useChat({
      api: api.ai.chat.$url().toString(),
    });

  const messagesToDisplay = messages.filter((message) =>
    ["assistant", "user"].includes(message.role),
  );

  const isLoading = ["submitted", "streaming"].includes(status);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-between gap-6 self-stretch px-4">
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
          {isLoading && (
            <Icons.Loader className="size-5 animate-spin text-muted-foreground" />
          )}
        </div>
      </ScrollArea>

      {!messagesToDisplay.length && !isLoading && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {EXAMPLES.map((example) => (
            <Button
              onClick={() =>
                append({ role: "user", content: t(example.prompt) })
              }
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
        onSubmit={handleSubmit}
        className="sticky bottom-0 w-full bg-background pb-4"
      >
        <Textarea
          placeholder={t("ai.placeholder")}
          className="resize-none text-base"
          rows={3}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          value={input}
          onChange={handleInputChange}
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

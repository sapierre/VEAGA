"use client";

import { useChat } from "ai/react";
import { marked } from "marked";

import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";
import { ScrollArea } from "@turbostarter/ui-web/scroll-area";
import { Textarea } from "@turbostarter/ui-web/textarea";

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

const AI = () => {
  const {
    messages,
    handleSubmit,
    append,
    input,
    isLoading,
    handleInputChange,
  } = useChat({
    api: "/api/ai/chat",
  });

  const messagesToDisplay = messages.filter((message) =>
    ["assistant", "user"].includes(message.role),
  );

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
              onClick={() => append({ role: "user", content: example.prompt })}
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

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 w-full bg-background pb-4"
      >
        <Textarea
          placeholder="Ask a question..."
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
        >
          <Icons.ArrowUp className="size-5" />
        </Button>
      </form>
    </div>
  );
};

export default AI;

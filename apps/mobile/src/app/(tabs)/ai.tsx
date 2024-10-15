import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, ScrollView, View } from "react-native";
import Markdown from "react-native-marked";
import { z } from "zod";

import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormItem,
  FormTextarea,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { api } from "~/lib/api/trpc";

import type { CoreMessage } from "ai";

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

export default function AI() {
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<
    { role: CoreMessage["role"]; content: string }[]
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
    const message = { role: "user", content: values.prompt.trim() } as const;
    form.reset({
      prompt: "",
    });
    mutate({
      messages: [...messages, message],
    });
    setMessages((prev) => [...prev, message]);
  };

  return (
    <View className="flex-1 bg-background px-6">
      <ScrollView
        contentContainerClassName="flex pt-10 grow items-start justify-start gap-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {messagesToDisplay.map((message) => (
          <View
            key={message.content}
            className={cn("max-w-full", {
              "max-w-4/5 self-end rounded-lg bg-muted px-5 py-2.5":
                message.role === "user",
            })}
          >
            {message.role === "assistant" ? (
              <Markdown
                value={message.content.trim()}
                flatListProps={{
                  scrollEnabled: false,
                  style: {
                    flexGrow: 0,
                  },
                }}
              />
            ) : (
              <Text className="text-lg">{message.content}</Text>
            )}
          </View>
        ))}
        {isThinking && <Text className="py-2.5 text-lg">Thinking...</Text>}
      </ScrollView>

      {!messagesToDisplay.length && !isThinking && (
        <FlatList
          numColumns={2}
          data={EXAMPLES}
          contentContainerClassName="gap-2 mt-auto mb-6"
          columnWrapperClassName="gap-2"
          renderItem={({ item }) => (
            <Button
              onPress={() => onSubmit({ prompt: item.prompt })}
              key={item.prompt}
              variant="outline"
              className="native:h-auto h-auto grow flex-col items-start gap-2 py-3 text-left"
            >
              <item.icon
                className="shrink-0 text-muted-foreground"
                width={20}
                height={20}
              />
              <Text className="max-w-32 text-base text-muted-foreground">
                {item.prompt}
              </Text>
            </Button>
          )}
        />
      )}

      <Form {...form}>
        <View className="relative bg-background pb-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormTextarea
                  placeholder="Ask a question..."
                  disabled={isPending}
                  onSubmitEditing={form.handleSubmit(onSubmit)}
                  blurOnSubmit={false}
                  {...field}
                />
              </FormItem>
            )}
          />

          <Button
            size="icon"
            className="absolute bottom-6 right-2 rounded-full"
            disabled={isPending}
            onPress={form.handleSubmit(onSubmit)}
          >
            <Icons.ArrowUp className="text-background" />
          </Button>
        </View>
      </Form>
    </View>
  );
}

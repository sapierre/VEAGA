import { useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { FlatList, ScrollView, View } from "react-native";
import Markdown from "react-native-marked";

import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";
import { Textarea } from "@turbostarter/ui-mobile/textarea";

import { getBaseUrl } from "~/lib/api/utils";

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

export default function AI() {
  const {
    messages,
    error,
    append,
    handleInputChange,
    input,
    handleSubmit,
    isLoading,
  } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: `${getBaseUrl()}/api/ai/chat`,
    onError: (error) => console.error(error),
  });

  if (error)
    return (
      <View className="flex-1 bg-background px-6">
        <Text>{error.message}</Text>
      </View>
    );

  const messagesToDisplay = messages.filter((message) =>
    ["assistant", "user"].includes(message.role),
  );

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
        {isLoading && (
          <View className="py-2.5">
            <Icons.Loader className="size-5 animate-spin text-muted-foreground" />
          </View>
        )}
      </ScrollView>

      {!messagesToDisplay.length && (
        <FlatList
          numColumns={2}
          data={EXAMPLES}
          contentContainerClassName="gap-2 mt-auto mb-6"
          columnWrapperClassName="gap-2"
          renderItem={({ item }) => (
            <Button
              onPress={() => append({ role: "user", content: item.prompt })}
              key={item.prompt}
              variant="outline"
              className="native:h-auto h-auto grow flex-col items-start gap-2 py-3 text-left"
            >
              <item.icon
                className="shrink-0 text-muted-foreground"
                width={20}
                height={20}
              />
              <Text className="max-w-40 text-base text-muted-foreground">
                {item.prompt}
              </Text>
            </Button>
          )}
        />
      )}

      <View className="relative bg-background pb-4">
        <Textarea
          placeholder="Ask a question..."
          value={input}
          onSubmitEditing={(e) => {
            handleSubmit(e);
            e.preventDefault();
          }}
          onChange={(e) =>
            handleInputChange({
              ...e,
              target: {
                ...e.target,
                value: e.nativeEvent.text,
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
        />

        <Button
          size="icon"
          className="absolute bottom-6 right-2 rounded-full"
          disabled={isLoading}
          onPress={() => handleSubmit()}
        >
          <Icons.ArrowUp className="text-background" />
        </Button>
      </View>
    </View>
  );
}

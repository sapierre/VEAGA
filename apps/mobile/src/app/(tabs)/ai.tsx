import { useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { FlatList, ScrollView, View } from "react-native";
import Markdown from "react-native-marked";

import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";
import { Textarea } from "@turbostarter/ui-mobile/textarea";

import { api } from "~/lib/api";

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

export default function AI() {
  const { t } = useTranslation("marketing");
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
    api: api.ai.chat.$url().toString(),
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
          data={EXAMPLES}
          contentContainerClassName="gap-2 mt-auto mb-6"
          renderItem={({ item }) => (
            <Button
              onPress={() => append({ role: "user", content: t(item.prompt) })}
              key={item.prompt}
              variant="outline"
              className="native:h-auto h-auto grow flex-row justify-start gap-4 py-3 text-left"
            >
              <item.icon
                className="shrink-0 text-muted-foreground"
                width={20}
                height={20}
              />
              <Text className="text-base text-muted-foreground">
                {t(item.prompt)}
              </Text>
            </Button>
          )}
        />
      )}

      <View className="relative bg-background pb-4">
        <Textarea
          placeholder={t("ai.placeholder")}
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
          accessibilityLabel={t("ai.cta")}
        >
          <Icons.ArrowUp className="text-background" />
        </Button>
      </View>
    </View>
  );
}

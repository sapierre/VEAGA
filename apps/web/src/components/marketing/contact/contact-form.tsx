"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@turbostarter/ui-web/button";
import { Card, CardContent } from "@turbostarter/ui-web/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import { Input } from "@turbostarter/ui-web/input";
import { Textarea } from "@turbostarter/ui-web/textarea";

import { sendContactForm } from "./actions";
import { contactFormSchema, MAX_MESSAGE_LENGTH } from "./utils/schema";

import type { ContactFormPayload } from "./utils/schema";

export function ContactForm() {
  const form = useForm<ContactFormPayload>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const message = form.watch("message");

  const onSubmit = async (data: ContactFormPayload) => {
    const { error } = await sendContactForm(data);

    if (error) {
      return toast.error(error);
    }

    toast.success("Message sent!", {
      description: "Thank you for your message. We'll get back to you soon.",
    });

    form.reset();
  };

  return (
    <Card className="w-full max-w-lg border-none shadow-none">
      <CardContent className="w-full p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2 flex justify-between">
                    <span>Message</span>
                    <span className="text-xs text-muted-foreground">
                      {message.length}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How can we help you?"
                      className="min-h-[120px]"
                      maxLength={MAX_MESSAGE_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Icons.Loader2 className="size-5 animate-spin" />
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

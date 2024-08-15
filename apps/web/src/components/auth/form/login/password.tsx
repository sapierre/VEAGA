"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_PROVIDER, loginSchema } from "@turbostarter/auth";
import { Icons } from "@turbostarter/ui";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@turbostarter/ui/web";

import { useAuthFormStore } from "~/components/auth/form/store";
import { onPromise } from "~/utils";

import { login } from "../actions";

import type { LoginData } from "@turbostarter/auth";

export const LoginForm = memo(() => {
  const searchParams = useSearchParams();
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const redirectTo = searchParams.get("redirectTo") ?? "/";

  const onSubmit = async (data: LoginData) => {
    setProvider(AUTH_PROVIDER.PASSWORD);
    setIsSubmitting(true);

    const loadingToast = toast.loading("Signing in...");
    const { error } = await login(data);

    if (error) {
      setIsSubmitting(false);
      return toast.error(`${error}!`, { id: loadingToast });
    }

    toast.success("Signed in!", { id: loadingToast });
    setIsSubmitting(false);
    router.replace(redirectTo);
    return router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account yet?
            <Link
              href="/auth/register"
              className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
            >
              Sign up!
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting && provider === AUTH_PROVIDER.PASSWORD ? (
            <Icons.Loader2 className="animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
});

LoginForm.displayName = "LoginForm";

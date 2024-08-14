"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_PROVIDER, registerSchema } from "@turbostarter/auth";
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

import { onPromise } from "~/utils";

import { register } from "./actions";
import { useAuthFormStore } from "./store";

import type { RegisterData } from "@turbostarter/auth";

type RegisterStatus = "pending" | "success" | "error" | "idle";

export const RegisterForm = memo(() => {
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const [status, setStatus] = useState<RegisterStatus>("idle");
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    setIsSubmitting(status === "pending");
  }, [status, setIsSubmitting]);

  const onSubmit = async (data: RegisterData) => {
    setProvider(AUTH_PROVIDER.PASSWORD);
    setStatus("pending");
    const loadingToast = toast.loading("Registering...");
    const { error } = await register(data);

    if (error) {
      setStatus("error");
      return toast.error(`${error}!`, { id: loadingToast });
    }

    toast.success("Success! Now verify your email!", {
      id: loadingToast,
    });

    return setStatus("success");
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          className="mt-6 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="success"
        >
          <Icons.CheckCircle2
            className="h-20 w-20 text-success"
            strokeWidth={1.2}
          />
          <h2 className="text-center text-2xl font-semibold">Success!</h2>
          <p className="text-center">
            You have successfully registered! Now verify your email to continue.
          </p>
          <Link
            href="/auth/login"
            className="-mt-1 text-sm text-muted-foreground underline hover:no-underline"
          >
            Sign in
          </Link>
        </motion.div>
      ) : (
        <Form {...form} key="idle">
          <motion.form
            onSubmit={onPromise(form.handleSubmit(onSubmit))}
            className="space-y-6"
            exit={{ opacity: 0 }}
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
                      autoComplete="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={form.formState.isSubmitting}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <div className="text-sm text-muted-foreground">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
                >
                  Sign in!
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
                "Sign up"
              )}
            </Button>
          </motion.form>
        </Form>
      )}
    </AnimatePresence>
  );
});

RegisterForm.displayName = "RegisterForm";

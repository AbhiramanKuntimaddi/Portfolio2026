"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

const initial: LoginState = { error: null };

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initial);
  return (
    <form action={action} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2 border-b border-line pb-2 focus-within:border-accent">
        <span className="text-muted lowercase">email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="bg-transparent text-base text-foreground outline-none"
        />
      </label>
      <label className="flex flex-col gap-2 border-b border-line pb-2 focus-within:border-accent">
        <span className="text-muted lowercase">password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="bg-transparent text-base text-foreground outline-none"
        />
      </label>
      {state.error && (
        <p className="text-red-400 lowercase" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 cursor-pointer border border-accent px-5 py-3 text-left text-accent lowercase transition-colors hover:bg-accent hover:text-background disabled:opacity-50"
      >
        {pending ? "signing in…" : "> sign_in();"}
      </button>
    </form>
  );
}

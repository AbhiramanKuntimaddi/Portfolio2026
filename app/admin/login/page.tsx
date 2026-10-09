import { redirect } from "next/navigation";
import { getOwner } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await getOwner()) redirect("/admin");
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-sm font-label text-[12px] tracking-[0.08em]">
        <p className="mb-10 text-muted lowercase">
          <span className="text-accent">$</span> ssh owner@abhiraman
        </p>
        <h1 className="mb-10 font-heading text-4xl leading-none font-bold tracking-tight uppercase">
          Admin
          <br />
          <span className="text-accent italic">login.</span>
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}

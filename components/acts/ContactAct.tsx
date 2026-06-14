"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { channels, type FormData, type ChannelItem } from "@/lib/data/form";

export function ContactAct() {
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("SUCCESS");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("ERROR");
    }
    setTimeout(() => setStatus("IDLE"), 4000);
  };

  return (
    <section className="contact-act absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="contact-wrap max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 md:mb-16">
          <div className="lg:col-span-8">
            <p className="contact-sub font-mono text-[11px] md:text-xs text-foreground/40 mb-6 tracking-wide">
              <span className="text-accent/70">{"// "}</span>
              drop a message
            </p>
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-foreground leading-[0.85] uppercase tracking-tight">
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span className="contact-headline-line block">Let&apos;s</span>
              </span>
              <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span className="contact-headline-line block text-accent tracking-wide italic font-medium">
                  Connect.
                </span>
              </span>
            </h2>
            <p className="contact-sub mt-6 text-foreground/60 font-sans text-sm md:text-base tracking-wide font-light leading-relaxed max-w-xl">
              Form below, the channels on the right, or write me directly at{" "}
              <a
                href="mailto:abhiraman21696@icloud.com"
                className="text-accent hover:underline"
              >
                abhiraman21696@icloud.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="contact-fade lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <InputField
                  label="name"
                  name="name"
                  placeholder="your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <InputField
                  label="email"
                  name="email"
                  type="email"
                  placeholder="you@somewhere.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <InputField
                label="message"
                name="message"
                placeholder="what's on your mind?"
                value={formData.message}
                onChange={handleInputChange}
                textarea
              />

              <button
                type="submit"
                disabled={status !== "IDLE"}
                className="group relative flex items-baseline font-mono pt-4 cursor-pointer disabled:cursor-default"
              >
                <span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
                  &gt;
                </span>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-accent text-[11px] md:text-xs font-bold tracking-widest transition-colors duration-500 group-hover:text-foreground lowercase">
                      {status === "IDLE"
                        ? "send"
                        : status === "SENDING"
                          ? "sending…"
                          : status === "SUCCESS"
                            ? "sent ✓"
                            : "failed — try again"}
                    </span>
                    <span className="text-accent/40 select-none">();</span>
                  </div>
                  <div className="mt-1 h-px w-full bg-accent/20 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-accent transition-transform duration-500 ${
                        status === "IDLE"
                          ? "-translate-x-full"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </button>
            </form>
          </div>

          <div className="contact-fade lg:col-span-5 border-t lg:border-t-0 lg:border-l border-foreground/10 lg:pl-16 pt-8 lg:pt-0">
            <h3 className="font-mono text-[11px] md:text-xs mb-6 lg:mb-10 tracking-wide">
              <span className="text-accent/70">{"// "}</span>
              <span className="text-foreground/40">elsewhere</span>
            </h3>

            <div className="flex lg:hidden items-center gap-3">
              {channels.map((c: ChannelItem) => (
                <a
                  key={c.label}
                  href={c.href}
                  aria-label={c.label}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="w-11 h-11 flex items-center justify-center rounded-md border border-foreground/10 text-foreground/65 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <c.Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>

            <div className="hidden lg:block space-y-8">
              {channels.map((c: ChannelItem) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between border-b border-foreground/10 pb-4 transition-transform duration-300 hover:translate-x-2"
                >
                  <span className="text-xl md:text-2xl text-foreground font-medium transition-colors group-hover:text-accent">
                    {c.label}
                  </span>
                  <span className="text-accent font-mono text-sm opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 relative group border-b border-foreground/10 pb-2 focus-within:border-accent/50 transition-colors duration-500">
      <label className="font-mono text-[11px] text-foreground/40 group-focus-within:text-accent transition-colors lowercase tracking-wide">
        {label}
      </label>
      <div className="relative flex items-baseline gap-2">
        <span
          aria-hidden
          className="font-mono text-foreground/25 group-focus-within:text-accent transition-colors select-none"
        >
          $
        </span>
        {textarea ? (
          <textarea
            required
            name={name}
            rows={3}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none text-foreground font-sans text-lg md:text-xl placeholder:text-foreground/20 resize-none w-full relative z-10"
          />
        ) : (
          <input
            required
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent border-none outline-none text-foreground font-sans text-lg md:text-xl placeholder:text-foreground/20 w-full relative z-10"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent w-0 group-focus-within:w-full transition-all duration-500 ease-in-out" />
    </div>
  );
}

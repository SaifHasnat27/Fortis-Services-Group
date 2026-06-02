"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { ContactFormSchema, type ContactFormValues } from "./formSchema";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import ServicePicker from "./ServicePicker";

import { BUSINESS } from "@/lib/constants";

const GOOGLE_SCRIPT_URL = BUSINESS.googleScriptUrl;

const fieldBase = `
  w-full
  px-4 py-3
  text-[var(--text-primary)]
  bg-base-secondary
  border border-[var(--border)]
  rounded-none
  text-sm leading-[var(--leading-normal)]
  placeholder:text-[var(--text-muted)]
  transition-all duration-[var(--transition-fast)]
  focus:outline-none
  focus:border-[var(--border-dark)]
  focus:ring-1 focus:ring-[var(--color-black)]
  hover:border-[var(--color-stone-400)]
`;

const labelBase = `
  block
  text-[0.6875rem] font-medium tracking-[0.12em] uppercase
  text-[var(--text-secondary)]
  mb-2
`;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      services: [],
      preferredDate: "",
      preferredTime: "",
      location: "",
    },
  });

  const services = watch("services", []);
  const preferredDate = watch("preferredDate", "");
  const preferredTime = watch("preferredTime", "");

  // Scroll to success message when form submits
  useEffect(() => {
    if (status === "success" && successRef.current) {
      const rect = successRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - 90; // navbar height
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  }, [status]);

  const onSubmit = (data: ContactFormValues) => {
    setStatus("loading");

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(data),
    });

    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-start p-10 bg-base-secondary border border-[var(--border)] text-left"
      >
        <CircleCheck className="w-10 h-10 text-[var(--text-primary)] mb-5" aria-hidden="true" />
        <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)] mb-2">
          Thank you!
        </h3>
        <p className="text-[var(--text-secondary)] font-light text-sm mb-8">
          We&apos;ll be in touch with you very soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-secondary)] border-b border-[var(--border)] pb-0.5 hover:text-[var(--text-primary)] hover:border-[var(--border-dark)] transition-all duration-[var(--transition-fast)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      {/* Name + Phone row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelBase}>
            Name <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
          </label>
          <input
            {...register("name")}
            id="name"
            autoComplete="name"
            className={fieldBase}
            placeholder="Your name"
          />
          {errors.name && (
            <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldBase}
            placeholder="Your phone number"
          />
          {errors.phone && (
            <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelBase}>
          Email <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          autoComplete="email"
          className={fieldBase}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.email.message}</p>
        )}
      </div>

      {/* Services */}
      <div>
        <label className={labelBase}>
          Service Interest <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
        </label>
        <ServicePicker
          value={services}
          onChange={(val) => setValue("services", val, { shouldValidate: true })}
          disabled={status === "loading"}
          error={errors.services?.message}
        />
        {errors.services && (
          <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.services.message}</p>
        )}
      </div>

      {/* Preferred Date + Preferred Time row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="preferredDate" className={labelBase}>
            Preferred Date <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
          </label>
          <DatePicker
            value={preferredDate}
            onChange={(val) => setValue("preferredDate", val)}
            disabled={status === "loading"}
          />
          {errors.preferredDate && (
            <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.preferredDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelBase}>
            Preferred Time <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
          </label>
          <TimePicker
            value={preferredTime}
            onChange={(val) => setValue("preferredTime", val)}
            selectedDate={preferredDate}
            disabled={status === "loading"}
          />
          {errors.preferredTime && (
            <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.preferredTime.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className={labelBase}>
          Location <span className="text-[var(--text-primary)]" aria-hidden="true">*</span>
        </label>
        <input
          {...register("location")}
          id="location"
          autoComplete="street-address"
          className={fieldBase}
          placeholder="Your suburb or address"
        />
        {errors.location && (
          <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.location.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelBase}>
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className={`${fieldBase} resize-y`}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p role="alert" className="mt-2 text-xs text-red-600 tracking-wide">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="secondary"
        disabled={status === "loading"}
        className="mt-2"
      >
        {status === "loading" && (
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        )}
        Send Message
      </Button>
    </form>
  );
}
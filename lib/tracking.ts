import { sendGTMEvent } from "@next/third-parties/google";
import type { ContactFormValues } from "@/components/forms/formSchema";

async function sha256(value: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

// "0412 345 678" -> "+61412345678"
function toE164(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.startsWith("0") ? `+61${d.slice(1)}` : `+${d}`;
}

// Fire-and-forget: the form never waits on this. Only hashed email/phone are sent.
export function trackQuoteForm(data: ContactFormValues) {
  const event = {
    event: "quote_form",
    form_name: "quote_form",
  };
  (async () => {
    try {
      sendGTMEvent({
        ...event,
        user_data: {
          sha256_email_address: await sha256(data.email.trim().toLowerCase()),
          sha256_phone_number: await sha256(toE164(data.phone)),
        },
      });
    } catch {
      sendGTMEvent(event);
    }
  })();
}

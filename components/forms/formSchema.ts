import { z } from "zod";

export const ServiceSelectionSchema = z.object({
  id: z.string(),
  label: z.string(),
  size: z.string().optional(),
  price: z.string().optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).max(100),
  phone: z.string().min(1, { message: "Phone is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  services: z
    .array(ServiceSelectionSchema)
    .min(1, { message: "Select at least one service." }),
  preferredDate: z.string().min(1, { message: "Please select a date." }),
  preferredTime: z.string().min(1, { message: "Please select a time." }),
  location: z.string().min(1, { message: "Location is required." }),
  message: z.string().max(1000).optional(),
});

export type ServiceSelection = z.infer<typeof ServiceSelectionSchema>;
export type ContactFormValues = z.infer<typeof ContactFormSchema>;
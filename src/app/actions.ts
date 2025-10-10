
"use server";

import { z } from "zod";

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export type NewsletterSubscribeState = {
  message: string;
  status: "success" | "error" | "idle";
};

export async function subscribeToNewsletter(
  prevState: NewsletterSubscribeState,
  formData: FormData
): Promise<NewsletterSubscribeState> {
  const email = formData.get("email");

  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      message: validatedEmail.error.errors[0].message,
      status: "error",
    };
  }

  try {
    // Here you would integrate with your newsletter service (e.g., Google Sheets)
    // For this example, we'll just simulate a successful subscription
    console.log(`New subscriber: ${validatedEmail.data}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: "Thank you for subscribing!",
      status: "success",
    };
  } catch (e) {
    return {
      message: "An unexpected error occurred. Please try again later.",
      status: "error",
    };
  }
}

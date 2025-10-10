
"use server";

import { z } from "zod";
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
  }
}

const db = getFirestore();

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
    const subscribersCollection = db.collection('newsletter_subscribers');
    const snapshot = await subscribersCollection.where('email', '==', validatedEmail.data).get();

    if (!snapshot.empty) {
      return {
        message: "This email is already subscribed.",
        status: "error",
      };
    }

    await subscribersCollection.add({
      email: validatedEmail.data,
      subscriptionDate: new Date(),
    });

    return {
      message: "Thank you for subscribing!",
      status: "success",
    };
  } catch (e) {
    console.error('Error subscribing to newsletter:', e);
    return {
      message: "An unexpected error occurred. Please try again later.",
      status: "error",
    };
  }
}

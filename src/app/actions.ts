
"use server";

import { z } from "zod";
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { CollectionReference } from "firebase-admin/firestore";

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

// This function can be called multiple times, but will only initialize once.
function initializeFirebaseAdmin() {
  if (!getApps().length) {
    try {
      // Ensure the environment variable is set.
      if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
      }
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      initializeApp({
        credential: cert(serviceAccount)
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin SDK:', error);
      // We re-throw the error to make it clear that initialization failed.
      throw new Error('Could not initialize Firebase Admin SDK. Please check your service account key.');
    }
  }
}


export type NewsletterSubscribeState = {
  message: string;
  status: "success" | "error" | "idle";
};

export async function subscribeToNewsletter(
  prevState: NewsletterSubscribeState,
  formData: FormData
): Promise<NewsletterSubscribeState> {
  // Ensure Firebase Admin is initialized before proceeding
  try {
    initializeFirebaseAdmin();
  } catch (error: any) {
    return {
      message: error.message,
      status: "error",
    };
  }

  const db = getFirestore();
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
      subscriptionDate: Timestamp.now(), // Use Firestore Timestamp
    });

    return {
      message: "Thank you for subscribing!",
      status: "success",
    };
  } catch (e) {
    console.error('Error subscribing to newsletter:', e);
    // Provide a more generic error to the user
    return {
      message: "An unexpected error occurred. Please try again later.",
      status: "error",
    };
  }
}

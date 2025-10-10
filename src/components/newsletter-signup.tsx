
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { subscribeToNewsletter, type NewsletterSubscribeState } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/80 dark:bg-card dark:text-card-foreground dark:hover:bg-card/80">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Subscribing...
        </>
      ) : (
        <>
          Subscribe <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export default function NewsletterSignup() {
  const initialState: NewsletterSubscribeState = { message: "", status: "idle" };
  const [state, formAction] = useFormState(subscribeToNewsletter, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Subscribed!",
        description: state.message,
      });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="flex-grow bg-primary/80 text-primary-foreground placeholder:text-primary-foreground/70 border-primary-foreground/20 focus-visible:ring-primary-foreground"
          aria-label="Email for newsletter"
        />
        <SubmitButton />
      </div>
      {state.status === "error" && !state.message.includes("valid email") && (
        <p className="mt-2 text-sm text-destructive">{state.message}</p>
      )}
    </form>
  );
}

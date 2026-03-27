const NEWSLETTER_URL =
  "https://nbdggbnqnrevwg6xlex3st3vpe0nyhiq.lambda-url.us-east-2.on.aws/?token=db1f899025b5a59a76b6b34b2a013893";

export async function subscribeToNewsletter(email: string): Promise<void> {
  try {
    const response = await fetch(NEWSLETTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Email incorrect, or already subscribed");
      }
      throw new Error(`Failed to subscribe: ${response.statusText}`);
    }
    return;
  } catch (error) {
    throw error;
  }
}

const baseUrl = import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "/";

export const sendMessagePostApi = async (
  receiverId: string,
  text?: string,
  image?: string | undefined
) => {
  const response = await fetch(
    `${baseUrl}/api/messages/send/${receiverId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textSent: text,
        image: image,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(error.message || "Failed to send message");
  }

  return response.json();
};

export const getMessagesApi = async (otherUserId: string) => {
  const response = await fetch(
    `${baseUrl}/api/messages/get/${otherUserId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error("Failed to fetch messages");
  }

  return response.json();
};

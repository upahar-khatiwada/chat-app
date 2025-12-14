export const sendMessagePostApi = async (receiverId: string, text: string) => {
  const response = await fetch(
    `http://localhost:3000/api/messages/send/${receiverId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textSent: text,
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
    `http://localhost:3000/api/messages/get/${otherUserId}`,
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

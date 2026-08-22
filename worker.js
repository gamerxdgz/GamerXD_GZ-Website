export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // AI API
    if (url.pathname === "/api/chat") {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ error: "Method not allowed" }),
          {
            status: 405,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      try {
        const body = await request.json();
        const message = String(body?.message || "").trim();

        if (!message) {
          return new Response(
            JSON.stringify({ error: "Message is required." }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        }

        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct-fast",
          {
            messages: [
              {
                role: "system",
                content:
                  "You are GamerXD_GZ AI, the website assistant for GamerXD_GZ. Be helpful, clear, concise, and friendly. You can help with the GamerXD_GZ website, Minecraft, Eaglercraft, coding, and general questions."
              },
              {
                role: "user",
                content: message
              }
            ]
          }
        );

        const response =
          result?.response ||
          result?.result?.response ||
          "I couldn't generate a response.";

        return new Response(
          JSON.stringify({
            response: String(response)
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      } catch (error) {
        console.error("AI error:", error);

        return new Response(
          JSON.stringify({
            error: "The AI could not process your request."
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
    }

    // Website
    return env.ASSETS.fetch(request);
  }
};
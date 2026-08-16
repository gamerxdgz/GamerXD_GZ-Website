export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // AI Endpoint Handler
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const { message } = await request.json();

        if (!message) {
          return new Response(JSON.stringify({ error: "No message provided" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        // Run Cloudflare Workers AI model
        const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
          messages: [
            {
              role: "system",
              content: "You are the GamerXD_GZ AI Assistant. Help visitors with information regarding Minecraft, Eaglercraft, upcoming website projects, and community links. Keep answers helpful, brief, and gamer-friendly."
            },
            { role: "user", content: message }
          ]
        });

        // Extract the response text from the AI model
        const responseText = aiResponse.result?.response || aiResponse.response || "I'm not sure how to respond to that.";

        return new Response(JSON.stringify({ response: responseText }), {
          headers: { "Content-Type": "application/json" }
        });

      } catch (err) {
        console.error("AI Error:", err);
        return new Response(JSON.stringify({ error: "Failed to generate AI response." }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Serve static site assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { taskType, input } = req.body;

    const openrouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content: `You are CodePilot, an expert developer assistant. Help the user with the task: "${taskType}".`,
          },
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });

    const data = await openrouterRes.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error("API Chat Error:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

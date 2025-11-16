export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method === "GET") return res.status(200).send("Webhook OK");

    if (req.method === "POST") {
      const data = req.body;
      console.log("Webhook recebido:", JSON.stringify(data));
      return res.status(200).json({ received: true });
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
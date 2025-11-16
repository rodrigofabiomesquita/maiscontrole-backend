export default async function handler(req, res) {
  try {
    console.log("Webhook recebido:", req.body);

    // MP envia várias notificações diferentes — você filtra
    if (req.body.type === "payment") {
      console.log("Pagamento confirmado:", req.body.data.id);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.log("Erro Webhook:", err);
    return res.status(500).json({ error: "Erro no webhook" });
  }
}

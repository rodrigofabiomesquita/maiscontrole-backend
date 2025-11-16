import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });
  try {
    mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "missing id" });

    const payment = await mercadopago.payment.findById(id);
    return res.status(200).json(payment.body);
  } catch (error) {
    console.error("Erro ao consultar pagamento:", error);
    return res.status(500).json({ error: "Erro ao consultar pagamento" });
  }
}
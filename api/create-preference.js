import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  try {
    mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

    const { title = "Assinatura Mais Controle", price = 49.90, quantity = 1 } = req.body;

    const preference = {
      items: [{ title, quantity, unit_price: Number(price) }],
      back_urls: {
        success: `${process.env.BASE_URL}/sucesso`,
        failure: `${process.env.BASE_URL}/falha`,
        pending: `${process.env.BASE_URL}/pendente`
      },
      notification_url: `${process.env.BASE_URL}/api/webhook`,
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ url: response.body.init_point, id: response.body.id });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return res.status(500).json({ error: "Erro ao criar link" });
  }
}
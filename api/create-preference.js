import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  try {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });

    const { title, price, quantity = 1 } = req.body;

    if (!title || !price)
      return res.status(400).json({ error: "Envie title e price" });

    const preference = {
      items: [
        {
          title,
          quantity,
          unit_price: Number(price),
        },
      ],
      back_urls: {
        success: "https://maiscontrolle.com/sucesso",
        failure: "https://maiscontrolle.com/falha",
        pending: "https://maiscontrolle.com/pendente",
      },
      auto_return: "approved",
      notification_url: "https://api.maiscontrolle.com/api/webhook",
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      url: response.body.init_point,
      id: response.body.id,
    });
  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({ error: "Erro ao criar preferência" });
  }
}

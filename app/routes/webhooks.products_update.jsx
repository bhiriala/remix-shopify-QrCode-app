import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    console.log("Avant authentication.webhook");
    const { topic, shop, payload } = await authenticate.webhook(request);
    console.log("Après authentication.webhook");

    console.log(`Received ${topic} webhook for ${shop}`);
    console.log(`payload ${JSON.stringify(payload)}`);
  } catch (error) {
    console.error("Erreur lors de l'authentification du webhook :", error);
  }

  return new Response();
};

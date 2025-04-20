"use server";

export default async function getProducts() {
  const res = await fetch(
    `https://api.jotform.com/form/${process.env.JOTFORM_FORM_ID}/payment-info?apiKey=${process.env.JOTFORM_API_KEY}`
  );

  const data = await res.json();

  return data.content.products as Product[];
}

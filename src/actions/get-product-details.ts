"use server";

export default async function getProductDetails(pid: string) {
  const res = await fetch(
    `https://api.jotform.com/form/${process.env.JOTFORM_FORM_ID}/payment-info?apiKey=${process.env.JOTFORM_API_KEY}`
  );

  const data = await res.json();

  return (data.content.products as Product[]).find(
    (product) => product.pid === pid
  );
}

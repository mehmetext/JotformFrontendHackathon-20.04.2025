"use server";

export async function submitForm(
  fullName: string,
  address: string,
  items: CartItem[]
) {
  const formData = new FormData();

  formData.append("apiKey", process.env.JOTFORM_API_KEY as string);
  formData.append("formID", process.env.JOTFORM_FORM_ID as string);
  formData.append("submission[34]", fullName);
  formData.append("submission[36]", address);

  const selectedProductsList = items.map((item) => ({
    [item.pid]: {
      "0": {
        customOptionValues: { "0": item.price.toString() },
        quantity: item.quantity.toString(),
      },
    },
  }));

  formData.append("submission[21]", JSON.stringify(selectedProductsList));

  console.log(formData);

  const res = await fetch(
    `https://api.jotform.com/form/${process.env.JOTFORM_FORM_ID}/submissions`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log(data);
}

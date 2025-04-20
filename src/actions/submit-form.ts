"use server";

import getProducts from "./get-products";

export async function submitForm(
  fullName: string,
  address: string,
  items: CartItem[],
  total: number
) {
  const products = await getProducts();

  const formData = new FormData();

  formData.append("formID", process.env.JOTFORM_FORM_ID as string);
  formData.append("submission[65]", fullName);
  formData.append("submission[66]", address);

  items.forEach((item, index) => {
    formData.append(
      `submission[63][${index}]`,
      JSON.stringify({ id: item.pid })
    );
    formData.append(
      `submission[63][${index + 1}]`,
      JSON.stringify(products.find((p) => p.pid === item.pid))
    );
  });

  /* formData.append("submission[63][0]", JSON.stringify({ id: "1005" }));
  formData.append(
    "submission[63][1]",
    JSON.stringify({
      cid: "2002",
      connectedCategories: ["2002"],
      connectedProducts: [],
      corder: "20",
      description: "mixed media sculptural mosaic, 48 x 24 x 13.75",
      fitImageToCanvas: "Yes",
      hasExpandedOption: "",
      hasSpecialPricing: "",
      images: [
        "https://www.jotform.com/uploads/NAHDirector/223195770115151/5506683582914311721/Falco_KateHanley_.jpg",
        "https://www.jotform.com/uploads/NAHDirector/223195770115151/5506683582914311721/FalcoSideview_KateHanley_.jpg",
        "https://www.jotform.com/uploads/NAHDirector/223195770115151/5506683582914311721/FalcoBack_KateHanley.jpg",
      ],
      isLowStockAlertEnabled: "No",
      isStockControlEnabled: "No",
      lowStockValue: "",
      name: "Falco by Kate Hanley",
      options: [],
      order: "4",
      paymentUUID: "019645b9052f7f91991a49b16eae4ee73679",
      pid: "1005",
      price: 1050,
      required: "0",
      item_id: 2,
      currency: "USD",
      gateway: "payment",
      paymentType: "product",
    })
  ); */

  formData.append(
    "submission[63][paymentArray]",
    JSON.stringify({
      product: items.map((item) => {
        return products.find((p) => p.pid === item.pid)?.name;
      }),
      currency: "USD",
      total: total.toString(),
      shortView: {
        products: [
          {
            title: "Falco by Kate Hanley",
            image:
              "https://www.jotform.com/uploads/NAHDirector/223195770115151/5506683582914311721/Falco_KateHanley_.jpg",
          },
        ],
      },
    })
  );

  console.log(formData);

  const res = await fetch(
    `https://api.jotform.com/form/${process.env.JOTFORM_FORM_ID}/submissions?apiKey=${process.env.JOTFORM_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  console.log(data);
}

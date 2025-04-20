import getProducts from "@/actions/get-products";
import Filters from "@/components/filters";
import ProductList from "@/components/product-list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const products = await getProducts();
  const { q, category } = await searchParams;

  const categories = products.map((p) =>
    JSON.parse(p.connectedCategories ?? "[]")
  );

  const uniqueCategories = [...new Set(categories.flat())];

  return (
    <div className="container space-y-4">
      <Filters
        categories={uniqueCategories}
        selectedCategory={category as string}
      />
      <ProductList
        products={products.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(q?.toString().toLowerCase() || "") &&
            (category
              ? product.connectedCategories?.includes(category as string)
              : true)
        )}
      />
    </div>
  );
}

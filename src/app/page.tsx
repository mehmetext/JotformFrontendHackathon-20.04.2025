import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const products = await getProducts();
  const { q } = await searchParams;

  return (
    <div className="container">
      <ProductList
        products={products.filter((product) =>
          product.name.toLowerCase().includes(q?.toString().toLowerCase() || "")
        )}
      />
    </div>
  );
}

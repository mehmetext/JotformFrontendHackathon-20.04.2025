import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="container">
      <ProductList products={products} />
    </div>
  );
}

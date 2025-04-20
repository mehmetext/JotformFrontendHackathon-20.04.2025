import ProductItem from "./product-item";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.pid}>
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
}

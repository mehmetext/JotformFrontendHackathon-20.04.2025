import getProductDetails from "@/actions/get-product-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const product = await getProductDetails((await params).pid);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Ürün bulunamadı</h1>
      </div>
    );
  }

  const images = JSON.parse(product.images);
  const options = JSON.parse(product.options || "[]");
  const connectedCategories = JSON.parse(product.connectedCategories);
  const connectedProducts = JSON.parse(product.connectedProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün Görselleri */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1).map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative h-24 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ürün Bilgileri */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.hasSpecialPricing === "true" && (
                    <Badge variant="secondary" className="ml-2">
                      Özel Fiyat
                    </Badge>
                  )}
                </div>
                {product.isStockControlEnabled === "true" && (
                  <Badge
                    variant={
                      parseInt(product.lowStockValue) <= 5
                        ? "destructive"
                        : "default"
                    }
                  >
                    Stok: {product.lowStockValue} adet
                  </Badge>
                )}
              </div>

              <Separator />

              {product.hasQuantity === "true" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Adet</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={product.lowStockValue}
                        defaultValue="1"
                        className="w-20"
                      />
                    </div>
                    <Button className="flex-1">Sepete Ekle</Button>
                  </div>
                </div>
              )}

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Ürün Açıklaması</TabsTrigger>
                  <TabsTrigger value="details">Detaylar</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p className="text-gray-600">{product.description}</p>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="space-y-4">
                    {product.hasExpandedOption === "true" &&
                      options.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Seçenekler</h4>
                          <div className="flex flex-wrap gap-2">
                            {options.map((option: string, index: number) => (
                              <Badge key={index} variant="outline">
                                {option}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    {connectedCategories.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Kategoriler</h4>
                        <div className="flex flex-wrap gap-2">
                          {connectedCategories.map(
                            (category: string, index: number) => (
                              <Badge key={index} variant="secondary">
                                {category}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {connectedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>İlgili Ürünler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {connectedProducts.map((productId: string, index: number) => (
                    <div key={index} className="text-sm text-gray-600">
                      Ürün ID: {productId}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

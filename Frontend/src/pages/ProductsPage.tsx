import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { mockProducts } from "@/data/mockData";
import { Product, BillDraft, BillProduct } from "@/types";
import { toast } from "@/hooks/use-toast";

interface OutletContext {
  billDraft: BillDraft;
  setBillDraft: (draft: BillDraft) => void;
}

export const ProductsPage = () => {
  const { billDraft, setBillDraft } = useOutletContext<OutletContext>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToBill = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = (
    productId: string,
    productName: string,
    quantity: number,
    price: number
  ) => {
    const newProduct: BillProduct = {
      productId,
      productName,
      quantity,
      price,
    };

    const updatedProducts = [...billDraft.products, newProduct];
    const updatedFinalPrice = updatedProducts.reduce(
      (sum, p) => sum + p.price,
      0
    );

    setBillDraft({
      products: updatedProducts,
      finalPrice: updatedFinalPrice,
    });

    toast({
      title: "Product Added",
      description: `${productName} added to bill draft`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Select products to add to your bill
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToBill={handleAddToBill}
          />
        ))}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

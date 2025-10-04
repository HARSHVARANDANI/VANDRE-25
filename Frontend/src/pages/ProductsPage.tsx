import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { AddNewProductModal } from "@/components/AddNewProductModal";
import { mockProducts } from "@/data/mockData";
import { Product, BillDraft, BillProduct } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
interface OutletContext {
  billDraft: BillDraft;
  setBillDraft: (draft: BillDraft) => void;
}

export const ProductsPage = () => {
  const { billDraft, setBillDraft } = useOutletContext<OutletContext>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);


useEffect(() => {
  async function getAllProducts() {
    try {
      const res = await axios.get("http://localhost:3000/users/getAllProducts", {
        withCredentials: true,   // must be inside config, not body
      });
      console.log("Fetched products:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Cannot Fetch All Details", error);
    }
  }
  getAllProducts();
}, [products]);


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
      (sum, p) => sum +  p.price,
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

  const handleAddNewProduct = async (product: Product) => {
    try {
      console.log(product); 
      const res = await axios.post("http://localhost:3000/users/addProducts",product,{withCredentials:true}); 
      setProducts([...products, product]);
      toast({
        title: "Product Created",
        description: `${product.name} has been added to products`,
      });
    } catch (error) {
        toast({
        title: "Product Creation Failed",
        description: `Cannot add new Product${error}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">
            Select products to add to your bill
          </p>
        </div>
        <Button onClick={() => setIsNewProductModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          
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

      <AddNewProductModal
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        onAdd={handleAddNewProduct}
      />
    </div>
  );
};

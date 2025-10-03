import { useState } from "react";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface AddNewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export const AddNewProductModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddNewProductModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");

  const handleAdd = () => {
    if (!name || !defaultPrice) {
      return;
    }

    
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      category: category || undefined,
      defaultPrice: parseFloat(defaultPrice),
    };

    onAdd(newProduct);
    setName("");
    setCategory("");
    setDefaultPrice("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="product-name">Product Name</Label>
          <Input
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category (Optional)</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="default-price">Default Price (₹)</Label>
          <Input
            id="default-price"
            type="number"
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(e.target.value)}
            placeholder="Enter default price"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleAdd} className="flex-1">
            Add Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};

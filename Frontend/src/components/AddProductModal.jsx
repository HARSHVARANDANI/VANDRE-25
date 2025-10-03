import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddProductModal = ({ isOpen, onClose, product, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product?.defaultPrice || 0);

  const handleAdd = () => {
    if (product && quantity > 0 && price > 0) {
      onAdd(product.id, product.name, quantity, price);
      setQuantity(1);
      setPrice(product.defaultPrice);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add ${product.name}`}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Total Price of Product</Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price"
          />
        </div>

        {/* <div className="bg-muted p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">{quantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price per unit:</span>
            <span className="font-medium">₹{price}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
            <span>Total:</span>
            <span className="text-primary">₹{quantity * price}</span>
          </div>
        </div> */}

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleAdd} className="flex-1">
            Add to Bill
          </Button>
        </div>
      </div>
    </Modal>
  );
};

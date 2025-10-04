import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/Modal";
import { BillDraft } from "@/types";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios"

interface OutletContext {
  billDraft: BillDraft;
  setBillDraft: (draft: BillDraft) => void;
}

export const CreateBillPage = () => {
  const { billDraft, setBillDraft } = useOutletContext<OutletContext>();
  const [customerName, setCustomerName] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = billDraft.products.filter((_, i) => i !== index);
    const updatedFinalPrice = updatedProducts.reduce(
      (sum, p) => sum + p.price,
      0
    );

    setBillDraft({
      products: updatedProducts,
      finalPrice: updatedFinalPrice,
    });
  };

  const handleCreateBill = () => {
    if (!customerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter customer name",
        variant: "destructive",
      });
      return;
    }

    if (billDraft.products.length === 0) {
      toast({
        title: "Error",
        description: "Please add products to the bill",
        variant: "destructive",
      });
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirmBill = async () => {
    // In a real app, this would call the backend API
    console.log("productBillDraft:",billDraft.products)
    
    //No need to send token explicitly as cookies me hai to automatically sent with request
    try {
      const billData = {
      customerName,
      products: billDraft.products.map((p) => ({
      productName: p.productName,
      quantity: p.quantity,
      finalPrice:p.price, // ensure backend gets finalPrice
    })),
      totalPrice: billDraft.finalPrice,
      };
      const res =  await axios.post("http://localhost:3000/users/createBill",billData,{ withCredentials: true }); //necessary if backend is on differnt origin
      
      console.log("Creating bill:", res);

      toast({
        title: "Bill Created",
        description: `Bill for ${customerName} created successfully`,
      });

      setBillDraft({ products: [], finalPrice: 0 });
      setCustomerName("");
      setIsConfirmModalOpen(false);

      navigate("/app/bills");
    } catch (error) {
        toast({
        title: "Bill Creation Failed",
        description: `Error in creating Bill`,
      });
      setBillDraft({ products: [], finalPrice: 0 });
      setCustomerName("");
      setIsConfirmModalOpen(false);
    }
    
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create Bill</h1>
        <p className="text-muted-foreground">
          Add products and customer details to create a new bill
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Bill Draft
          </CardTitle>
        </CardHeader>
        <CardContent>
          {billDraft.products.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No products added yet</p>
              <Button
                variant="link"
                onClick={() => navigate("/app/products")}
                className="mt-2"
              >
                Go to Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {billDraft.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{product.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {product.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">
                      ₹{product.price}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{billDraft.finalPrice}
                </span>
              </div>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={handleCreateBill}
              >
                Create Bill
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Bill"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="text-lg font-semibold">{customerName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Products</p>
              {billDraft.products.map((product, index) => (
                <div key={index} className="text-sm py-1">
                  {product.productName} × {product.quantity}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{billDraft.finalPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleConfirmBill}
              className="flex-1"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

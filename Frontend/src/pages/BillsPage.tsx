import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBills } from "@/data/mockData";
import { Cone, FileText } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

interface BillProduct {
  productName: string;
  quantity: number;
  finalPrice: number;
}

interface Bill {
  _id: string;
  billId: number;
  customerName: string;
  products: BillProduct[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export const BillsPage = () => {

  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(()=>
  {
    async function getAllBills() {
      
      try {
        const res= await axios.get("http://localhost:3000/users/getAllBills",{withCredentials:true})
        console.log(res.data.bills);
        setBills(res.data.bills);
      } catch (error) {
        console.log("Cannot Fetch All Details",error);
      }
    }
    getAllBills();
  },[])
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bills</h1>
        <p className="text-muted-foreground">
          View all created bills and their details
        </p>
      </div>

      <div className="grid gap-6">
        {bills.map((bill) => (
          <Card key={bill._id} className="transition-smooth hover:shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{bill.customerName}</h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      Bill #{bill.billId} • {format(new Date(bill.createdAt), "PPp")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ₹{bill.totalPrice}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                  Products
                </h4>
                {bill.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ₹{product.finalPrice}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export interface Product {
  id: string;
  name: string;
  defaultPrice: number;
  category?: string;
}

export interface BillProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Bill {
  id: string;
  customerName: string;
  products: BillProduct[];
  finalPrice: number;
  createdAt: string;
}

export interface BillDraft {
  products: BillProduct[];
  finalPrice: number;
}

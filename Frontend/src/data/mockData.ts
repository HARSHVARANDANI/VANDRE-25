import { Product, Bill } from "@/types";

export const mockProducts: Product[] = [
  { id: "1", name: "Premium Widget", defaultPrice: 1200, category: "Electronics" },
  { id: "2", name: "Standard Component", defaultPrice: 500, category: "Parts" },
  { id: "3", name: "Deluxe Package", defaultPrice: 2500, category: "Bundles" },
  { id: "4", name: "Basic Service", defaultPrice: 300, category: "Services" },
  { id: "5", name: "Advanced Module", defaultPrice: 1800, category: "Electronics" },
  { id: "6", name: "Maintenance Plan", defaultPrice: 450, category: "Services" },
];

export const mockBills: Bill[] = [
  {
    id: "B001",
    customerName: "John Doe",
    products: [
      { productId: "1", productName: "Premium Widget", quantity: 2, price: 1200 },
      { productId: "4", productName: "Basic Service", quantity: 1, price: 300 },
    ],
    finalPrice: 2700,
    createdAt: new Date("2025-01-15T10:30:00").toISOString(),
  },
  {
    id: "B002",
    customerName: "Jane Smith",
    products: [
      { productId: "3", productName: "Deluxe Package", quantity: 1, price: 2500 },
      { productId: "6", productName: "Maintenance Plan", quantity: 2, price: 450 },
    ],
    finalPrice: 3400,
    createdAt: new Date("2025-01-16T14:20:00").toISOString(),
  },
  {
    id: "B003",
    customerName: "Bob Johnson",
    products: [
      { productId: "2", productName: "Standard Component", quantity: 5, price: 500 },
    ],
    finalPrice: 2500,
    createdAt: new Date("2025-01-17T09:15:00").toISOString(),
  },
];

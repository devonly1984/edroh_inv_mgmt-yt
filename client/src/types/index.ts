import { LucideIcon } from "lucide-react";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}
export interface ExpenseSums {
  [cargory: string]: number;
  
}
export interface StatCardProps {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
}
export interface StatDetail {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon
}
export interface CreateProductModalProps {
  isOpen:boolean;
  onClose:()=>void;
  onCreate:(formData:ProductFormData)=>void;
}
export interface ProductFormData {
  name:string;
  price: number;
  stockQuantity: number;
  rating:number;
}
export interface User {
  userId:string;
  name:string;
  email:string;
}
export type UserSettings = {
  label:string;
  value: string |boolean;
  type:'text'|'toggle';

}
export const mockSettings: UserSettings[] = [
  {
    label: "Username",
    value: "john_doe",
    type: "text",
  },
  {
    label: "Email",
    value: "john.doe@example.com",
    type: "text",
  },
  {
    label: "Notification",
    value: true,
    type: "toggle",
  },
  {
    label: "Dark Mode",
    value: false,
    type: "toggle",
  },
  {
    label: "Language",
    value: "English",
    type: "text",
  },

];
export type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};
export type AggregatedData = {
  [category: string]: AggregatedDataItem;
};
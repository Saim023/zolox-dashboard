export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  date: string;
  method: string;
}

export type PaymentStatus = Payment["status"];

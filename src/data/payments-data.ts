// payments-data.ts
import { FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import React from "react";

export interface PaymentChartItem {
  name: string;
  value: number;
}

export interface PaymentData {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType;
  color: string;
  increasedColor: string;
  chartData: PaymentChartItem[];
}

export const paymentsData: PaymentData[] = [
  {
    id: "total-revenue",
    title: "Total Revenue",
    value: "125M",
    change: 30,
    icon: FaMoneyCheckDollar,
    color: "#4CB0A6",
    increasedColor: "#4CB0A6",
    chartData: [
      { name: "Jan", value: 100 },
      { name: "Feb", value: 120 },
      { name: "Mar", value: 90 },
      { name: "Apr", value: 150 },
      { name: "May", value: 110 },
      { name: "Jun", value: 130 },
      { name: "Jul", value: 125 },
    ],
  },
  {
    id: "monthly-revenue",
    title: "Monthly Revenue",
    value: "8.5M",
    change: 12,
    icon: FaMoneyBillWave,
    color: "#8884d8",
    increasedColor: "#8884d8",
    chartData: [
      { name: "Jan", value: 7 },
      { name: "Feb", value: 8 },
      { name: "Mar", value: 6 },
      { name: "Apr", value: 9 },
      { name: "May", value: 8.2 },
      { name: "Jun", value: 8.7 },
      { name: "Jul", value: 8.5 },
    ],
  },
  {
    id: "new-customers",
    title: "New Customers",
    value: "1,240",
    change: -5,
    icon: FaUsers,
    color: "#ff8042",
    increasedColor: "#ff8042",
    chartData: [
      { name: "Jan", value: 1000 },
      { name: "Feb", value: 1200 },
      { name: "Mar", value: 900 },
      { name: "Apr", value: 1500 },
      { name: "May", value: 1100 },
      { name: "Jun", value: 1300 },
      { name: "Jul", value: 1240 },
    ],
  },
];

export const samplePaymentData: PaymentData = {
  id: "sample-monthly-revenue",
  title: "Monthly Revenue",
  value: "N/A",
  change: 0,
  icon: FaMoneyBillWave,
  color: "#3B82F6",
  increasedColor: "#3B82F6",
  chartData: [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 200 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 80 },
    { name: "May", value: 170 },
    { name: "June", value: 220 },
    { name: "July", value: 100 },
    { name: "Aug", value: 250 },
    { name: "Sept", value: 180 },
    { name: "Oct", value: 210 },
    { name: "Nov", value: 190 },
    { name: "Dec", value: 260 },
  ],
};

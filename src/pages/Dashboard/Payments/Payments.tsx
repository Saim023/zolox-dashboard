"use client";

import { paymentsData, samplePaymentData } from "@/data/payments-data";
import StatCard from "@/components/Payments/StatCard";
import PictorialBarChart from "@/components/Payments/PictorialBarChart";
import AdditionalPaymentSlider from "@/components/Payments/AdditionalPaymentSlider";
import PolarChart from "@/components/Payments/PolarChart";

export default function Payments() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto pb-10">
      <div className="mt-3 px-4 sm:px-5 lg:px-6 xl:px-7">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentsData.map((data) => (
              <StatCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mt-10 px-6 ">
        <AdditionalPaymentSlider></AdditionalPaymentSlider>
      </div>
      <div className="mt-10">
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64  col-span-1 lg:col-span-2">
            <PictorialBarChart data={samplePaymentData} />
          </div>
          <div>
            <PolarChart></PolarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

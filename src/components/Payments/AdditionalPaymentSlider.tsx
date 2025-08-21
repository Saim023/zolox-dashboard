"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function AdditionalPaymentSlider() {
  const [value, setValue] = useState<number>(142650);

  const interestSaved = Math.round(value * 0.2);

  const handleDecrease = () => {
    setValue((prev) => Math.max(0, prev - 1000));
  };

  const handleIncrease = () => {
    setValue((prev) => Math.min(200000, prev + 1000));
  };

  return (
    <div className="w-full p-5 shadow-sm rounded-xl">
      <h1 className="text-lg font-semibold mb-5">Additional Monthly Payment</h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-semibold text-muted-foreground">$0</span>
          </div>
          <div className="flex text-lg font-medium shadow-sm divide-x divide-gray-400 rounded-sm">
            <span className="bg-gray-50 hover:bg-gray-100 cursor-pointer px-3 py-1" onClick={handleDecrease}>
              –
            </span>
            <span className="text-2xl font-bold px-3 py-1 text-blue-500">${value.toLocaleString()}</span>
            <span className="bg-gray-50 hover:bg-gray-100 cursor-pointer px-3 py-1" onClick={handleIncrease}>
              +
            </span>
          </div>
        </div>

        {/* Slider */}
        <Slider
          className="cursor-pointer"
          value={[value]}
          min={0}
          max={200000}
          step={1000}
          onValueChange={(val) => setValue(val[0])}
        />

        {/* Interest Saved */}
        <div className="flex justify-between items-center text-lg font-medium">
          <span className="text-muted-foreground">Interest Saved:</span>
          <span className="text-green-600 font-bold">${interestSaved.toLocaleString()}</span>
        </div>
      </div>
      <div className="-mx-5 -mb-5 mt-5 w-auto bg-gray-50 rounded-b-xl">
        <div className="flex items-center justify-between p-5">
          <div className="px-5 py-4">
            <h1 className=" text-muted-foreground font-semibold">Revenue Saved</h1>
            <span className="text-2xl font-semibold">${value.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="px-5 py-4 shadow-xs bg-white rounded-lg">
              <h1 className=" text-muted-foreground font-semibold">Additional Monthly Payment</h1>
              <span className="font-semibold">${value.toLocaleString()}</span>
            </div>
            <div className="px-5 py-4 shadow-xs bg-white rounded-lg">
              <h1 className=" text-muted-foreground font-semibold">Additional Total Payment</h1>
              <span className="font-semibold">${value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <div className="max-w-2x1 mx-auto z-20 my-30">
      <div className="text-center">
        <h2
          className="text-slate-700 text-[42px]
font-semibold"
        >
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="mt-16 sm:mt-20 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
  <PricingTable />
</div>

    </div>
  );
};

export default Plan;

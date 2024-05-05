"use client";

import React, { useContext } from "react";

import { cn } from "@/lib/utils";
import CustomToggle from "./toggle";
import { StoreContext } from "@/app/providers";

const FilterBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-2 sm:px-10 w-full bg-[#F8F9FB] overflow-x-scroll thin-scrollbar">
      <CustomToggle
        label="Verified"
        value="true"
        image="/filters/verified.svg"
      />
      <CustomToggle label="Any Price" value="0" image="/icons/anyprice.svg" />
    </div>
  );
};

export const ActionBar: React.FC = () => {
  const { loadProperties, filters } = useContext(StoreContext);
  if (filters.find((p) => p.name === "Any Price")) {
    return (
      <div
        className={cn(
          "transition-all duration-500 border-t flex items-center space-x-4 p-2 sm:px-10 w-full bg-[#F8F9FB] overflow-x-scroll thin-scrollbar"
          // filters[filters.length - 1]?.name.length ? "" : "hidden"
        )}
      >
        <CustomToggle label="₹0 - ₹1,50,000" value="0-150000" />
        <CustomToggle label="₹1,50,000 - ₹3,00,000+" value="150000-" />
      </div>
    );
  }

  return <></>;
};

export default FilterBar;

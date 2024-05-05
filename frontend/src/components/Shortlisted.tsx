"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface Props {
  items: Property[];
}

const Shortlisted: React.FC<Props> = ({ items }) => {
  return (
    <div className={cn("border w-[370px] rounded-xl flex flex-col")}>
      <h2 className="font-medium text-lg p-4 pb-3.5">Shortlisted Properties</h2>
      <div className="flex flex-col gap-0 border-t items-center">
        <p
          className={cn("p-2 py-6 text-gray-500", items.length ? "hidden" : "")}
        >
          No Property Selected
        </p>
        {items.map((item, index) => (
          <SelectedPropertyCard key={item._id} item={item} />
        ))}
      </div>
      <div className={cn("flex-1 p-4", items.length ? "" : "pt-0")}>
        <Button disabled={!items.length} className="rounded w-full">
          Schedule a visit
        </Button>
      </div>
    </div>
  );
};

export default Shortlisted;

const SelectedPropertyCard: React.FC<{ item: Property }> = ({ item }) => {
  return (
    <div className={cn("w-full flex items-center p-0 sm:p-4 border-b gap-4")}>
      <Image
        width={112}
        height={80}
        src={item.imageUrl}
        alt={item.address}
        className="w-28 h-20 rounded-lg object-center"
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-md font-semibold">
          {item.pricePerMonth}
          <span className="font-[300]"> / per month</span>
        </h2>
        <h3 className="text-xs font-[300] mt-[-1px] mb-1.5">{item.address}</h3>
        <div className="flex">
          <Image
            src="/icons/carpetArea.svg"
            alt=""
            width={8}
            height={8}
            className="w-3.5 h-auto object-contain mr-1 rounded-2xl"
          />
          <p className="text-xs sm:text-sm text-gray-500 font-[300]">
            Carpet Area:{" "}
            <span className="font-normal sm:font-medium">
              {item.carpetArea}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";
import { Property } from "@/lib/types";

export const ShortlistDropdown: React.FC<Props> = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleDropdown = () => {
    if (window && window.document) {
      setIsOpen((p) => {
        if (p) {
          window.document.body.style.overflow = "";
        } else {
          window.document.body.style.overflow = "hidden";
        }
        return !p;
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={cn(
          "w-[95%] flex border-gray-300 rounded-xl flex-col items-center justify-center",
          isOpen ? "border shadow-md" : ""
        )}
      >
        <div
          className={cn(
            "w-full bg-gray-200 p-4 max-h-[75vh] overflow-y-scroll flex flex-col items-center justify-center gap-4 border",
            isOpen ? "flex" : "hidden",
            isOpen ? "rounded-xl rounded-bl-none rounded-br-none" : ""
          )}
        >
          {items.map((item) => (
            <SelectedPropertyCard key={item._id} item={item} />
          ))}
        </div>
        <div
          onClick={handleToggleDropdown}
          className={cn(
            "rounded-xl w-full h-14 bg-gray-200 border border-gray-300 flex items-center justify-between px-4",
            isOpen
              ? "rounded-tl-none rounded-tr-none border-0 border-t"
              : "shadow-md"
          )}
        >
          <p>
            Shortlisted Properties:{" "}
            <span className="bg-gray-800 p-0.5 px-1.5 rounded-sm text-white">
              {items.length}
            </span>
          </p>
          <Image
            src="/icons/topTick.svg"
            alt=""
            width={8}
            height={8}
            className="w-6 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

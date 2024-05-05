"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { StoreContext } from "@/app/providers";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  _id: string;
  imageUrl: string;
  pricePerMonth: string;
  carpetArea: string;
  description: string;
  isVerified?: boolean;
  seatCount?: string;
  furnishings?: string;
  address: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  _id,
  imageUrl,
  pricePerMonth,
  carpetArea,
  description,
  isVerified,
  seatCount,
  furnishings,
  address,
}) => {
  const { selectProperty, selectedProperties } = useContext(StoreContext);
  const isShortlisted = Boolean(
    selectedProperties.find((sp) => sp._id === _id)
  );
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShortlisting = () => {
    selectProperty(_id);
  };
  const handleReadMore = () => {
    setShowFullDescription((p) => !p);
  };

  return (
    <div className=" rounded-2xl border overflow-hidden lg:w-[810px] lg:h-[290px] flex flex-col sm:flex-row">
      <div className="relative sm:w-1/3 lg:w-[45%]">
        <Image
          priority
          placeholder="blur"
          blurDataURL="/placeholderBlur.jpeg"
          src={imageUrl}
          alt={`Property ${address}`}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-8 absolute top-2 left-0 flex items-center justify-between px-4">
          {isVerified && (
            <Image
              src="/verified.svg"
              alt=""
              width={32}
              height={14}
              className="w-20 h-auto object-contain"
            />
          )}
          <div className="rounded-full bg-white w-24 h-7.5 p-2 flex items-center justify-center">
            <p className="text-xs text-gray-500 whitespace-nowrap">
              ~25-30 seats
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-2 sm:space-y-4 flex flex-col h-full">
        <div className="flex-1 flex flex-col p-5 pb-0 sm:pb-5 sm:border-b gap-2">
          <h2 className="text-xl font-semibold">
            {pricePerMonth}
            <span className="font-[300]"> / per month</span>
          </h2>
          <div className="flex mt-[-5px]">
            <Image
              src="/icons/locationMark.svg"
              alt=""
              width={8}
              height={8}
              className="w-3.5 h-auto object-contain mr-1"
            />
            <p className="text-sm text-gray-600 font-[300]">{address.trim()}</p>
          </div>
          <div className="flex gap-1 flex-col sm:gap-4 sm:flex-row">
            <div className="flex">
              <Image
                src="/icons/furnished.svg"
                alt=""
                width={8}
                height={8}
                className="w-3.5 h-auto object-contain mr-1"
              />
              <p className="text-sm text-gray-500 font-medium">{furnishings}</p>
            </div>
            <div className="flex">
              <Image
                src="/icons/carpetArea.svg"
                alt=""
                width={8}
                height={8}
                className="w-3.5 h-auto object-contain mr-1"
              />
              <p className="text-sm text-gray-500 font-[300]">
                Carpet Area: <span className="font-medium">{carpetArea}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="sm:h-28 relative px-5 sm:p-5 sm:py-2 gap-1 flex flex-col">
          <h6 className="hidden sm:block text-md font-medium text-gray-600 leading-[18px]">
            Office for rent in Bandra Kurla Complex, Mumbai
          </h6>
          <p className="font-[300] text-sm text-gray-400  ">
            {showFullDescription
              ? description.trim()
              : description.substring(0, 40).trim() + "..."}
            <a
              onClick={handleReadMore}
              className={cn(
                "inline-flex cursor-pointer text-sm text-primary ml-1"
              )}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </a>
          </p>
        </div>
        <div className="flex-1 border-t flex justify-between p-4 w-full">
          <div className="hidden sm:flex w-1/2">
            <Button variant="link" className="hover:no-underline p-0">
              Show All Images
            </Button>
          </div>
          <div className="w-full sm:w-1/2 h-full flex gap-2">
            <Button
              variant={isShortlisted ? "secondary" : "default"}
              className="rounded px-8 w-full"
              onClick={handleShortlisting}
            >
              {isShortlisted ? "Shortlisted" : "Shortlist"}
            </Button>
            <Image
              alt=""
              width={44}
              height={44}
              src="/icons/whatsapp.svg"
              className="w-[36px] h-auto object-contain cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

"use client";

import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import Shortlisted, { ShortlistDropdown } from "@/components/Shortlisted";
import FilterBar, { ActionBar } from "@/components/filterBar";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "./providers";
import ShowMore from "@/components/ShowMore";

export default function Home() {
  const {
    properties,
    loadProperties,
    selectedProperties,
    setMoreAvailable,
    moreAvailable,
  } = useContext(StoreContext);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    loadProperties({});
  }, []);

  return (
    <main className="flex w-screen min-h-screen flex-col items-center overflow-hidden transition-all duration-500">
      <Navbar phoneNumber="+918369003785" userInitials="M" />
      <FilterBar />
      <ActionBar />
      <div className="w-full flex px-4 sm:px-10 gap-6 justify-between 2xl:justify-evenly">
        <div className="w-full lg:w-1/2 grid gap-6">
          <h1 className="text-xl font-normal mt-10">
            47 Office Space,{" "}
            <span className="text-sm">Lower Parel, Mumbai</span>
          </h1>
          <div
            className={cn(
              "mb-6 flex flex-col gap-6",
              selectedProperties.length ? "mb-20" : ""
            )}
          >
            <p
              className={cn("text-gray-500", properties.length ? "hidden" : "")}
            >
              No Data Found!
            </p>
            {properties.map((property) => (
              <PropertyCard
                _id={property._id}
                key={property._id}
                imageUrl={property.imageUrl}
                pricePerMonth={property.pricePerMonth}
                carpetArea={property.carpetArea}
                description={property.description}
                isVerified={property.isVerified}
                seatCount={property.seatCount}
                furnishings={property.furnishings}
                address={property.address}
              />
            ))}
            <div
              className={cn(
                "w-full mt-2 flex justify-center",
                moreAvailable ? "" : "hidden"
              )}
            >
              <ShowMore />
            </div>
          </div>
        </div>
        <div className={cn("hidden xl:block mt-10")}>
          <Shortlisted items={selectedProperties} />
        </div>
      </div>
      <div
        className={cn(
          "xl:hidden fixed bottom-2 w-full",
          selectedProperties.length ? "" : "hidden"
        )}
      >
        <ShortlistDropdown items={selectedProperties} />
      </div>
    </main>
  );
}

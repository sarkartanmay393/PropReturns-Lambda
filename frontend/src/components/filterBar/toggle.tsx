import React, { useContext } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StoreContext } from "@/app/providers";

interface ToggleProps {
  label: string;
  image?: string;
  value?: string;
}

const CustomToggle: React.FC<ToggleProps> = ({ label, image, value = "" }) => {
  const { filters, setFilters, loadProperties, setPage } =
    useContext(StoreContext);
  const isActive = filters.find((f) => f.name === label || f.value === value);

  const handleOnClick = () => {
    if (
      filters.find((f) => f.name === label) ||
      filters.find((f) => f.value === value)
    ) {
      console.log("Filter removing");
      if (["0-150000", "150000-"].includes(value)) {
        if (filters.find((f) => f.name === "Any Price")) {
          const newFilters = [...filters.filter((f) => f.name !== "Any Price")];
          console.log(newFilters);
          setFilters(newFilters);
          setPage(1);
          loadProperties({ comingFilters: newFilters, pageNo: 1 });
          return;
        }
      }
      const newFilters = filters.filter((f) => f.name !== label);
      console.log(newFilters);
      setFilters(newFilters);
      setPage(1);
      if (label === "Any Price") {
        return;
      }
      loadProperties({ comingFilters: newFilters, pageNo: 1 });
    } else {
      console.log("Filter adding");

      if (["0-150000", "150000-"].includes(value)) {
        if (filters.find((f) => f.name === "Any Price")) {
          const newFilters = [
            ...filters.filter((f) => f.name !== "Any Price"),
            { name: "Any Price", value: value },
          ];
          console.log(newFilters);
          setFilters(newFilters);
          setPage(1);
          loadProperties({ comingFilters: newFilters, pageNo: 1 });
          return;
        }
      }
      const newFilters = [...filters, { name: label, value: value }];
      console.log(newFilters);
      setFilters(newFilters);
      setPage(1);
      if (label === "Any Price") {
        return;
      }
      loadProperties({ comingFilters: newFilters, pageNo: 1 });
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className={cn(
        "px-4 text-sm py-1 flex items-center justify-center lg:px-2 gap-1 rounded-full font-normal border whitespace-nowrap",
        !image ? "lg:px-4" : "",
        isActive ? "border-gray-400" : "bg-white"
      )}
    >
      {image ? (
        <Image
          alt={label}
          width={4}
          height={4}
          src={image}
          className="h-auto w-4 object-contain"
        />
      ) : (
        <></>
      )}
      {label}
    </button>
  );
};

export default CustomToggle;

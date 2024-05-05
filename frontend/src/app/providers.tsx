"use client";

import React, { createContext, useState } from "react";
import { BACKEND_API_URL } from "@/lib/utils";
import { Property } from "@/lib/types";

interface Filter {
  name: string;
  value: string;
}

interface Store {
  properties: Property[];
  loadProperties: ({
    comingFilters,
    pageNo,
  }: {
    comingFilters?: Filter[];
    pageNo?: number;
  }) => Promise<void>;
  selectedProperties: Property[];
  selectProperty: (id: string) => void;
  removeProperty: (id: string) => void;
  page: number;
  setPage: (page: number) => void;
  moreAvailable: boolean;
  setMoreAvailable: (moreAvailable: boolean) => void;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

const initialStore: Store = {
  properties: [],
  loadProperties: async () => {},
  selectedProperties: [],
  selectProperty: () => {},
  removeProperty: () => {},
  page: 1,
  setPage: () => {},
  moreAvailable: false,
  setMoreAvailable: () => {},
  filters: [],
  setFilters: () => {},
};

const StoreContext = createContext<Store>(initialStore);

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [page, setPage] = useState<number>(1);
  const [moreAvailable, setMoreAvailable] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  const loadProperties = async ({
    comingFilters,
    pageNo,
  }: {
    comingFilters?: Filter[];
    pageNo?: number;
  }) => {
    await fetchProperties(comingFilters || filters, pageNo || page);
  };

  const selectProperty = (id: string) => {
    if (selectedProperties.find((p) => p._id === id)) {
      console.log("Property already selected");
      return;
    }

    const exactProperty = properties.find((property) => property._id === id);
    if (exactProperty) {
      setSelectedProperties((prevSelectedProperties) => [
        ...prevSelectedProperties,
        exactProperty,
      ]);
    } else {
      console.error("Property not found");
    }
  };

  const removeProperty = (id: string) => {
    if (selectedProperties.find((p) => p._id === id)) {
      setSelectedProperties((prevSelectedProperties) =>
        prevSelectedProperties.filter((p) => p._id === id)
      );
    } else {
      console.log("Property already selected");
      return;
    }
  };

  const fetchProperties = async (filters: Filter[], pageNo: number) => {
    try {
      const resp = await fetch(BACKEND_API_URL + "/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters: filters, page: pageNo }),
      });

      if (!resp.ok) {
        // setProperties((p) => [...p]);
        console.error("Failed to fetch properties");
        return;
      }
      const data = await resp.json();
      if (pageNo > 1) {
        setProperties((p) => [...p, ...(data.properties as Property[])]);
      } else {
        setProperties(data.properties as Property[]);
      }
      setMoreAvailable(data.moreAvailable);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    }
  };

  const store: Store = {
    properties,
    loadProperties,
    selectedProperties,
    selectProperty,
    removeProperty,
    page,
    setPage,
    moreAvailable,
    setMoreAvailable,
    filters,
    setFilters,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, Providers };

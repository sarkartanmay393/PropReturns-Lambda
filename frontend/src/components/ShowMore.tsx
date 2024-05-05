"use client";

import React, { useContext, useState } from "react";

import { Button } from "./ui/button";
import { StoreContext } from "@/app/providers";

const ShowMore: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { loadProperties, page, setPage } = useContext(StoreContext);

  const handleShowMore = async () => {
    setLoading(true);
    setPage(page + 1);
    await loadProperties({ pageNo: page + 1 });
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleShowMore}
      className="w-[320px] h-10 flex items-center justify-center rounded-xl"
    >
      {loading ? "Loading..." : "Show More"}
    </Button>
  );
};

export default ShowMore;

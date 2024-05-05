"use client";

import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";

interface NavbarProps {
  phoneNumber: string;
  userInitials: string;
}

interface SearchBarProps {
  placeholder: string;
}

const Navbar: React.FC<NavbarProps> = ({ phoneNumber, userInitials }) => {
  return (
    <div className="w-full flex items-center justify-between bg-white p-4 sm:px-10 shadow h-[66px]">
      <div className="flex items-center gap-4 md:space-x-6">
        <Image
          width={16}
          height={16}
          src="/logo.svg"
          alt="PropReturns"
          className="h-auto w-40 object-contain hidden md:block"
        />
        <Image
          width={6}
          height={6}
          src="/menu.svg"
          alt="MenuButton"
          className="h-auto w-6 object-contain block md:hidden"
        />
        <SearchBar placeholder="Search for location" />
      </div>
      <div className="flex items-center space-x-6">
        <div className="space-x-2 hidden md:flex">
          <Image
            src="/call.svg"
            alt=""
            width={12}
            height={12}
            className="h-auto w-4 object-contain"
          />
          <span className="font-semibold hidden lg:inline-block text-sm">{phoneNumber}</span>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 p-2 uppercase">
          {userInitials}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-full sm:w-[320px] lg:w-[480px] px-2 h-[44px]">
      <Image src="/search.svg" width={18} height={18} alt="Search Icon" />
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border-0"
      />
    </div>
  );
};

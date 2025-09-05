import React, { useRef, useState } from "react";
import { Popover } from "./popover";
import DropdownIcon from "@/assets/images/svg/arrow_down.svg";
import { Interaction } from "../interaction";

interface DropdownProps {
  placeholder?: string;
  selected: string;
  options: string[];
  setSelected: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  selected,
  setSelected,
  options,
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Interaction
        ref={dropdownRef}
        className="bg-transparent border-[1px] border-[#00000033] rounded-[33px] text-[#111111B2] flex flex-row items-center justify-between gap-[8px] py-[10px] px-[14px] cursor-pointer min-w-[120px] text-[12px] font-medium"
        type="button"
        title="Select an option"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <p>{selected || placeholder || "Select an option"}</p>
        <DropdownIcon />
      </Interaction>

      <Popover
        anchorEl={dropdownRef.current}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="mt-2 w-[200px] bg-white shadow-lg rounded-[12px] border border-[#00000020] overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-100 ${
                option === selected ? "bg-gray-50 font-semibold" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </Popover>
    </>
  );
};

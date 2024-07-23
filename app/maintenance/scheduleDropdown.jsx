import React, { useState } from "react";

export function scheduleDropdown(scheduleDropdownSelected,setScheduleDropdownSelected, scheduleDropdownOptions) {
    const [isOpen, setIsOpen] = useState(false);
    function handleToggle() {
        setIsOpen(!isOpen);
    }
    return (
        <div className="relative items-start">
            <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                <a
                    onClick={handleToggle}
                    className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                    {scheduleDropdownSelected}
                </a>

                <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700" onClick={handleToggle}>
                    <span className="sr-only">Menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            { isOpen && <div
                className=" relative end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
            >
                {/* <div className="p-2">
                    <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        View on Storefront
                    </a>

                </div> */}
                {scheduleDropdownOptions.map((option) => (
                    <a  key = {option}
                        onClick={() => {setIsOpen(false);setScheduleDropdownSelected(option)}}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        {option}
                    </a>
                ))}

            </div>}
        </div>
    );
}
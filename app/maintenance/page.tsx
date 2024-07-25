'use client'
import React, { use, useEffect, useState } from "react";
import { maintenanceTable } from "./maintenanceTable";
import { scheduleDropdown } from "./scheduleDropdown";
import { supabase } from "../supabase";


function maintenancePage() {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [maintenanceInfo, setMaintenanceInfo] = useState<any>();
  const [scheduleDropdownSelected, setScheduleDropdownSelected] = useState<string>("Schedule");
  const [scheduleList, setScheduleList] = useState<string[]>([]);

  const [isSelect, setIsSelect] = useState(false);

  async function searchByKeyword(keyword: string) {
    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .or(`TIJ_ID.match.${keyword},name.match.${keyword},category.match.${keyword},model.match.${keyword},owner.match.${keyword}`);

        if (error) {
            return error;
        }
        return data;
    } catch (error) {
        return error;
    }
}


  async function handleSearch(search: string) {
    setSearchResult([]);
    setIsSelect(false);
    try {
      const res = await searchByKeyword(search);
      setSearchResult(res as any[]);
    }
    catch (err) {
      console.error(err);
    }


    // searchByKeyword(search).then((res) => {
    //   setSearchResult(res);
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
  function inputsearch() {
    return (
      <div className="relative">
        <label htmlFor="Search" className="sr-only"> Search </label>
        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSearch(inputSearch) : null}
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700" onClick={() => handleSearch(inputSearch)}>
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    )
  };



  useEffect(() => {
    const fetchData = async () => {
      const schedule = await fetch("http://localhost:3000/api/schedule");
      const scheduleData = await schedule.json();
      let tmp: string[] = []; // Add type annotation for tmp array
      for (let i = 0; i < scheduleData.length; i++) {
        tmp.push(scheduleData[i].schedule_name);
      }
      return tmp
    }
    fetchData().then((res) => {
      setScheduleList(res);

    }).catch((err) => {
      console.error(err);
    })
  }, [])
  return (
    <div className="py-10 lg:py-14 px-5">
      <h1>Maintenance Page</h1>
      <div className="grid min-h-dvh gap-2">
        <div className="col-span-4">
          <div className="w-full flex pt-10 mb-2">
            {inputsearch()}
          </div>
          <div className="max-w-full gap-y-2">
            {scheduleDropdown(scheduleDropdownSelected, setScheduleDropdownSelected, scheduleList)}
            <div className="bg-white rounded-md p-4 max-w-full">
              {maintenanceTable(searchResult, setMaintenanceInfo, scheduleDropdownSelected)}
            </div>
          </div>
        </div>
        {/* <div className="relative col-span-4 rounded-sm bg-gray-100 h-[60%] p-2">
          {maintenanceInfo ? detailCard(maintenanceInfo) : null}
        </div> */}
      </div>

    </div>
  );
}

export default maintenancePage;
'use client'

import Image from "next/image";
import Link from "next/link";
import { supabase } from "../app/supabase";

import { useEffect, useState } from "react";
import React from "react";


export default function Home() {
  const [isFeched, setIsFeched] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [amountItem, setAmountItem] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  async function searchByKeyword(keyword: string) {
    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .or(`TIJ_ID.match.${keyword},name.fts.${keyword},category.match.${keyword},model.fts.${keyword},owner.match.${keyword}`);

        if (error) {
            return error;
        }
        return data;
    } catch (error) {
        return error;
    }
}

async function searchByKeywordPaginated(keyword: string, page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit - 1;
    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .or(`TIJ_ID.match.${keyword},name.fts.${keyword},category.match.${keyword},model.fts.${keyword}`)
            .range(startIndex, endIndex);

        if (error) {
            return error;
        }
        return data;
    } catch (error) {
        return error;
    }
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

  function handleSearch(search: string) {
    setCurrentPage(1);
    setSearchResult([]);
    searchByKeyword(search).then((res) => {
      setSearchResult(res as any[]);
    }).catch((err) => {
      console.error(err);
    });

    console.log(searchResult);
  }

  function inventoryCard(items: any[]) {
    return (
      <>

        <div className="w-full">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">TIJ ID</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Model</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {items.length > 0 && items.map((item: any) => {
                return (
                  <tr key={item.id}>
                    <td className=" px-4 py-2 text-gray-700 break-normal break-words	">{item.TIJ_ID}</td>
                    <td className=" px-4 py-2 text-gray-700 break-normal break-words	">{item.name}</td>
                    <td className="  px-4 py-2 text-gray-700 break-normal break-words	">{item.model}</td>
                    <td className="  px-4 py-2 text-gray-700 break-normal break-words	">{item.category}</td>
                    <td className="  px-4 py-2">
                      <Link href={`/inventory/${item.id}`}
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                        View
                      </Link>
                    </td>
                  </tr>
                )
              })}

              {/* <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr> */}


            </tbody>
          </table>
        </div>

      </>
    )
  }

  function pageniation(currentPage: number, totalPage: number) {
    return (
    <div className="inline-flex items-center justify-center gap-3">
      <a
        href="#"
        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      <p className="text-xs text-gray-900">
        {currentPage}
        <span className="mx-0.25">/</span>
        {totalPage}
      </p>

      <a
        href="#"
        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
    )
  }



  useEffect(() => {

  }, [])

  return (
    <main className="">
      <div className="py-20">
        <h1 className="w-full text-center text-4xl">TIJ Inventory</h1>
        <div className="w-full flex justify-center pt-10">
          {inputsearch()}
        </div>
        <div className="max:w-[80%] align-middle items-center flex pt-10">
          {inventoryCard(searchResult)}
        </div>
        {//pageniation(1, 10)}
        }
      </div>
    </main>
  );
}

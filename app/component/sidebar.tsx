import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import React from 'react'

function sidebar() {
  return (
    <div className="hidden sm:flex h-screen w-60 flex-col justify-between border-e bg-gray-100 sm:fixed sm:col-span-2">
      <div className="px-4 py-6">
        <span className="grid place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          <Image src={logo} alt="logo" />
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Home page
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Event </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    href="/create"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Create inventory
                  </Link>
                </li>
                <li>
                  <Link
                    href="/maintenance"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Maintenance check
                  </Link>
                </li>

                <li>
                  <Link
                    href="/export"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Export Result
                  </Link>
                </li>
              </ul>
            </details>
          </li>


        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <Image src={logo} alt="logo" width={24} height={24} />
    
          <div>
            <p className="text-xs">
              <strong className="block font-medium">TIJ inventory</strong>

              <span> Project by RCS internship program 2024 </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default sidebar
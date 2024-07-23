'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

import React from "react";

function InventoryPage({ params }: { params: { slug: string } }) {
    // Ensure the slug is valid
    if (params) {
        let numId = parseInt(params.slug);
    }

    // Fetch data from API
    const [inventoryInfo, setInventoryInfo] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumb = () => {
        return (
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1 text-sm text-gray-600">
                    <li>
                        <Link href="/" className="block transition hover:text-gray-700">
                            <span className="sr-only">Home</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </Link>
                    </li>

                    <li className="rtl:rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>

                    <li>
                        <a href={params.slug} className="block transition hover:text-gray-700">
                            Item {params.slug}
                        </a>
                    </li>
                </ol>
            </nav>
        );
    };

    function handleDelete() {
        if (confirm("Are you sure you want to delete this item?")) {
            fetch(`/api`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: params.slug})
            })
                .then((res) => {
                    if (res.ok) {
                        window.location.href = "/";
                    } else {
                        alert("Delete failed");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting item:", error);
                    alert("Delete failed");
                });
        }
    }

    const itemTable = (inventoryInfo: any) => {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <tbody className="divide-y divide-gray-200">
                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">รหัสครุภัณฑ์:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.TIJ_ID}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">รายการ:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.name}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">รุ่น/แบบ:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.model}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">ขนาด:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.size}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">สี:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.color}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">Serial Number:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.sn}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">วันที่รับเข้า:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.date_added}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">หมวดหมู่:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.category}</td>
                        </tr>

                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-1">สถานะ:</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{inventoryInfo.status}</td>
                        </tr>
                        <tr className="grid grid-cols-4">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ผู้ครอบครอง:</td>
                            <td className="px-4 py-2 text-gray-700">{inventoryInfo.owner}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const maintenanceTable = (inventoryInfo: any) => {
        const maintenance = inventoryInfo.maintenance_record;

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Schedule</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Note</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ref</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {maintenance.map((record: any) => (
                            <tr key={record.id}>
                                <td className="px-4 py-2 text-gray-700 break-normal break-words">{record.schedule}</td>
                                <td className="px-4 py-2 text-gray-700 break-normal break-words">{new Date(record.created_at).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-gray-700 break-normal break-words">{record.status}</td>
                                <td className="px-4 py-2 text-gray-700 break-normal break-words">{record.note}</td>
                                <td className="px-4 py-2 break-normal break-words">{record.ref}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    useEffect(() => {
        fetch(`/api/inventory/${params.slug}`)
            .then((res) => res.json())
            .then((data) => {
                setInventoryInfo(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching inventory data:', error);
                setIsLoading(false);
            });
    }, [params.slug]);

    return (
        <div className="py-10 lg:py-14 px-5">
            {breadcrumb()}
            <h1>Item</h1>
            <p>{params.slug}</p>
            <div className="py-5">
                {!isLoading && inventoryInfo && itemTable(inventoryInfo)}
                {isLoading && <p>Loading...</p>}
                <div className="w-[60%]">
                    <h2 className="pt-4">Maintenance Record</h2>
                    {!isLoading && inventoryInfo && maintenanceTable(inventoryInfo)}
                </div>
            </div>
            
                <button className="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 w-20" onClick={() => handleDelete()}>Delete</button>
        </div>
    );
}

export default InventoryPage

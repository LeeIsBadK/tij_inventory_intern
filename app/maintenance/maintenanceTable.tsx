import React from 'react'
import Link from 'next/link'
export function maintenanceTable(items: any[], setSelectMaintenance: any, schedule:string) {
    
    return (
        <>
            <div className="">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                TIJ ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y-2 divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                    {item.id}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                    {item.TIJ_ID}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                    {item.model}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                    {schedule === "Schedule" ? <p className='text-gray-500 disabled:'>Edit</p> :<Link href={`./maintenance/${item.id}?schedule=${schedule}`} className="text-blue-500 hover:text-blue-700">Edit</Link>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
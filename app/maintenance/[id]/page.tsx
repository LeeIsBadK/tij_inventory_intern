'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import detailCard from './detailcard';



function Page({ params }: { params: { id: string} }) {
    const [itemInfo, setItemInfo] = useState<any>();
    const searchParams = useSearchParams();
    const schedule = searchParams.get("schedule");

    
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/inventory/${params.id}?schedule=${schedule}`);
                if (!res.ok) {
                    console.error(res.statusText);
                }
                let data = await res.json();
                if (data.maintenance_record.length === 0) {
                    data.maintenance_record.push({
                        "schedule": schedule,
                        "status": "Normal",
                        "note": "",
                        "ref": ""
                    });
                }
                setItemInfo(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItem();
    }, []);



    return (
        <>
            <div className="py-10 lg:py-14 px-5">
                <h1>Maintenance Page</h1>
                <div className="grid min-h-dvh gap-2">
                    {detailCard(itemInfo, schedule)}
                </div>
            
            </div>
            
        </>
    );
}

export default Page;
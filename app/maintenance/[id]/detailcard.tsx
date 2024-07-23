import { redirect } from "next/navigation";
import { it } from "node:test";
import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

export default function detailCard(itemInfo: any, schedule: any) {
    const [status, setStatus] = useState<any>();
    const [info, setInfo] = useState<any>();
    const [isCreated, setIsCreated] = useState(false);

    const deleteButton = () => {
        if (isCreated) {
            return <button className="bg-red-500 text-white rounded-md py-2" type="reset" >Delete</button>
        }
        else return;
    }


    const check = async (itemInfo: any) => {
        if (itemInfo?.maintenance_record[0].id !== undefined) {
            setIsCreated(true);
            return;
        }
        else setIsCreated(false);

        if (itemInfo?.maintenance_record[0].status === "Normal") {
            setStatus("Normal");
        } else if (itemInfo?.maintenance_record[0].status === "Out of order") {
            setStatus("Out of order");
        } else {
            setStatus("Other");
        }
    }
    async function handlesubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let json;
        if (isCreated) {
            json = {
                "id": itemInfo?.maintenance_record[0].id,
                "schedule": formProps.schedule,
                "inventory_id": itemInfo?.id,
                "status": formProps.status,
                "note": formProps.note,
                "ref": formProps.ref
            }
        }
        else {
            json = {
                "schedule": formProps.schedule,
                "inventory_id": itemInfo?.id,
                "status": formProps.status,
                "note": formProps.note,
                "ref": formProps.ref
            }
        }
        if (!isCreated) {
            const data = await fetch(`http://localhost:3000/api/maintenance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })
                .then((res: any) => {
                    alert("Success");
                })
                .finally (() => {
                    window.location.href = "/maintenance";
                })
            return;
        }
        else {
            const data = await fetch(`http://localhost:3000/api/maintenance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })
                .then((res: any) => {
                    alert("Success");
                    redirect("/maintenance");
                });
        }

    }

    const handlesDelete = async (e: any) => {
        e.preventDefault();
        const json = {
            "id": info?.maintenance_record[0].id,
        }
        const data = await fetch(`http://localhost:3000/api/maintenance`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then((res: any) => {
                console.log(res);
                alert("Success");
            })
    };

    useEffect(() => {
        console.log(itemInfo);
        setInfo(itemInfo);
        check(info);
    }, [itemInfo, isCreated]);


    return (
        <form className="flex flex-col gap-4 p-4" onSubmit={handlesubmit} onReset={handlesDelete}>
            <h1 className="text-2xl font-semibold">Maintenance Item {info?.inventory_id}</h1>
            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label className="block" htmlFor="id">ID</label>
                    <input className="w-full  text-gray-700 border rounded-md bg-gray-50" type="text" name="id" id="id" value={info?.TIJ_ID || ''} readOnly />
                </div>
                <div>
                    <label className="block" htmlFor="item">Item</label>
                    <input className="w-full  text-gray-700 border rounded-md bg-gray-50" type="text" name="item" id="item" value={info?.name || ''} readOnly />
                </div>
                <div>
                    <label className="block" htmlFor="schedule">Schedule</label>
                    <input className="w-full text-gray-700 border rounded-md bg-gray-50" type="text" name="schedule" id="schedule" defaultValue={info?.maintenance_record[0].schedule || ''}  readOnly/>
                </div>
                <div>
                    <label className="block" htmlFor="status">Status</label>
                    <select className="w-full" name="status" id="status" defaultValue={status || ""} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Out of order">Out out order</option>
                        <option value="Other">Other</option>
                    </select>

                </div>
                <div>
                    <label className="block" htmlFor="note">Note</label>
                    <input className="w-full border rounded-md" type="text" name="note" id="note" defaultValue={info?.maintenance_record[0].note || ''} />
                </div>
                <div>
                    <label className="block" htmlFor="ref">Ref</label>
                    <input className="w-full border rounded-md" type="text" name="ref" id="ref" defaultValue={info?.maintenance_record[0].ref || ""} />
                </div>

                <button className="bg-blue-500 text-white rounded-md py-2" type="submit">Submit</button>
                {deleteButton()}
            </div>
        </form>
    )
}
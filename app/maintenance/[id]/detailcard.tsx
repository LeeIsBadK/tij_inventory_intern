import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function DetailCard(itemInfo: any, schedule: any) {
    const [status, setStatus] = useState<any>();
    const [info, setInfo] = useState<any>();
    const [isCreated, setIsCreated] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<any>();

    const deleteButton = () => {
        if (isCreated) {
            return <button className="bg-red-500 text-white rounded-md py-2" type="reset">Delete</button>;
        }
        return null;
    };

    const check = (itemInfo: any) => {
        if (itemInfo?.maintenance_record[0]?.id !== undefined) {
            setIsCreated(true);
            setCurrentStatus(itemInfo?.maintenance_record[0]?.status);
        } else {
            setIsCreated(false);
        }

        if (itemInfo?.maintenance_record[0]?.status === "Normal") {
            setStatus("Normal");
        } else if (itemInfo?.maintenance_record[0]?.status === "Out of order") {
            setStatus("Out of order");
        } else {
            setStatus("Other");
        }
    };

    useEffect(() => {
        if (itemInfo?.maintenance_record[0]?.status) {
            setStatus(itemInfo.maintenance_record[0].status);
        }
        setInfo(itemInfo);
        check(itemInfo);
        setCurrentStatus(isCreated && itemInfo?.maintenance_record[0].status);
    }, [itemInfo, isCreated]);
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formProps = Object.fromEntries(formData);
        let json;

        if (isCreated) {
            json = {
                id: itemInfo?.maintenance_record[0].id,
                schedule: formProps.schedule,
                inventory_id: itemInfo?.id,
                status: formProps.status,
                note: formProps.note,
                ref: formProps.ref,
            };
        } else {
            json = {
                schedule: formProps.schedule,
                inventory_id: itemInfo?.id,
                status: formProps.status,
                note: formProps.note,
                ref: formProps.ref,
            };
        }

        const method = isCreated ? 'PUT' : 'POST';
        const url = `http://localhost:3000/api/maintenance`;
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json),
        });

        if (response.ok) {
            alert("Success");
            window.location.href = "/maintenance";
        } else {
            alert("Error");
        }
    };

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const json = {
            id: info?.maintenance_record[0]?.id,
        };
        const response = await fetch(`http://localhost:3000/api/maintenance`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json),
        });

        if (response.ok) {
            alert("Success");
            window.location.href = "/maintenance";
        } else {
            alert("Error");
        }
    };

    return (
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit} onReset={handleDelete}>
            <h1 className="text-2xl font-semibold">Maintenance Item {info?.inventory_id}</h1>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block" htmlFor="id">ID</label>
                    <input
                        className="w-full text-gray-700 border rounded-md bg-gray-50"
                        type="text"
                        name="id"
                        id="id"
                        value={info?.TIJ_ID || ''}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block" htmlFor="item">Item</label>
                    <input
                        className="w-full text-gray-700 border rounded-md bg-gray-50"
                        type="text"
                        name="item"
                        id="item"
                        value={info?.name || ''}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block" htmlFor="schedule">Schedule</label>
                    <input
                        className="w-full text-gray-700 border rounded-md bg-gray-50"
                        type="text"
                        name="schedule"
                        id="schedule"
                        defaultValue={info?.maintenance_record[0]?.schedule || ''}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block" htmlFor="status">Status (Current: {currentStatus || "Not Created record"})</label>
                    <select
                        className="w-full"
                        name="status"
                        id="status"
                        defaultValue={status || ""}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Out of order">Out of order</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block" htmlFor="note">Note</label>
                    <input
                        className="w-full border rounded-md"
                        type="text"
                        name="note"
                        id="note"
                        defaultValue={info?.maintenance_record[0]?.note || ''}
                    />
                </div>
                <div>
                    <label className="block" htmlFor="ref">Ref</label>
                    <input
                        className="w-full border rounded-md"
                        type="text"
                        name="ref"
                        id="ref"
                        defaultValue={info?.maintenance_record[0]?.ref || ''}
                    />
                </div>
                <button className="bg-blue-500 text-white rounded-md py-2" type="submit">Submit</button>
                {deleteButton()}
            </div>
        </form>
    );
}

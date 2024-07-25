'use client'

import React from "react";

function createpage() {
    function handlesubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        fetch(`./api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formProps)
        }).then((res) => {
            if (!res.ok) {
                console.error(res.statusText);
            }
            else {
                alert("Create success");
                window.location.href = "/";
            }
        }).catch((err) => {
            console.error(err);
            alert(err);
        });
    }
    return (
        <div>
            <form className="flex flex-col gap-4 p-4" onSubmit={handlesubmit}>
                <h1 className="text-2xl font-semibold">Create inventory info</h1>
                <div className="grid md:grid-cols-2 gap-4">

                    <div>
                        <label className="block" htmlFor="TIJ_ID">TIJ ID *required</label>
                        <input className="w-ful border rounded-md" type="text" name="TIJ_ID" id="TIJ_ID" required/>
                    </div>
                    <div>
                        <label className="block" htmlFor="name">Name *required</label>
                        <input className="w-full border rounded-md" type="text" name="name" id="name" required/>
                    </div>
                    <div>
                        <label className="block" htmlFor="model">Model</label>
                        <input className="w-ful border rounded-md" type="text" name="model" id="model" />
                    </div>
                    <div>
                        <label className="block" htmlFor="size">Size</label>
                        <input className="w-full border rounded-md" type="text" name="size" id="size" />
                    </div>
                    <div>
                        <label className="block" htmlFor="color">Color</label>
                        <input className="w-full border rounded-md" type="text" name="color" id="color" />
                    </div>

                    <div>
                        <label className="block" htmlFor="sn">Serial number</label>
                        <input className="w-full border rounded-md" type="text" name="sn" id="sn" />
                    </div>

                    <div>
                        <label className="block" htmlFor="date_added">Date added</label>
                        <input className="w-full border rounded-md" type="date" name="date_added" id="date_added" required/>
                    </div>

                    <div>
                        <label className="block" htmlFor="ref">Category</label>
                        <select className="w-full border rounded-md" name="category" id="category">
                            <option value="ยานพาหนะ">ยานพาหนะ</option>
                            <option value="สำนักงาน">สำนักงาน</option>
                            <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                            <option value="ไฟฟ้าและวิทยุ">ไฟฟ้าและวิทยุ</option>
                            <option value="โฆษณาและเผยแพร่">โฆษณาและเผยแพร่</option>
                            <option value="การแพทย์และวิทยาศาสตร์">การแพทย์และวิทยาศาสตร์</option>
                            <option value="งานบ้านงานครัว">งานบ้านงานครัว</option>
                            <option value="กีฬา">กีฬา</option>
                            <option value="ทรัพย์สินไม่มีตัวตน">ทรัพย์สินไม่มีตัวตน</option>
                        </select>
                    </div>

                    <div>
                        <label className="block" htmlFor="ref">Owner</label>
                        <input className="w-full border rounded-md" type="text" name="owner" id="owner" />  
                    </div>

                    <div>
                        <label className="block" htmlFor="status">Status</label>
                        <input className="w-full border rounded-md" type="text" name="status" id="status" />
                    </div>
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white rounded-md py-2" type="submit">Create</button>
            </form>
        </div>
    );
}
export default createpage;
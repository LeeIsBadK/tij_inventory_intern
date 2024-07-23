'use client'
import React, { use, useEffect, useState } from "react";
import { maintenanceTable } from "./exportTable";
import { scheduleDropdown } from "./scheduleDropdown";



function exportPage() {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [maintenanceInfo, setMaintenanceInfo] = useState<any[]>([]);
  const [scheduleDropdownSelected, setScheduleDropdownSelected] = useState<string>("Schedule");
  const [scheduleList, setScheduleList] = useState<string[]>([]);


  async function handleExport(schedule: string) {
    try {
      const res = await fetch(`/api/export?schedule=${schedule}`);
      if (res.ok) {
        const csvData = await res.text();
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csvData], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "export.csv";
        link.click();
        URL.revokeObjectURL(url);
      } else {
        console.log("Export failed");
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async function handleAddSchedule() {
    const scheduleName = prompt("Enter schedule name");
    if (scheduleName) {
      try {
        const res = await fetch(`/api/schedule`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schedule_name: scheduleName }),
        });
        if (res.ok) {
          window.location.reload();
        } else {
          alert("Add schedule failed");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  async function handleDeleteSchedule(schedule: string) {
    if (schedule === "Schedule") {
      alert("Please select a schedule to delete");
      return;
    }
    if (confirm(`Are you sure you want to delete schedule ${schedule}?`)) {
      try {
        const res = await fetch(`/api/schedule`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schedule_name: schedule }),
        });
        if (res.ok) {
          window.location.reload();
        } else {
          alert("Delete schedule failed");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const fetchSchedule = async () => {
      const schedule = await fetch(`/api/schedule`);
      const scheduleData = await schedule.json();
      let tmp: string[] = []; // Provide type annotation for tmp array
      for (let i = 0; i < scheduleData.length; i++) {
        tmp.push(scheduleData[i].schedule_name);
      }
      return tmp;
    }
    fetchSchedule().then((res) => {
      setScheduleList(res);

    }).catch((err) => {
      console.error(err);
    })

    const fetchData = async () => {
      const data = await fetch(`/api/maintenance`);
      const result = await data.json();
      setMaintenanceInfo(result)
    }
    fetchData();


  }, []);
  return (
    <div className="py-10 lg:py-14 px-5">
      <h1>Export Page</h1>

      <div className="grid grid-cols-9 gap-2 pt-2">
        <div className="col-span-4">
          {scheduleDropdown(scheduleDropdownSelected, setScheduleDropdownSelected, scheduleList)}
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit" onClick={ (e) => handleExport(scheduleDropdownSelected)}>Export</button>
        <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit" onClick={ (e) => handleAddSchedule()}>Add Schedule</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-fit" onClick={ (e) => handleDeleteSchedule(scheduleDropdownSelected)}>Delete Schedule</button>

      </div>
      <div className="pt-2">
        {maintenanceTable(maintenanceInfo)}
      </div>

    </div>
  );
}

export default exportPage;
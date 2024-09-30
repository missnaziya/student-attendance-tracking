"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartComponent from "./_components/BarChartComponent";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([]);
  const { setTheme } = useTheme();
  useEffect(() => {
    // setTheme("light");
    getStudentAttendance()
    getTotalPresentCountByDay()
  }, [selectedMonth , selectedGrade]);


  const getStudentAttendance = () =>{
    GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format("MM/yyyy"))
    .then(res=>{
      setAttendanceList(res.data);
      
    })
  }

  const getTotalPresentCountByDay =()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format("MM/yyyy"),selectedGrade)
    .then(res=>{
      setTotalPresentData(res);
      
    })
  }
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Dashboard</h1>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelection selectedGrade={setSelectedGrade} />
        </div>
      </div>

      <StatusList  attendanceList={attendanceList}/>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2"><BarChartComponent  attendanceList={attendanceList} totalPresentData={totalPresentData}/></div>
      </div>
    </div>
  );
};

export default Dashboard;

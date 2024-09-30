"use client"
import { getUniqueRecords } from "@/app/_services/service";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartComponent = ({ attendanceList, totalPresentData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    formatAttendanceListCount();
  }, [attendanceList||totalPresentData]);

  const formatAttendanceListCount = () => {
    const totalStudent = getUniqueRecords(attendanceList);
    console.log(totalStudent,"totalStudent..",attendanceList);
    
    // const result = totalPresentData?.map((item => ({
    //   day: item.day,
    //   presentCount: item.presentCount,
    //   absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    // })))
    // console.log(result,"res>>>");

    // setData(result);
  };
  return (
    <div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="presentCount" fill="#8884d8" />
        <Bar dataKey="absentCount" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;

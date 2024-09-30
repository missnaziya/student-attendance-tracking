"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];
const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "studentId",filter:true },
    { field: "name",filter:true },
  ]);

  const daysInMonths = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonths(
    moment(selectedMonth).format("YYYY"),
    moment(selectedMonth).format("MM")
  );

  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  console.log(daysArrays, "da");

  useEffect(() => {
    if (attendanceList) {
      console.log("Attendance List:", attendanceList);
      console.log("colDefs List:", colDefs);

      const userList = getUniqueRecords();
      setRowData(userList);
      console.log(daysArrays, "days_array");

      // Create new column definitions from daysArrays
      const newColDefs = daysArrays.map((date) => ({
        field: date.toString(),
        width: 50,
        editable: true,
      }));
      daysArrays.forEach((date) => {
        // Update colDefs once to avoid duplicates
        setColDefs((prevData) => {
          const existingFields = new Set(prevData.map((col) => col.field));
          const uniqueNewColDefs = newColDefs.filter(
            (col) => !existingFields.has(col.field)
          );

          return [...prevData, ...uniqueNewColDefs];
        });
        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  const getUniqueRecords = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });
    return uniqueRecord;
  };

  const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/yyyy");
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date,
      };
      GlobalApi.MarkAttendance(data).then((res) => {
        console.log(res);
        toast("Student Id :" + studentId + " Marked as present");
      });
    } else {
      GlobalApi.MarkAbsent(studentId,day,date).then(res=>{
        console.log(res,"res");
        
        toast("student id "+studentId+" Marked as absent")
      })
    }
  };

  return (
    <div>
      {" "}
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)
          }
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default AttendanceGrid;

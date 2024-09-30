"use client";
import React, { useEffect, useState } from "react";
import { AddNewStudent } from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getAllStudent();
  }, []);

  // get all students
  const getAllStudent = () => {
    GlobalApi.GetAllStudents().then((res) => {
      setStudentList(res.data);
    });
  };

  return (
    <div className="p-7">
      <h1 className="font-bold text-2xl flex justify-between items-center">
        Student
        <AddNewStudent refreshData={getAllStudent} />
      </h1>

      <StudentListTable studentList={studentList} refreshData={getAllStudent} />
    </div>
  );
};

export default Student;

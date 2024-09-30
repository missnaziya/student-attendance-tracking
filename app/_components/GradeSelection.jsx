"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";

const GradeSelection = ({ selectedGrade }) => {
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    getAllGradesList();
  }, []);
  const getAllGradesList = () => {
    GlobalApi.GetAllGrades().then((res) => {
      setGrades(res.data);
    });
  };
  return (
    <div>
      {" "}
      <select
        className="p-3 border rounded-lg "
        onChange={(e) => {
          selectedGrade(e.target.value);
        }}
      >
        {grades.map((item, index) => (
          <option value={item.grade}>{item.grade}</option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelection;

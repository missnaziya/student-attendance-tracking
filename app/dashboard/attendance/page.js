"use client"
import GradeSelection from '@/app/_components/GradeSelection'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

const Attendance = () => {
    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedGrade, setSelectedGrade] = useState()
    const [attendanceList, setAttendanceList] = useState([])

    //fetch attendance list
const onSearchHandler=()=>{
console.log(selectedMonth,selectedGrade,"test");
const month = moment(selectedMonth).format('MM/YYYY')
console.log(month,"MOnth");

GlobalApi.GetAttendanceList(selectedGrade,month).then(res=>{
    setAttendanceList(res.data);
    
})

}

  return (
    <div className='p-7'><h1 className='text-2xl font-bold'>Attendance
    </h1>
    
    {/* //search option */}
    <div className='flex  my-5gap-4 p-5 border rounded-lg shadow-sm'>
    <div className='flex gap-2 items-center'>

        <label>
            Select Month:
        </label>
        <MonthSelection  selectedMonth={(value)=>{setSelectedMonth(value)}} />
        </div>
        <div className='flex gap-2 items-center px-5'>

        <label>
            Select Grade:
        </label>
        <GradeSelection selectedGrade={(v)=>{setSelectedGrade(v)}}/>
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
    </div>


    {/* student attendance grid */}
    <AttendanceGrid  attendanceList={attendanceList } selectedMonth={selectedMonth}/>
    </div>
  )
}

export default Attendance
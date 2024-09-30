import { getUniqueRecords } from '@/app/_services/service'
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react'
import moment from 'moment'
import React, { useEffect,useState } from 'react'
import Card from './Card'

const StatusList = ({attendanceList}) => {
    const [totalStudent,setTotalstudent] = useState(0)
    const [presentPerc,setPresentPerc] = useState(0)
useEffect(()=>{
    if(attendanceList){
        
        const totalSt = getUniqueRecords(attendanceList)
        
        setTotalstudent(totalSt.length);
        
        const today = moment().format('D')
        const presentPer= (attendanceList.length/(totalSt.length*Number(today))*100)
console.log(presentPer);
        
    }
},[attendanceList])

  return (
    <div className='grid grid cols-1   md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
<Card icon={<GraduationCap />} title="total student" value={totalStudent}></Card>
<Card icon={<TrendingUp />} title="total  Present" value={(presentPerc).toFixed(1)+"%"}></Card>
<Card icon={<TrendingDown />} title="total absent" value={(100-presentPerc).toFixed(1)+"%"}></Card>

    </div>
  )
}

export default StatusList
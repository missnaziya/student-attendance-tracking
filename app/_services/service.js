// /return distinct user list 
export const getUniqueRecords = (attendanceList) => {
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
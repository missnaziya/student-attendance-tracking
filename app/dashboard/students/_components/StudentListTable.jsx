import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ studentList, refreshData }) => {
  const [searcInput, setSearchInput] = useState();

  const customButtons = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteRecord(props.data.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: "action", cellRenderer: customButtons },
  ]);
  const [rowData, setRowData] = useState();

  useEffect(() => {
    studentList && setRowData(studentList);
  });

  const deleteRecord = (id) => {
    console.log(id, "id");

    GlobalApi.DeleteStudentRecord(id).then((res) => {
      console.log(id, "id2");

      if (res) {
        toast("Record deleted successfully.");
        refreshData();
      }
    });
  };
  return (
    <div className="my-7">
      {" "}
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
          <Search />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="search anything"
            className="outline-none w-full"
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searcInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentListTable;

"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

export const AddNewStudent = ({refreshData}) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllGradesList();
  }, []);
  const getAllGradesList = () => {
    GlobalApi.GetAllGrades().then((res) => {
      setGrades(res.data);
    });
  };
  const onSubmit = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudent(data).then((res) => {
      if (res.data) {
        reset();
        refreshData();
        setOpen(false);
        toast("New student added.");
      }
      setLoading(false);
    });
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student </Button>

      <Dialog open={open}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    placeholder="Ex. jhon carry"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select
                    {...register("grade", { required: true })}
                    className="p-3 border rounded-lg "
                  >
                    {grades.map((item, index) => (
                      <option value={item.grade}>{item.grade}</option>
                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label>Contact no.</label>
                  <Input placeholder="98XXXXXXX" {...register("contact")} />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    placeholder="tsx- 66 ketty perry ,NY"
                    {...register("address", { required: true })}
                  />
                </div>

                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disable={loading}>
                    {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

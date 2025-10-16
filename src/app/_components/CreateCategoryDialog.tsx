"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateCategoryDialog = ({
  getCategories,
}: {
  getCategories: () => void;
}) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const addCategory = async () => {
    try {
      fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      alert("Category added successfully!");
      setOpen(false);
      setCategoryName("");
      getCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const categoryNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="flex w-full items-center gap-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="w-[36px] h-[36px] rounded-full bg-red-500 flex justify-center items-center text-white text-[20px] cursor-pointer">
            +
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col  w-full  gap-4">
            <Label htmlFor="Category name">Category Name</Label>
            <Input
              id="Category name"
              name="Category name"
              value={categoryName}
              onChange={categoryNameChangeHandler}
              placeholder="Type category name"
            />
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!categoryName}
              className="w-[110px]"
              type="submit"
              onClick={addCategory}
            >
              Add Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

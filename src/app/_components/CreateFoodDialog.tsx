"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const CreateFoodDialog = () => {
  const [preview, setPreview] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();

  const addFoodHandler = () => {
    fetch("http://localhost:8080/create-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const previewUrl = file ? URL.createObjectURL(file) : undefined;
    setPreview(previewUrl);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex flex-col gap-6 items-center h-[241px] w-[239px] border border-dashed border-red-500 rounded-lg justify-center">
            <div className=" bg-red-500 text-white rounded-full h-[40px] w-[40px] flex items-center justify-center">
              +
            </div>
            <p className="text-[14px]">
              Add New Dish To <br /> Salads
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Dish to Appetizers</DialogTitle>
          </DialogHeader>
          <div className="flex  w-full items-center gap-4">
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="Food name">Food Name</Label>
              <Input
                id="Food name"
                name="Food name"
                value={name}
                onChange={nameChangeHandler}
                placeholder="Enter food name..."
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="Food price">Food Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={price || ""}
                onChange={priceChangeHandler}
                placeholder="Enter price..."
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="Food description">Ingredients</Label>
            <Textarea
              placeholder="List ingredients..."
              id="Food description"
              name="Food description"
            />
          </div>
          <Label htmlFor="Food image">Food Image</Label>
          <div className="relative cursor-pointer bg-gray-100 h-[240px] overflow-hidden rounded-md">
            <input
              type="file"
              className="opacity-0 absolute inset-0 z-2"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview as string}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="border border-dashed border-blue-300 bg-gray-100 rounded-md p-2 flex flex-col items-center justify-center gap-4 w-full h-full">
              <div>
                <img
                  className="w-[40px] rounded-full"
                  src="https://static.vecteezy.com/system/resources/previews/056/202/171/non_2x/add-image-or-photo-icon-vector.jpg"
                />
              </div>
              <h1>Choose a file or drag & drop it here</h1>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="w-[93px]" type="submit" onClick={addFoodHandler}>
              Add Dish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

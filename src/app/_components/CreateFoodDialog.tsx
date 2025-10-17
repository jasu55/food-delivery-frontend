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
import { ChangeEvent, useState } from "react";

export const CreateFoodDialog = ({
  categoryId,
  refetchFoods,
}: {
  categoryId: string;
  refetchFoods: () => Promise<void>;
}) => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [ingredients, setIngredients] = useState<string>("");
  const [open, setOpen] = useState<boolean>(closed);

  const addFoodHandler = async () => {
    console.log({ name, price, image, ingredients, categoryId });
    if (!name || !price || !image || !ingredients) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("name", name);
    form.append("price", String(price));
    form.append("image", image); // File object
    form.append("ingredients", ingredients);
    form.append("categoryId", categoryId);

    try {
      const response = await fetch("http://localhost:8080/api/food", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      if (response.ok) {
        await refetchFoods();
        setOpen(false);
        setName("");
        setPrice(0);
        setImage(undefined);
        setIngredients("");
      } else {
        alert(data.error || "Failed to create food");
      }
    } catch (error) {
      alert("Failed to create food");
    }
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setOpen(true)}
            className="flex flex-col gap-6 items-center h-[241px] w-[239px] border border-dashed border-red-500 rounded-lg justify-center"
          >
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
            <Input
              placeholder="List ingredients..."
              id="Food description"
              name="Food description"
              value={ingredients}
              onChange={ingredientsChangeHandler}
            />
          </div>
          <Label htmlFor="Food image">Food Image</Label>
          <Input id="picture" type="file" onChange={fileChangeHandler} />
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

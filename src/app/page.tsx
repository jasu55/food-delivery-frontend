"use client";
import { CreateFoodDialog } from "./_components/CreateFoodDialog";
import { Button } from "@/components/ui/button"; // Adjust the path if necessary
import { AdminLayout } from "./AdminLayout";
import { useEffect, useState } from "react";
import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";
import { CategoryFoods } from "./_components/CategoryFoods";

export default function Page() {
  const [categories, setCategories] = useState<{ categoryName: string }[]>([]);

  const getCategories = async () => {
    const result = await fetch("http://localhost:8080/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.ok) {
      throw new Error("Failed to fetch categories");
    }
    const responseData = await result.json();
    console.log("DATA", responseData);
    const { category } = responseData;
    setCategories(category);
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log(categories);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <AdminLayout>
        <div className="h-[176px] w-screen bg-[#FFFFFF] rounded-md ml-[24px] mt-[24px] p-[24px]">
          <div className="font-bold text-[20px]  pt-[24px]">
            Dishes category
          </div>
          <div className="mt-[16px] flex gap-2">
            {categories?.map((category, index) => (
              <Button
                className="bg-white text-black rounded-full border-1 border-black "
                key={index}
              >
                {category.categoryName}
                <p className="bg-black text-white rounded-full  px-2">
                  {categories.length}
                </p>
              </Button>
            ))}
            <div>{CreateCategoryDialog()}</div>
            {/* <div>{CreateFoodDialog()}</div> */}
          </div>
        </div>
        {categories?.map(() => (
          <CategoryFoods
          // key={category.name}
          // title={category.name}
          // _id={category._id}
          ></CategoryFoods>
        ))}
      </AdminLayout>
    </div>
  );
}

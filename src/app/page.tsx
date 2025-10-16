"use client";
import { CreateFoodDialog } from "./_components/CreateFoodDialog";
import { Button } from "@/components/ui/button"; // Adjust the path if necessary
import { AdminLayout } from "./AdminLayout";
import { useEffect, useState } from "react";
import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";
import { Badge } from "@/components/ui/badge"; // Adjust the path if necessary
import { CategorizedFoods } from "./_components/CategorizedFoods";
import { CategoryType } from "@/lib/types/types";


export default function Page() {
  const [categories, setCategories] = useState<
    { categoryName: string; _id: string }[]
  >([]);
  const [foods, setFoods] = useState<any[]>([]);

  const getFoods = async () => {
    const result = await fetch("http://localhost:8080/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
  };

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

  const deleteCategory = async (id: string) => {
    const categoryToDelete = categories.find((category) => category._id === id);
    if (!categoryToDelete) {
      console.error("Category not found");
      return;
    }
    if (
      !confirm(
        `Are you sure you want to delete ${categoryToDelete.categoryName}?`
      )
    ) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      alert("Category deleted successfully!");
      await getCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);


  return (
    <div className="h-screen w-screen bg-gray-100">
      <AdminLayout>
        <div className="h-[176px] w-screen bg-[#FFFFFF] rounded-md ml-[24px] mt-[24px] p-[24px]">
          <div className="font-bold text-[20px]  pt-[24px]">
            Dishes category
          </div>
          <div className="mt-[16px] flex gap-2 flex-wrap">
            {categories?.map((category, index) => (
              <Badge
                className="bg-white text-black rounded-full border-1 border-black "
                key={index}
              >
                {category.categoryName}
                <p className="bg-black text-white rounded-full  px-2">
                  {categories.length}
                </p>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="ml-2 text-red-500 font-bold"
                >
                  x
                </button>
              </Badge>
            ))}

            <CreateCategoryDialog getCategories={getCategories} />
          </div>
        </div>
        <div>
          {categories.map((category) => {
            return (
              <CategorizedFoods
                key={category._id}
                refetchFoods={() => getFoods()}
                category={category}
                foods={foods.filter(
                  (food) => food.categoryId._id == category._id
                )}
              />
            );
          })}
        </div>
      </AdminLayout>
    </div>
  );
}

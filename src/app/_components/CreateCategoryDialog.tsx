"use client";
import { useState } from "react";

export const CreateCategoryDialog = () => {
  const [categoryName, setCategoryName] = useState<string>("");

  const addCategoryHandler = () => {
    fetch("http://localhost:8080/create-category", {
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
  };

  const categoryNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">Category Name</label>
      <input
        type="text"
        value={categoryName}
        onChange={categoryNameChangeHandler}
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={addCategoryHandler}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Add Category
      </button>
    </div>
  );
};

"use client";
import { Badge } from "@/components/ui/badge";
import { CreateFoodDialog } from "./_components/CreateFoodDialog";
import { AdminLayout } from "./AdminLayout";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    const result = await fetch("http://localhost:3000/categories");
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
    return data;
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <AdminLayout>
        <div>
          {categories.map((category: any) => (
            <Badge variant="outline" key={category.id}>
              {category.name}
            </Badge>
          ))}
          <div>
            <h1>Pizza (5)</h1>
            {CreateFoodDialog()}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

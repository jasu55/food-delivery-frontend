"use client";
import { CreateFoodDialog } from "./_components/CreateFoodDialog";
import { AdminLayout } from "./AdminLayout";

export default function Page() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <AdminLayout>
        <div>
          <div>
            <h1>Pizza (5)</h1>
            {CreateFoodDialog()}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

import { CategoryType, FoodType } from "@/lib/types/types";
import { CreateFoodDialog } from "./CreateFoodDialog";

export const CategorizedFoods = ({
  foods,
  category,
  refetchFoods,
}: {
  foods: FoodType[];
  category: CategoryType;
  refetchFoods: () => Promise<void>;
}) => {
  return (
    <div className=" border border-2 p-4 rounded-lg bg-white">
      <h2>{category.name}</h2>
      <div className="flex flex-wrap gap-2">
        <CreateFoodDialog
          categoryId={category._id}
          refetchFoods={refetchFoods}
        />
        {foods.map((food: FoodType) => (
          <div key={food._id}>
            <p>{food.name}</p>
            <img src={food.imageUrl} alt="" className="w-40 h-40" />
          </div>
        ))}
      </div>
    </div>
  );
};

export type FoodType = {
  _id?: string;
  name: string;
  ingredients: string;
  imageUrl: string;
  price: number;
  categoryId: string;
};

export type CategoryType = {
  name: string;
  _id: string;
};

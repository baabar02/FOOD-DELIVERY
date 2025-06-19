import { model, Schema } from "mongoose";

export type FoodCategory = {
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

export const FoodCategorySchema = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});
FoodCategorySchema.index({ categoryName: 1 }, { unique: true });

export const FoodCategoryModel = model<FoodCategory>(
  "FoodCategories",
  FoodCategorySchema
);

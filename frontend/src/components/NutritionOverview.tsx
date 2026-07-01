import type { FoodAnalysis } from "../types/nutrition";

interface Props {
  data: FoodAnalysis;
}

export default function NutritionOverview({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-xl font-bold mb-4">
        Nutrition Overview
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          Calories: {data.calories}
        </div>

        <div>
          Protein: {data.protein}g
        </div>

        <div>
          Sugar: {data.sugar}g
        </div>

        <div>
          Fat: {data.fat}g
        </div>
      </div>
    </div>
  );
}
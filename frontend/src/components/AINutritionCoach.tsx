import type { FoodAnalysis } from "../types/nutrition";

interface Props {
  data: FoodAnalysis;
}

export default function AINutritionCoach({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="font-bold mb-3">
        🤖 AI Nutrition Coach
      </h2>

      <p>{data.ai_analysis}</p>
    </div>
  );
}
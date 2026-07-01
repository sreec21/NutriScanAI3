import type { FoodAnalysis } from "../types/nutrition";

interface Props {
  data: FoodAnalysis;
}

export default function NutriScore({
  data,
}: Props) {
  return (
    <div className="bg-green-50 rounded-2xl p-6">
      <h2 className="font-bold mb-2">
        Nutri Score
      </h2>

      <div className="text-5xl font-bold text-green-600">
        {data.health_score}
      </div>

      <p>/100</p>
    </div>
  );
}
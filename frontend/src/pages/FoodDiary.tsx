import { useEffect, useState } from "react";
import {
  UtensilsCrossed,
  Flame,
  Beef,
  Candy,
  Droplets,
  Plus,
} from "lucide-react";

import api from "../services/api";

interface DiaryEntry {
  meal: string;
  food: string;
  calories: number;
  protein: number;
  sugar: number;
  fat: number;
}

export default function FoodDiary() {
  const [insights, setInsights] =
  useState<any>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [meal, setMeal] =
    useState("Breakfast");

  const [food, setFood] =
    useState("");

  const [calories, setCalories] =
    useState("");

  const [protein, setProtein] =
    useState("");

  const [sugar, setSugar] =
    useState("");

  const [fat, setFat] =
    useState("");

 useEffect(() => {
  fetchDiary();
  fetchInsights();
}, []);
const fetchInsights = async () => {
  try {
    const response =
      await api.get(
        "/diary-insights"
      );

    setInsights(response.data);
  } catch (error) {
    console.error(error);
  }
};
  const fetchDiary = async () => {
    try {
      const response =
        await api.get("/diary");

      setEntries(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveFood = async () => {
    if (
      !food ||
      !calories ||
      !protein ||
      !sugar ||
      !fat
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/diary", {
        meal,
        food,
        calories: Number(calories),
        protein: Number(protein),
        sugar: Number(sugar),
        fat: Number(fat),
      });

      await fetchDiary();
await fetchInsights();

      setFood("");
      setCalories("");
      setProtein("");
      setSugar("");
      setFat("");

      alert("Food added!");
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    }
  };

  const totalCalories = entries.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  const totalProtein = entries.reduce(
    (sum, item) => sum + item.protein,
    0
  );

  const totalSugar = entries.reduce(
    (sum, item) => sum + item.sugar,
    0
  );

  const totalFat = entries.reduce(
    (sum, item) => sum + item.fat,
    0
  );

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading diary...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}

      <h1 className="text-4xl font-bold mb-2">
        Food Diary 🍽️
      </h1>

      <p className="text-slate-500 mb-8">
        Track your daily meals and nutrition.
      </p>

      {/* Add Food Form */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="text-green-500" />
          <h2 className="text-2xl font-bold">
            Add Food
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={meal}
            onChange={(e) =>
              setMeal(e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option>
              Breakfast
            </option>
            <option>
              Lunch
            </option>
            <option>
              Dinner
            </option>
            <option>
              Snack
            </option>
          </select>

          <input
            type="text"
            placeholder="Food Name"
            value={food}
            onChange={(e) =>
              setFood(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) =>
              setCalories(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) =>
              setProtein(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Sugar (g)"
            value={sugar}
            onChange={(e) =>
              setSugar(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Fat (g)"
            value={fat}
            onChange={(e) =>
              setFat(e.target.value)
            }
            className="border rounded-xl p-3"
          />
        </div>

        <button
          onClick={saveFood}
          className="
            mt-6
            bg-green-500
            hover:bg-green-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Save Food
        </button>
      </div>

      {/* Nutrition Summary */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <Flame className="text-orange-500 mb-2" />

          <p className="text-slate-500">
            Calories
          </p>

          <h2 className="text-3xl font-bold">
            {totalCalories}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <Beef className="text-green-500 mb-2" />

          <p className="text-slate-500">
            Protein
          </p>

          <h2 className="text-3xl font-bold">
            {totalProtein}g
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <Candy className="text-pink-500 mb-2" />

          <p className="text-slate-500">
            Sugar
          </p>

          <h2 className="text-3xl font-bold">
            {totalSugar}g
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <Droplets className="text-blue-500 mb-2" />

          <p className="text-slate-500">
            Fat
          </p>

          <h2 className="text-3xl font-bold">
            {totalFat}g
          </h2>
        </div>
      </div>
{/* AI Nutrition Coach */}

{insights && (
  <div className="bg-white p-6 rounded-3xl shadow mb-8">
    <h2 className="text-2xl font-bold mb-4">
      🤖 AI Nutrition Coach
    </h2>

    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-2xl">
        <p className="text-slate-500 text-sm">
          Daily Calories
        </p>

        <h3 className="text-3xl font-bold text-green-600">
          {insights.total_calories}
        </h3>
      </div>

      <div className="bg-blue-50 p-4 rounded-2xl">
        <p className="text-slate-500 text-sm">
          Meals Logged
        </p>

        <h3 className="text-3xl font-bold text-blue-600">
          {insights.meals_logged}
        </h3>
      </div>
    </div>

    <div className="space-y-3">
      {insights.total_protein < 50 && (
        <div className="bg-yellow-50 p-4 rounded-xl">
          ⚠ Protein intake is low. Add eggs,
          chicken, fish, paneer or legumes.
        </div>
      )}

      {insights.total_sugar > 40 && (
        <div className="bg-red-50 p-4 rounded-xl">
          ⚠ Sugar intake is high. Reduce
          sweets and sugary drinks.
        </div>
      )}

      {insights.total_fat > 70 && (
        <div className="bg-orange-50 p-4 rounded-xl">
          ⚠ Fat intake is high. Try more
          grilled and baked foods.
        </div>
      )}

      {insights.total_calories < 1200 && (
        <div className="bg-blue-50 p-4 rounded-xl">
          ℹ Daily calories appear low.
          Make sure you're eating enough.
        </div>
      )}

      {insights.total_protein >= 50 &&
        insights.total_sugar <= 40 &&
        insights.total_fat <= 70 && (
          <div className="bg-green-50 p-4 rounded-xl">
            ✅ Great nutritional balance
            today. Keep it up!
          </div>
        )}
    </div>
  </div>
)}
      {/* Food Entries */}

      {entries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow">
          <UtensilsCrossed
            size={60}
            className="mx-auto text-slate-300 mb-4"
          />

          <h2 className="text-2xl font-bold">
            No Foods Logged Yet
          </h2>

          <p className="text-slate-500 mt-2">
            Add your first meal above.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {entries.map(
            (entry, index) => (
              <div
                key={index}
                className="
                  bg-white
                  p-6
                  rounded-2xl
                  shadow
                "
              >
                <div className="flex justify-between">
                  <div>
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {entry.meal}
                    </span>

                    <h3 className="text-xl font-bold mt-3">
                      {entry.food}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      {entry.calories}
                    </p>

                    <span className="text-slate-500">
                      kcal
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <p>Protein</p>
                    <h4>
                      {entry.protein}g
                    </h4>
                  </div>

                  <div className="bg-pink-50 p-3 rounded-xl">
                    <p>Sugar</p>
                    <h4>
                      {entry.sugar}g
                    </h4>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-xl">
                    <p>Fat</p>
                    <h4>
                      {entry.fat}g
                    </h4>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../services/api";

interface HistoryItem {
  product: string;
  calories: number;
  protein: number;
  sugar: number;
  fat: number;
  health_score: number;
}

export default function History() {
  const [history, setHistory] = useState<
    HistoryItem[]
  >([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response =
        await api.get("/history");

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Scan History
      </h1>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow-sm
              p-6
              flex
              justify-between
              items-center
            "
          >
            <div>
              <h3 className="font-bold text-lg">
                {item.product}
              </h3>

              <p className="text-slate-500">
                Calories:
                {item.calories}
              </p>
            </div>

            <div
              className="
                text-3xl
                font-bold
                text-green-600
              "
            >
              {item.health_score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
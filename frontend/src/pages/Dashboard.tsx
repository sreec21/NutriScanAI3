import { useEffect, useState } from "react";
import {
  ScanLine,
  HeartPulse,
  Salad,
  TrendingUp,
  UtensilsCrossed,
  Flame,
} from "lucide-react";

import api from "../services/api";
import HealthTrendChart from "../components/HealthTrendChart";
import RecentScans from "../components/RecentScans";

interface DashboardStats {
  total_scans: number;
  average_score: number;
  healthy_products: number;
}

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [chartData, setChartData] =
    useState<any[]>([]);

  const [diaryEntries, setDiaryEntries] =
    useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
    fetchChartData();
    fetchDiary();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response =
        await api.get("/dashboard");

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response =
        await api.get("/history");

      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDiary = async () => {
    try {
      const response =
        await api.get("/diary");

      setDiaryEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="p-8">
        Loading Dashboard...
      </div>
    );
  }

  const totalFoodsLogged =
    diaryEntries.length;

  const totalCalories =
    diaryEntries.reduce(
      (sum, item) =>
        sum +
        Number(item.calories || 0),
      0
    );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor your nutrition,
          diary entries and food scans.
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        {/* Total Scans */}

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
            border
            border-slate-100
            hover:shadow-lg
            transition
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Total Scans
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.total_scans}
              </h2>

              <div className="flex items-center gap-2 mt-4">
                <TrendingUp
                  size={16}
                  className="text-green-500"
                />

                <span className="text-green-600 text-sm">
                  Nutrition Tracking
                </span>
              </div>
            </div>

            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
              "
            >
              <ScanLine
                size={28}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Average Health Score */}

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
            border
            border-slate-100
            hover:shadow-lg
            transition
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Average Health Score
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-3">
                {stats.average_score}
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                Across all products
              </p>
            </div>

            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
              "
            >
              <HeartPulse
                size={28}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Healthy Products */}

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
            border
            border-slate-100
            hover:shadow-lg
            transition
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Healthy Products
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-3">
                {stats.healthy_products}
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                Score above 70
              </p>
            </div>

            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >
              <Salad
                size={28}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Foods Logged */}

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
            border
            border-slate-100
            hover:shadow-lg
            transition
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Foods Logged
              </p>

              <h2 className="text-4xl font-bold text-purple-600 mt-3">
                {totalFoodsLogged}
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                Food diary entries
              </p>
            </div>

            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-purple-100
                flex
                items-center
                justify-center
              "
            >
              <UtensilsCrossed
                size={28}
                className="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calories Summary */}

      <div
        className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          border
          border-slate-100
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500">
              Today's Calories
            </p>

            <h2 className="text-5xl font-bold text-orange-500 mt-2">
              {totalCalories}
            </h2>

            <p className="text-slate-500 mt-2">
              Based on your diary entries
            </p>
          </div>

          <div
            className="
              h-20
              w-20
              rounded-3xl
              bg-orange-100
              flex
              items-center
              justify-center
            "
          >
            <Flame
              size={40}
              className="text-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Chart + Recent Scans */}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HealthTrendChart
            data={chartData}
          />
        </div>

        <div>
          <RecentScans />
        </div>
      </div>
    </div>
  );
}
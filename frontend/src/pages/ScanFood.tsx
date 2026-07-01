import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

import api from "../services/api";

import NutritionOverview from "../components/NutritionOverview";
import NutriScore from "../components/NutriScore";
import AINutritionCoach from "../components/AINutritionCoach";

import type { FoodAnalysis } from "../types/nutrition";

export default function ScanFood() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState("");

  const [result, setResult] =
    useState<FoodAnalysis | null>(null);

  const analyzeFood = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post(
        "/scan",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResult(response.data);

      setOcrText(
        response.data.ocr_text || ""
      );

    } catch (error: any) {
      console.error(
        "Upload Error:",
        error
      );

      if (error.response) {
        console.error(
          "Server Response:",
          error.response.data
        );
      }

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(
      URL.createObjectURL(file)
    );

    setResult(null);
    setOcrText("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Scan Food
      </h1>

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <label
          htmlFor="food-upload"
          className="
            border-2 border-dashed border-slate-300
            rounded-2xl
            p-12
            flex flex-col
            items-center
            justify-center
            cursor-pointer
            transition-all
            hover:border-green-500
            hover:bg-green-50
          "
        >
          {!preview ? (
            <>
              <Upload
                size={60}
                className="text-green-500 mb-4"
              />

              <h2 className="text-xl font-semibold">
                Upload Food Label
              </h2>

              <p className="text-slate-500 mt-2">
                Click to browse files
              </p>

              <p className="text-slate-400 text-sm mt-1">
                PNG, JPG, JPEG supported
              </p>
            </>
          ) : (
            <>
              <img
                src={preview}
                alt="Preview"
                className="
                  max-h-96
                  rounded-xl
                  object-contain
                  mb-4
                "
              />

              <div className="flex items-center gap-2 text-green-600 font-medium">
                <ImageIcon size={18} />
                {image?.name}
              </div>

              <span className="mt-4 text-sm text-slate-500">
                Click to choose another image
              </span>
            </>
          )}
        </label>

        <input
          id="food-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {image && (
          <button
            onClick={analyzeFood}
            disabled={loading}
            className="
              mt-6
              bg-green-500
              hover:bg-green-600
              disabled:bg-gray-400
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            {loading
              ? "Analyzing..."
              : "Analyze Food"}
          </button>
        )}
      </div>

      {/* OCR Result */}
      {ocrText && (
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-green-500" />

            <h2 className="text-xl font-bold">
              OCR Result
            </h2>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <pre className="whitespace-pre-wrap text-slate-700">
              {ocrText}
            </pre>
          </div>
        </div>
      )}

      {/* Nutrition Results */}
{result && (
  <div className="grid gap-6 mt-8">

    <NutritionOverview data={result} />

    <NutriScore data={result} />

    <AINutritionCoach data={result} />

    {/* Save To Diary */}
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">
        Save To Food Diary
      </h3>

      <button
        onClick={async () => {
          try {
            await api.post("/diary", {
              meal: "Lunch",
              food: result.product,
              calories: result.calories,
              protein: result.protein,
              sugar: result.sugar,
              fat: result.fat,
            });

            alert(
              "Added to Food Diary successfully!"
            );
          } catch (error) {
            console.error(error);

            alert(
              "Failed to save to diary"
            );
          }
        }}
        className="
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
        ➕ Add To Food Diary
      </button>
    </div>

  </div>
)}
    </div>
  );
}
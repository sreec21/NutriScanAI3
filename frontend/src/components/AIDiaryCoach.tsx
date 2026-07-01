interface Props {
  insights: {
    pros: string[];
    cons: string[];
    recommendation: string;
  };
}

export default function AIDiaryCoach({
  insights,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Nutrition Coach
      </h2>

      <div className="mb-4">
        <h3 className="font-semibold text-green-600">
          Pros
        </h3>

        <ul className="list-disc ml-5">
          {insights.pros.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-red-600">
          Cons
        </h3>

        <ul className="list-disc ml-5">
          {insights.cons.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-xl">
        <h3 className="font-semibold">
          Recommendation
        </h3>

        <p>
          {insights.recommendation}
        </p>
      </div>
    </div>
  );
}
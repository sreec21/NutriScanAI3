import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function HealthTrendChart({
  data,
}: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-bold mb-4">
        Health Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="health_score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
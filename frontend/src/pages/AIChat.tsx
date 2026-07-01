import { useState } from "react";
import api from "../services/api";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/chat", {
        message,
      });

      setResponse(res.data.reply);
    } catch (error) {
      console.error(error);
      alert("Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        AI Nutrition Chat 🤖
      </h1>

      <div className="bg-white p-6 rounded-3xl shadow">
        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask anything about nutrition..."
          className="
            w-full
            border
            rounded-xl
            p-4
            h-40
            resize-none
          "
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="
            mt-4
            bg-green-500
            hover:bg-green-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </button>
      </div>

      {response && (
        <div className="mt-8 bg-white p-6 rounded-3xl shadow">
          <h2 className="font-bold text-xl mb-4">
            AI Response
          </h2>

          <p className="whitespace-pre-wrap">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
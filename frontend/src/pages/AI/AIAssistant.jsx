import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { askAI } from "../../services/aiService";

function AIAssistant() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        type: "ai",
        text:
          "Hello 👋 I am your School AI Assistant. How can I help you today?"
      }
    ]);

  const [loading, setLoading] =
    useState(false);

  const handleSend = async () => {

    if (!message.trim())
      return;

    const currentMessage =
      message;

    setMessages(
      (prev) => [
        ...prev,
        {
          type: "user",
          text: currentMessage
        }
      ]
    );

    setMessage("");
    setLoading(true);

    try {

      const response =
        await askAI(
          currentMessage
        );

      setMessages(
        (prev) => [
          ...prev,
          {
            type: "ai",
            text:
              response.answer ||
              "No response received."
          }
        ]
      );

    } catch (error) {

      console.log(error);

      setMessages(
        (prev) => [
          ...prev,
          {
            type: "ai",
            text:
              "❌ Unable to connect to AI service."
          }
        ]
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-3xl font-bold mb-6">
          AI Assistant
        </h1>

        <div className="bg-white rounded-xl shadow-sm h-[75vh] flex flex-col">

          <div className="flex-1 overflow-y-auto p-6">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`px-4 py-3 rounded-xl max-w-2xl whitespace-pre-wrap ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-black"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>

              )
            )}

            {loading && (

              <div className="mb-4">
                <p className="text-gray-500">
                  AI is typing...
                </p>
              </div>

            )}

          </div>

          <div className="border-t p-4 flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {
                  handleSend();
                }

              }}
              placeholder="Ask anything..."
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <button
              onClick={
                handleSend
              }
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AIAssistant;
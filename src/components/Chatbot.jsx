import { useState } from 'react';

function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('http://localhost:5000/gemini', options);
      const data = await response.text();

      setChatHistory(oldChatHistory => [
        ...oldChatHistory,
        { role: "user", parts: value },
        { role: "model", part: data },
      ]);
      setValue("");
      setError(""); 
    } catch (error) {
      console.error(error);
      setError("Things are not looking good. Please try again later!");
    }
  };

  const clearChat = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="p-4 overflow-y-auto">
        {chatHistory.map((chatItem, index) => (
          <div key={index} className="mb-2 p-2 rounded-lg shadow-md">
            <b className="text-gray-800">{chatItem.role}:</b>
            <span className="text-gray-600">{chatItem.parts || chatItem.part}</span>
          </div>
        ))}
      </div>
      <div className="p-4 flex">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your message"
          className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button onClick={getResponse} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          Send
        </button>
        <button onClick={clearChat} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ml-2 rounded-lg">
          Clear
        </button>
      </div>
      {error && <div className="text-red-500 p-4">{error}</div>}
    </div>
  );
}

export default Chatbot;
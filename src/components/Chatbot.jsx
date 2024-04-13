import { useState } from 'react';

function Chatbot() {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Initialize chat history

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
    <div>
      <h1>Chat with Gemini</h1>
      <div>
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <b>{chatItem.role}:</b> {chatItem.parts || chatItem.part}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={getResponse}>Send</button>
        <button onClick={clearChat}>Clear</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Chatbot;

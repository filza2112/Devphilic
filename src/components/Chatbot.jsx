import React, { useState } from 'react';

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    try {
      setLoading(true);
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      const botMessage = data.response;

      setChatHistory(prevHistory => [...prevHistory, { user: userInput, bot: botMessage }]);
      setUserInput(''); // Clear input field
    } catch (error) {
      console.error('Error:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    sendMessage();
  }

  return (
    <div id="chat-container">
      <h1>Coding Money Chatbot</h1>
      <div id="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index}>
            <div className="user-message">{message.user}</div>
            <div className="bot-message">{message.bot}</div>
          </div>
        ))}
      </div>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="user-input" 
          placeholder="Enter your message" 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {loading && (
        <div id="loader">
          <img src="/loader.gif" width="150px" alt="Loading..." />
        </div>
      )}
    </div>
  );
}

export default Chatbot;

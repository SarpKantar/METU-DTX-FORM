import React, { useState, useEffect, useRef} from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import '../styling/ChatbotInterface.css'; // Import your CSS file for styling

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messageListRef = useRef(null); // Reference for scrolling

  const cleanResponseText = (text) => {
    // Replace multiple spaces with a single space
    text = text.replace(/\s+/g, ' ').trim();
    
    // Remove spaces before punctuation
    text = text.replace(/\s+([.,!?;])/g, '$1'); // Remove space before punctuation
    text = text.replace(/([.,!?;])\s+/g, '$1 '); // Ensure space after punctuation

    // Remove spaces before apostrophes
    text = text.replace(/\s*'\s*/g, "'"); // Remove spaces around apostrophes

    return text;
};

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
  
    const OLLAMA_API_URL = 'http://localhost:11434';
    console.log('Using Ollama URL:', OLLAMA_API_URL);
  
    const userMessage = { role: 'user', content: inputText };
    setMessages([...messages, userMessage]);
    setInputText('');
  
    try {
      console.log('Sending request to:', `${OLLAMA_API_URL}/api/chat`);
      
      // Create the exact message format that worked in our test
      const messageBody = {
        model: 'llama2:7b-chat-q4_0',  // Using the quantized version
        messages: [{ role: 'user', content: inputText }]
      };
      
      console.log('Request body:', JSON.stringify(messageBody, null, 2));
      
      const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const reader = response.body.getReader();
      let result = '';
      let done = false;
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        result += new TextDecoder("utf-8").decode(value);
        done = doneReading;
      }
  
      // Split the result into individual JSON objects
      const messagesArray = result.split('\n').filter(Boolean).map(msg => {
            try {
                return JSON.parse(msg);
            } catch (e) {
                console.error('Error parsing message:', e);
                return null; // Return null for invalid JSON
            }
        }).filter(msg => msg); // Filter out null values
  
      // Combine the messages into a single response
      const combinedMessage = messagesArray.map(msg => cleanResponseText(msg.message.content)).join(' ');
  
      // Create a single bot message object
      const botMessage = { role: 'assistant', content: combinedMessage };
  
      // Update the messages state with the combined bot message
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = (message, index) => (
    <div key={index} className={message.role === 'user' ? 'user-message' : 'bot-message'}>
      <p>{message.content}</p>
    </div>
  );

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="message-list">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotInterface;
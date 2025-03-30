// Need to: npm install axios
// To run:
// python server.py
// npm start

import React, { useState } from 'react';
import axios from 'axios';

function FileWriter() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/write_file', {
        text: text,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error writing file: " + error.message);
    }
  };

  return (
    <div>
      <h1>Write to File via Python Backend</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter text to write to file"
        />
        <button type="submit">Write to File</button>
      </form>
    </div>
  );
}

export default ServerConnection;

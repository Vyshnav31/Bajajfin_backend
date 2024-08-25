import React, { useState } from 'react';
import './App.css'; // You can add styles here
import { useEffect } from 'react';
function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate JSON
    let parsedInput;
    try {
      parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format");
      }
    } catch (err) {
      setError("Invalid JSON input. Please enter a valid JSON.");
      return;
    }

    try {
      const res = await fetch('https://bajajfin-backend.onrender.com/bfhl', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
        mode: 'cors',
      });
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError("Error calling the API. Please try again.");
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    let renderedData = {};
    if (selectedOptions.includes('Alphabets')) {
      renderedData.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      renderedData.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      renderedData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response Data:</h3>
        <pre>{JSON.stringify(renderedData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter JSON:
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="5"
            cols="50"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <label>
            Select Data to Display:
            <select multiple={true} onChange={handleDropdownChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </label>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;

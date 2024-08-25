const express = require('express');
const app = express();

app.use(express.json());

const userInfo = {
    full_name: "john_doe",  
    dob: "17091999",        
    email: "john@xyz.com", 
    roll_number: "ABCD123"  
};

// POST endpoint to handle data and return the desired response
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(ch => ch === ch.toLowerCase())
                                              .sort().reverse()[0] || '';

    const response = {
        is_success: true,
        user_id: `${userInfo.full_name}_${userInfo.dob}`,
        email: userInfo.email,
        roll_number: userInfo.roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
});

// GET endpoint to return a hardcoded operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

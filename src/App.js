import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional: Add your own styling

const App = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    const fetchQuote = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await axios.get('https://type.fit/api/quotes');
            const quotes = response.data;
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex].text);
            setAuthor(quotes[randomIndex].author || "Unknown");
        } catch (error) {
            console.error("Error fetching the quote:", error);
            setQuote("Sorry, couldn't fetch a quote."); // Fallback message
            setAuthor(""); // Clear author if there's an error
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchQuote(); // Fetch a quote on component mount
    }, []);

    const handleNewQuote = () => {
        fetchQuote(); // Fetch a new quote on button click
    };

    const tweetQuote = () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
        window.open(tweetUrl, '_blank');
    };

    return (
        <div id="quote-box" className="quote-box">
            {loading ? ( // Show loading text while fetching
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 id="text">{quote}</h1>
                    <h3 id="author">{author}</h3>
                    <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
                    <a id="tweet-quote" onClick={tweetQuote} href="#!" target="_blank" rel="noopener noreferrer">Tweet this quote</a>
                </>
            )}
        </div>
    );
};

export default App;
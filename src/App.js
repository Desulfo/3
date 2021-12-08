import { useState, useEffect } from "react";

import "./App.css";

const quoteAPI =
  "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";
const getRandomIndex = (number) => {
  const randomIndex = Math.floor(Math.random() * number);
  return randomIndex;
};

function App() {
  const [quoteList, setQuoteList] = useState(null);
  const [displayedQuotes, setDisplayedQuotes] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);

  const getNewQuote = () => {
    setDisplayedQuotes((prevQuotes) => [
      ...prevQuotes,
      quoteList[getRandomIndex(quoteList.length)],
    ]);
  };
  useEffect(() => {
    fetch(quoteAPI)
      .then((response) => response.json())
      .then((receivedQuoteList) => {
        setQuoteList(receivedQuoteList);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (quoteList) {
      setDisplayedQuotes([quoteList[getRandomIndex(quoteList.length)]]);
      setCurrentQuoteIndex(0);
    }
  }, [quoteList]);
  useEffect(() => {
    if (displayedQuotes) {
      setCurrentQuoteIndex(displayedQuotes.length - 1);
    }
  }, [displayedQuotes]);
  const displayPrevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => prevIndex - 1);
  };
  return (
    <>
      <h1>Your random qoute</h1>
      {displayedQuotes && (
        <figure>
          <blockquote>{displayedQuotes[currentQuoteIndex].quote}</blockquote>
          <figcaption>- {displayedQuotes[currentQuoteIndex].author}</figcaption>
        </figure>
      )}
      <div className="buttonsWrapper">
        <button onClick={getNewQuote}>New quote</button>
        {currentQuoteIndex > 0 && (
          <button onClick={displayPrevQuote}>Prev quote</button>
        )}
      </div>
    </>
  );
}

export default App;

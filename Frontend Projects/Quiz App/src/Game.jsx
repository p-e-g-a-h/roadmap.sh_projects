import { useState } from "react";
import cards from "./cards";

export default function Game() {
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isCardDone, setIsCardDone] = useState(false);

  if (cardIndex == cards.length)
    return (
      <section className="w-xl m-auto mt-60 p-15 border rounded-2xl text-center bg-blue-950 text-blue-50">
        <h2 className="text-3xl">End | Score: {score}</h2>
      </section>
    );

  return (
    <section className="w-xl m-auto mt-20 p-15 border rounded-2xl text-center text-blue-950">
      <h2 className="text-3xl text-amber-950">
        {cardIndex + 1 + ". " + cards[cardIndex].q}
      </h2>

      <ul>
        {cards[cardIndex].items.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setClickedIndex(index);
              if (!isCardDone && index == cards[cardIndex].answerIndex) {
                setScore((prevScore) => prevScore + 1);
              }
              setIsCardDone(true);
            }}
            className={`
              text-xl mt-10 mb-10 text-left border rounded-2xl p-2 cursor-pointer ${clickedIndex !== null && index == cards[cardIndex].answerIndex ? "bg-emerald-900 text-blue-50" : clickedIndex == index && index !== cards[cardIndex].answerIndex ? "bg-red-900 text-blue-50" : ""}`}
          >
            {index + 1 + ". " + item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-20">
        <button
          onClick={() => {
            setCardIndex((prevCardIndex) => prevCardIndex + 1);
            setClickedIndex(null);
            setIsCardDone(false);
          }}
          className="border p-5 rounded-2xl cursor-pointer hover:bg-amber-50 hover:text-amber-950 bg-amber-950 text-amber-50"
        >
          Next
        </button>
        <p className="border p-5 rounded-2xl text-blue-50 bg-blue-950">
          Score: {score}
        </p>
      </div>
    </section>
  );
}

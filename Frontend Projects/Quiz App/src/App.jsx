import { useState } from "react";
import Game from "./Game";

function StartPage({ display }) {
  return (
    <section className="w-xl m-auto mt-50 p-15 rounded-2xl text-center bg-blue-950 text-amber-100">
      <h2 className="text-6xl">Quiz App</h2>
      <p className="text-xl mt-10 mb-10">3 questions about animals</p>
      <button
        onClick={() => display(false)}
        className="border p-5 rounded-2xl cursor-pointer hover:bg-amber-950 hover:text-blue-100"
      >
        Start
      </button>
    </section>
  );
}

export default function App() {
  const [start, setStart] = useState(true);

  return (
    <>
      {start && <StartPage display={setStart} />}
      {!start && <Game />}
    </>
  );
}

import { useEffect, useState, useRef } from "react";
import audio from "./assets/audio.wav";

const states = ["start", "stop", "resume", "reset"];

export default function App() {
  const [timeState, setTimeState] = useState(null);
  const [time, setTime] = useState({ type: "work", second: 0, minute: 25 });
  const [workSessions, setWorkSessions] = useState(0);
  const audioRef = useRef(new Audio(audio));

  useEffect(() => {
    if (timeState == "start" || timeState == "resume") {
      const interval = setInterval(() => {
        setTime((t) => {
          if (t.minute == 0 && t.second == 0) {
            if (t.type == "work") setWorkSessions((s) => s + 1);
            audioRef.current.play();
            clearInterval(interval);
            return t;
          } else if (t.second == 0) {
            return { ...t, second: 59, minute: t.minute - 1 };
          }
          return { ...t, second: t.second - 1 };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeState]);

  return (
    <>
      <section className="m-auto mt-10 w-fit p-10">
        <div className="flex justify-center items-center gap-5 mt-10">
          <Btn
            handleClick={() => setTime({ type: "work", second: 0, minute: 25 })}
            classCondition={time.type == "work" ? "bg-amber-300" : ""}
            text="Work"
          />
          <Btn
            handleClick={() =>
              setTime({ type: "sbreak", second: 0, minute: 5 })
            }
            classCondition={time.type == "sbreak" ? "bg-amber-300" : ""}
            text="Short Break"
          />
          <Btn
            handleClick={() =>
              setTime({ type: "lbreak", second: 0, minute: 15 })
            }
            classCondition={time.type == "lbreak" ? "bg-amber-300" : ""}
            text="Long Break"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-10 mt-10 p-10">
          <p className="text-4xl">
            {time.minute} : {time.second}
          </p>
          <p className="text-2xl">Work Sessions: {workSessions}</p>
        </div>

        <div className="flex justify-center items-center gap-10 mt-10">
          {states.map((item, index) => {
            return (
              <Btn
                key={index}
                handleClick={() => {
                  if (item == "reset") {
                    setTimeState(null);
                    setTime({ type: "work", second: 0, minute: 25 });
                  } else {
                    setTimeState(item);
                  }
                }}
                classCondition={
                  (item === "start" && timeState !== null) ||
                  (item !== "start" && timeState === null)
                    ? "hidden"
                    : ""
                }
                text={item.charAt(0).toUpperCase() + item.slice(1)}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

function Btn({ handleClick, classCondition, text }) {
  const btnStyle =
    "cursor-pointer p-3 rounded-xl border border-amber-300 hover:bg-amber-300";
  return (
    <button onClick={handleClick} className={`${btnStyle} ${classCondition}`}>
      {text}
    </button>
  );
}

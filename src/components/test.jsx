import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState("☀️");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  ">
      <div className="w-[400px] h-[300px] shadow-2xl flex items-center justify-around">
        <button
          className="w-[100px] h-[50px] bg-red-500 text-white"
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Decrement
        </button>

        <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>

        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className="w-[100px] h-[50px] bg-green-500 text-white"
        >
          Increment
        </button>
      </div>

      <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center flex-col ">
        <span className="h-[30px] text-2xl font-bold"> {isOn}</span>
        <div className="w-full h-[50px]  flex justify-center">
          <button
            className="w-[100px] text-white bg-red-500 h-full"
            onClick={() => setIsOn("🌑")}
          >
            Off
          </button>
          <button
            className="w-[100px] text-white bg-green-500 h-full"
            onClick={() => setIsOn("☀️")}
          >
            On
          </button>
        </div>
      </div>
    </div>
  );
}

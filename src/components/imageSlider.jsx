import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <img
        src={images[currentIndex]}
        className="w-[80%] h-[500px]  object-contain"
      />
      <div className="w-full  h-[100px] flex flex-row justify-center  gap-4 items-center">
        {images.map((img, index) => {
          return (
            <img
              key={index}
              src={images[index]}
              className={
                "w-[90px] h-[90px] object-cover rounded-lg" +
                (currentIndex == index ? " border-2 border-accent" : "")
              }
              onClick={() => {
                setCurrentIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

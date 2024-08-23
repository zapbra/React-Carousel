import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { CurrentIndexType } from "./Carousel.types";
import CarouselPreview from "./CarouselPreview";

export interface CarouselImageProps {
  image: string;
  width: number;
  height: number;
  imageRatio: number;
  currentIndex: CurrentIndexType;
  index: number;
  selectImage: (
    updateIndex: (prevIndex: CurrentIndexType) => CurrentIndexType
  ) => void;
}

interface Dimensions {
  width: number;
  height: number;
}

const CarouselImage: React.FC<CarouselImageProps> = ({
  image,
  height,
  width,
  currentIndex,
  index,
  imageRatio,
  selectImage,
}) => {
  return (
    <>
      <img
        onClick={() =>
          selectImage((prevIndex: CurrentIndexType) => {
            return {
              index: index,
              displayed: prevIndex.index === index,
            };
          })
        }
        className="carousel-image"
        src={image}
        width={
          currentIndex.index === index
            ? width * (Math.abs(1 - imageRatio) + 1)
            : width
        }
        height={
          currentIndex.index === index
            ? height * (Math.abs(1 - imageRatio) + 1)
            : height
        }
      />
    </>
  );
};

export default CarouselImage;

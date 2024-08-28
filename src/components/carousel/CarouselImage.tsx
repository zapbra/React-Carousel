import React, {
    useState,
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
} from "react";
import { CurrentIndexType } from "./Carousel.types";

export interface CarouselImageProps {
    image: string;
    width: number;
    height: number;
    imageRatio: number;
    currentIndex: CurrentIndexType;
    index: number;
    selectImage: (index: number) => void;
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
                onClick={() => selectImage(index)}
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

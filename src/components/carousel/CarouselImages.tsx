import React, { useEffect, useState } from "react";
import { CarouselImage } from "./ComponentList";

export interface CarouselImagesProps {
    renderedImages: React.ReactNode[];
    leftOffset: number;
    childWidth: number;
    transformPercent: number;
    elementHeight: string;
}

const CarouselImages: React.FC<CarouselImagesProps> = ({
    renderedImages,
    leftOffset,
    childWidth,
    transformPercent,
    elementHeight,
}) => {
    console.log("trans percent");
    console.log(transformPercent);
    return (
        <div className="carousel-image-wrapper">
            <div
                className="carousel-images"
                //style={{ left: leftOffset + "px" }}
                style={{
                    transform: `translateX(${transformPercent}%)`,
                    WebkitTransform: `translateX(${transformPercent}%)`,
                    height: elementHeight,
                }}
            >
                {renderedImages}
            </div>
        </div>
    );
};

export default CarouselImages;

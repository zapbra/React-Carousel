import React, { useEffect, useState } from "react";
import { CarouselImage } from "./ComponentList";

export interface CarouselImagesProps {
    renderedImages: React.ReactNode[];
    leftOffset: number;
    childWidth: number;
    transformPercent: number;
}

const CarouselImages: React.FC<CarouselImagesProps> = ({
    renderedImages,
    leftOffset,
    childWidth,
    transformPercent,
}) => {
    return (
        <div className="carousel-image-wrapper">
            <div
                className="carousel-images"
                //style={{ left: leftOffset + "px" }}
                style={{ transform: `translate(${transformPercent}%)` }}
            >
                {renderedImages}
            </div>
        </div>
    );
};

export default CarouselImages;

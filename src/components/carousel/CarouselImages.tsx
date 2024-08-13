import React, { useEffect, useState } from "react";
import { CarouselImage } from "./ComponentList";

export interface CarouselImagesProps {
    renderedImages: React.ReactNode[];
    leftOffset: number;
}

const CarouselImages: React.FC<CarouselImagesProps> = ({
    renderedImages,
    leftOffset,
}) => {
    return (
        <div className="carousel-wrapper">
            <div
                className="carousel-images"
                style={{ left: leftOffset + "px" }}
            >
                {renderedImages}
            </div>
            ;
        </div>
    );
};

export default CarouselImages;

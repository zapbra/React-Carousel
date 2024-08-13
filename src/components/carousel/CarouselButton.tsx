import React, { useState } from "react";
import ChevronRight from "./ChevronRight";
import ChevronLeft from "./ChevronLeft";

export interface CarouselButtonProps {
    direction: "right" | "left";
    color: string;
    width: number;
    navigateCarousel: () => void;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
    direction,
    color,
    width,
    navigateCarousel,
}) => {
    return (
        <div className="carousel-button" onClick={navigateCarousel}>
            {direction === "right" ? (
                <ChevronRight color={color} width={width} />
            ) : (
                <ChevronLeft color={color} width={width} />
            )}
        </div>
    );
};

export default CarouselButton;

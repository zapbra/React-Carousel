import React, { useState } from "react";
import ChevronRight from "./ChevronRight";
import ChevronLeft from "./ChevronLeft";

export interface CarouselButtonProps {
    direction: "right" | "left";
    color: string;
    color2: string;
    color3: string;
    navigateCarousel: (direction: "right" | "left") => void;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
    direction,
    color,
    color2,
    color3,
    navigateCarousel,
}) => {
    return (
        <div
            className="carousel-button"
            onClick={() => navigateCarousel(direction)}
        >
            {direction === "right" ? (
                <ChevronRight color={color} />
            ) : (
                <ChevronLeft color={color} />
            )}
        </div>
    );
};

export default CarouselButton;

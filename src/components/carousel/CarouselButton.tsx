import React, { useState } from "react";
import ChevronRight from "./ChevronRight";
import ChevronLeft from "./ChevronLeft";

export interface CarouselButtonProps {
    direction: "right" | "left";
    color: string;
    navigateCarousel: (rightDirection: string) => void;
}

export interface IconProps {
    color: string;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
    direction,
    color,
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

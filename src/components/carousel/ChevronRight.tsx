import React from "react";
import { IconProps } from "./Carousel.types";

const ChevronRight: React.FC<IconProps> = ({ color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            transform="scale(1.5)"
            fill={color}
        >
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
        </svg>
    );
};

export default ChevronRight;

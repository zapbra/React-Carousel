import React, { useState } from "react";
import { CurrentIndexType } from "./Carousel.types";

export interface CarouselPreviewProps {
    image: string;
    selectImage: (
        updateIndex: (prevIndex: CurrentIndexType) => CurrentIndexType
    ) => void;
}

const CarouselPreview: React.FC<CarouselPreviewProps> = ({
    image,
    selectImage,
}) => {
    return (
        <div className="carousel-preview">
            <div
                className="close-top-right"
                onClick={(e) => {
                    if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.opacity = "0";
                        setTimeout(() => {
                            selectImage((prevIndex) => {
                                return {
                                    ...prevIndex,
                                    displayed: false,
                                };
                            });
                        }, 250);
                    }
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="50px"
                    height="50px"
                    fill="white"
                >
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                </svg>
            </div>
            <img
                src={image}
                alt=""
                className="carousel-preview-image"
                style={{ objectFit: "cover" }}
            />
        </div>
    );
};

export default CarouselPreview;

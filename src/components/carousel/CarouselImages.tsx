import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import { CarouselImage } from "./ComponentList";
import { CurrentIndexType } from "./Carousel.types";

export interface CarouselImagesProps {
    updateIndexOnScroll: (scrollPixels: number) => void;
    renderedImages: React.ReactNode[];
    elementHeight: string;
}

type Ref = {
    navigateCarousel: (scrollPixels: number) => void;
    setScrollPixels: (scrollPixels: number) => void;
};

const CarouselImages = React.forwardRef<Ref, CarouselImagesProps>(
    ({ updateIndexOnScroll, renderedImages, elementHeight }, ref) => {
        const divRef = useRef<HTMLDivElement>(null); // Internal div ref

        const handleScroll = () => {
            if (divRef.current) {
                updateIndexOnScroll(divRef.current.scrollLeft);
            }
        };

        useImperativeHandle(ref, () => ({
            /**
             * Shifts the image carousel by the amount of scrollPixels sent. It is always the image width + spacing/gap.
             * @param scrollPixels The amount of pixels to shift. Could be positive or negative to move left/right
             */
            navigateCarousel(scrollPixels: number) {
                if (divRef.current) {
                    divRef.current.scrollLeft += scrollPixels;
                    updateIndexOnScroll(divRef.current.scrollLeft);
                }
            },
            /**
             * Used to dynamically update the scrollbar position from parent compomnent,
             * such as when clicking images or clicking next/prev in the carousel.
             * @param scrollPixels The pixel number to set scrollLeft to
             */
            setScrollPixels(scrollPixels: number) {
                if (divRef.current) {
                    divRef.current.scrollLeft = scrollPixels;
                }
            },
        }));

        return (
            <div
                className="carousel-image-wrapper"
                ref={divRef}
                onScroll={handleScroll}
            >
                <div
                    className="carousel-images"
                    style={{
                        height: elementHeight,
                    }}
                >
                    {renderedImages}
                </div>
            </div>
        );
    }
);

export default CarouselImages;

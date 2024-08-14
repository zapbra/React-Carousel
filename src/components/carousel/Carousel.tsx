import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Carousel.css";
import CarouselButton from "./CarouselButton";
import CarouselImages from "./CarouselImages";
import { CarouselImage } from "./ComponentList";
import ProgressBar from "./ProgressBar";
import CarouselPreview from "./CarouselPreview";

const imageRatio = 1.25,
    IMAGE_RENDER_COUNT = 9,
    SPACING = 16,
    IMAGE_WIDTH = 260,
    INDEX_OFFSET = Math.floor(IMAGE_RENDER_COUNT / 2);

export interface CarouselProps {
    images: string[];
    color?: string;
    height?: number;
    iconSize?: number;
    imageWidth?: number;
}

interface ImageDataType {
    image: string;
    selected: boolean;
    index: number;
}

type WindowSize = [number, number];

export interface CurrentIndexType {
    index: number;
    displayed: boolean;
}

// const useWindowSize = (): WindowSize => {
//     const [size, setSize] = useState<WindowSize>([0, 0]);

//     useLayoutEffect(() => {
//         function updateSize() {
//             setSize([window.innerWidth, window.innerHeight]);
//         }
//         window.addEventListener("resize", updateSize);
//         updateSize();
//         return () => window.removeEventListener("resize", updateSize);
//     }, []);

//     return size;
// };

const Carousel: React.FC<CarouselProps> = ({
    images,
    color = "6D6AFF",
    height = null,
    iconSize = 48,
    imageWidth = IMAGE_WIDTH,
}) => {
    const imageHeight = imageWidth * imageRatio;

    const [currentIndex, setCurrentIndex] = useState<CurrentIndexType>({
        index: INDEX_OFFSET,
        displayed: false,
    });

    return (
        <div
            className="carousel"
            style={{ height: imageHeight * imageRatio + 32 + 64 + 16 + "px" }}
        >
            {currentIndex.displayed && (
                <CarouselPreview
                    selectImage={setCurrentIndex}
                    image={images[currentIndex.index]}
                />
            )}
            <div
                className="carousel-flex"
                style={{ height: imageHeight * imageRatio + 32 + "px" }}
            >
                <CarouselButton
                    color={color}
                    width={iconSize}
                    direction="left"
                    navigateCarousel={() => {
                        setCurrentIndex((prevIndex) => {
                            return {
                                index:
                                    (prevIndex.index - 1 + images.length) %
                                    images.length,
                                displayed: false,
                            };
                        });
                    }}
                />
                <CarouselImages
                    renderedImages={images.map((image, index) => {
                        return (
                            <CarouselImage
                                key={index}
                                image={image}
                                currentIndex={currentIndex}
                                index={index}
                                width={imageWidth}
                                height={imageHeight}
                                imageRatio={imageRatio}
                                selectImage={setCurrentIndex}
                            />
                        );
                    })}
                    leftOffset={
                        220 -
                        (currentIndex.index - INDEX_OFFSET) *
                            (imageWidth + SPACING)
                    }
                />
                <CarouselButton
                    color={color}
                    width={iconSize}
                    direction="right"
                    navigateCarousel={() => {
                        setCurrentIndex({
                            index: (currentIndex.index + 1) % images.length,
                            displayed: false,
                        });
                    }}
                />
            </div>

            <ProgressBar
                currentIndex={currentIndex.index}
                maxIndex={images.length}
            />
        </div>
    );
};

export default Carousel;

import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Carousel.css";
import CarouselButton from "./CarouselButton";
import CarouselImages from "./CarouselImages";
import { CarouselImage } from "./ComponentList";
import ProgressBar from "./ProgressBar";
import CarouselPreview from "./CarouselPreview";
import { convertToRGBA, setCSSColors } from "../../utils/functions";

const imageRatio = 1.25,
    IMAGE_RENDER_COUNT = 9,
    SPACING = 16,
    IMAGE_WIDTH = 260,
    DEFAULT_COLOR = "#6D6AFF";

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
    color = DEFAULT_COLOR,
    height = null,
    iconSize = 48,
    imageWidth = IMAGE_WIDTH,
}) => {
    const imageHeight = imageWidth * imageRatio;
    const shade20 = convertToRGBA(color, 0.2);
    const shade10 = convertToRGBA(color, 0.1);

    const [currentIndex, setCurrentIndex] = useState<CurrentIndexType>({
        index: 0,
        displayed: false,
    });

    useEffect(() => {
        // update the ui colors based on color prop, but only when the user provided one
        if (color !== DEFAULT_COLOR) {
            setCSSColors(color);
        }
    }, []);

    return (
        <div
            className="carousel"
            style={{
                height: imageHeight * imageRatio + 32 + 64 + 16 + "px",
                backgroundColor: shade10,
            }}
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
                    color2={shade10}
                    color3={shade20}
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
                        -(currentIndex.index - Math.floor(images.length / 2)) *
                        (imageWidth + SPACING)
                    }
                />
                <CarouselButton
                    color={color}
                    color2={shade10}
                    color3={shade20}
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

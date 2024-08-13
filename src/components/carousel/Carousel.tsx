import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Carousel.css";
import CarouselButton from "./CarouselButton";
import CarouselImages from "./CarouselImages";
import { CarouselImage } from "./ComponentList";

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
    const largeImageHeight = imageHeight * imageRatio,
        largeImageWidth = imageWidth * imageRatio;

    const imagesData = images.map((image, index) => {
        return {
            image: image,
            selected: false,
            index: index,
        };
    });

    const [selectedIndex, setSelectedIndex] = useState(2);
    console.log("len");
    console.log(images.length);
    imagesData[selectedIndex].selected = true;
    // data storage objects of images
    const [imageData, setImageData] = useState<ImageDataType[]>(imagesData);
    // CarouselImages to render
    const [renderedImages, setRenderedImages] = useState<React.ReactNode[]>([]);

    const [leftOffset, setLeftOffset] = useState(4 * IMAGE_WIDTH);
    const selectImage = (selectedIndex: number) => {
        updateOffset(selectedIndex);
    };

    const leftImagesCount = Math.floor(images.length / 2);
    const leftAllignmentOffset =
        leftImagesCount * IMAGE_WIDTH + leftImagesCount * SPACING;

    const updateOffset = (index: number) => {
        const rightShiftOffset = index * IMAGE_WIDTH + index * SPACING;
        setLeftOffset(leftAllignmentOffset - rightShiftOffset);
    };

    useEffect(() => {
        updateOffset(selectedIndex);
    }, []);

    useEffect(() => {
        const renderImages = imageData.map((image) => {
            return (
                <CarouselImage
                    image={image.image}
                    selected={image.selected}
                    width={imageWidth}
                    height={imageHeight}
                    imageRatio={imageRatio}
                    index={image.index}
                    selectImage={selectImage}
                />
            );
        });
        setRenderedImages(renderImages);
    }, [imageData]);

    const navigateCarousel = (direction: "right" | "left") => {
        let shiftAmount;
        if (direction === "right") {
            shiftAmount = 1;
        } else {
            shiftAmount = -1;
        }
        updateOffset(selectedIndex + shiftAmount);
        setSelectedIndex((prevIndex) => prevIndex + shiftAmount);
    };

    return (
        <div className="carousel">
            <CarouselButton
                color={color}
                width={iconSize}
                direction="left"
                navigateCarousel={navigateCarousel}
            />
            <CarouselImages
                renderedImages={renderedImages}
                leftOffset={leftOffset}
            />
            <CarouselButton
                color={color}
                width={iconSize}
                direction="right"
                navigateCarousel={navigateCarousel}
            />
        </div>
    );
};

export default Carousel;

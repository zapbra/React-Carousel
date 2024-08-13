import React, { useLayoutEffect, useState } from "react";
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

const useWindowSize = (): WindowSize => {
    const [size, setSize] = useState<WindowSize>([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
};

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

    //const [windowWidth, windowHeight] = useWindowSize();
    const [leftOffset, setLeftOffset] = useState(0);
    
    /**
     * Converts list of images into image data objects
     * @returns List of image data objects
     */
    const getImagesData = (): ImageDataType[] => {
        // get current 10 images to show on the screen
        const imagesSlice = images.slice(
            Math.max(0, currentIndex - INDEX_OFFSET),
            Math.max(currentIndex - INDEX_OFFSET + IMAGE_RENDER_COUNT, INDEX_OFFSET)
        );
        // construct the data, so the components can update on data change
        const imageDataArray = imagesSlice.map((image, index) => {
            return { image: image, selected: false, index: index };
        });
        // set the middle image to selected
        const middleImage =
            imageDataArray[Math.floor(imageDataArray.length / 2)];
        middleImage.selected = true;
        return imageDataArray;
    };

    const getSelectedImages = (selectedIndex: number): ImageDataType[] => {
        return imageData.map((image) => {
            if (image.index === selectedIndex) {
                image.selected = true;
            } else {
                image.selected = false;
            }
            return image;
        });
    };

    const updateOffset = (selectedIndex: number) => {
        const offsetPixels =
            (selectedIndex - currentIndex) * IMAGE_WIDTH;
            console.log('offset pixels')
            console.log(offsetPixels)
        setLeftOffset((prevOffset) => {
            return prevOffset - offsetPixels;
        });
    };

    function selectImage (selectedIndex: number)  {
        const updatedImages = getSelectedImages(selectedIndex);
        setImageData(updatedImages);
        setRenderedImages(getRenderedImages(updatedImages));
        console.log("selected index")
        console.log(selectedIndex)
        updateOffset(selectedIndex);
        setCurrentIndex(selectedIndex);
    };

    /**
     * Converts a list of image data objects into CarouselImages
     * @param imagesData - The image data to turn into rendered images
     * @returns An array of CarouselImages
     */
    function getRenderedImages (
        imageDataParam: ImageDataType[]
    ): React.ReactNode[]  {
        const renderedImagesMap = imageDataParam.map((image) => {
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

        return renderedImagesMap;
    };
    const [currentIndex, setCurrentIndex] = useState(INDEX_OFFSET);

    console.log("current index")
    console.log(currentIndex)


    const [imageIndex, setImageIndex] = useState(
        images.length >= 5 ? 2 : images.length - 1
    );
    const [imageOffsetIndex, setImageOffsetIndex] = useState(0);
    const imageDataResult = getImagesData();
    // data storage objects of images
    const [imageData, setImageData] =
        useState<ImageDataType[]>(imageDataResult);
    // CarouselImages to render
    const [renderedImages, setRenderedImages] = useState<React.ReactNode[]>(
        getRenderedImages(imageDataResult)
    );

    const navigateCarousel = () => {};

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

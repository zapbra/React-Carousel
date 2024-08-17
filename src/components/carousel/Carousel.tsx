import React, {
    useEffect,
    useLayoutEffect,
    useState,
    useRef,
    RefObject,
} from "react";
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
    IMAGE_HEIGHT = 325,
    DEFAULT_COLOR = "#6D6AFF",
    SMALL_BUTTON_WIDTH = 48;

export interface CarouselProps {
    images: string[];
    color?: string;
    imageHeight?: number;
    aspectRatio?: AspectRatio;
}

interface ImageDataType {
    image: string;
    selected: boolean;
    index: number;
}

type WindowSize = [number, number];

type AspectRatio = "portrait" | "square" | "landscape";

export interface CurrentIndexType {
    index: number;
    displayed: boolean;
}

const useDivSize = (divRef: React.RefObject<HTMLDivElement>): number => {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            if (divRef.current) {
                setWidth(divRef.current?.offsetWidth);
            }
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return width;
};

const Carousel: React.FC<CarouselProps> = ({
    images,
    color = DEFAULT_COLOR,
    imageHeight = IMAGE_HEIGHT,
    aspectRatio = "portrait",
}) => {
    let imageWidth = imageHeight / imageRatio;
    const shade20 = convertToRGBA(color, 0.2);
    const shade10 = convertToRGBA(color, 0.1);
    const carouselRef = useRef<HTMLDivElement>(null);
    const width = useDivSize(carouselRef);
    const minWidth = imageHeight;

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

    console.log("width");
    console.log(width);
    if (width < imageHeight + SMALL_BUTTON_WIDTH * 2) {
        imageHeight = width - (SMALL_BUTTON_WIDTH * 2) / 1;
        imageWidth = imageHeight / imageRatio;
    }
    return (
        <div
            className="carousel"
            ref={carouselRef}
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

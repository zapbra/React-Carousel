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
    const [imageHeightState, setImageHeightState] = useState(imageHeight);
    const [imageWidth, setImageWidth] = useState(imageHeightState / imageRatio);
    const fullLength =
        images.length * imageWidth + (images.length - 1) * SPACING;
    const shade20 = convertToRGBA(color, 0.2);
    const shade10 = convertToRGBA(color, 0.1);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [childWidth, setChildWidth] = useState(0);
    const width = useDivSize(carouselRef);

    const [currentIndex, setCurrentIndex] = useState<CurrentIndexType>({
        index: 0,
        displayed: false,
    });

    useEffect(() => {
        if (width < imageHeight + SMALL_BUTTON_WIDTH * 2 && width != 0) {
            setImageHeightState(width - SMALL_BUTTON_WIDTH * 2);
            setImageWidth(imageHeightState / imageRatio);
        }

        const childElement =
            carouselRef?.current?.querySelector(".carousel-images");
        if (childElement) {
            setChildWidth((childElement as HTMLElement).offsetWidth);
        }
    }, [width, imageHeightState, imageWidth, childWidth]);

    useEffect(() => {
        // update the ui colors based on color prop, but only when the user provided one
        if (color !== DEFAULT_COLOR) {
            setCSSColors(color);
        }
    }, []);

    return (
        <div
            className="carousel"
            ref={carouselRef}
            style={{
                height: imageHeightState * imageRatio + 32 + 64 + 16 + "px",
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
                style={{ height: imageHeightState * imageRatio + 32 + "px" }}
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
                                height={imageHeightState}
                                imageRatio={imageRatio}
                                selectImage={setCurrentIndex}
                            />
                        );
                    })}
                    elementHeight={imageHeightState * imageRatio + 32 + "px"}
                    childWidth={childWidth}
                    transformPercent={Math.round(
                        (fullLength / 2 / childWidth -
                            ((imageWidth + SPACING) / childWidth) *
                                currentIndex.index) *
                            100
                    )}
                    leftOffset={
                        -(currentIndex.index - images.length / 2) *
                            (imageWidth + SPACING) -
                        (imageHeightState - imageWidth + SPACING / 4) * 2
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
                width={width}
            />
        </div>
    );
};

export default Carousel;

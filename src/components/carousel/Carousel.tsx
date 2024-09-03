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
import {
  convertToRGBA,
  setCSSColors,
  getAspectRatio,
} from "../../utils/functions";

const SPACING = 16,
  IMAGE_HEIGHT = 325,
  DEFAULT_COLOR = "#adadad",
  SMALL_BUTTON_WIDTH = 48,
  DEFAULT_WIDTH = "100%";

export interface CarouselProps {
  images: string[];
  color?: string;
  imageHeight?: number;
  aspectRatio?: AspectRatio;
  width?: string;
}

type AspectRatio = "portrait" | "square" | "landscape" | number;

export interface CurrentIndexType {
  index: number;
  displayed: boolean;
  increased: boolean;
}

/**
 * Track the width of a div on window resize, used for the image section of carousel
 * to dynamically resize the image
 * @param divRef Refererence to the div that we will track the width of
 * @returns
 */
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

type Ref = {
  navigateCarousel: (scrollPixels: number) => void;
  setScrollPixels: (scrollPixels: number) => void;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  color = DEFAULT_COLOR,
  imageHeight = IMAGE_HEIGHT,
  aspectRatio = "portrait",
  width = DEFAULT_WIDTH,
}) => {
  // Reference to object with functions inside CarouselImages forwardRef child component
  const carouselDivRef = useRef<Ref>(null);
  // Height to width ratio. Above 1, the image will be more vertical, and below 1 it will be more horizontal
  const imageRatio = getAspectRatio(aspectRatio);
  // Keeping track of image height, only needed for page resizing purposes
  const [imageHeightState, setImageHeightState] = useState(imageHeight);
  // Same as imageHeightState, but for width
  const [imageWidth, setImageWidth] = useState(imageHeightState / imageRatio);
  // Used as background color, although may be unnecessary
  const shade10 = convertToRGBA(color, 0.1);
  // Used for getting the width of the carousel to detect page resizing
  const carouselRef = useRef<HTMLDivElement>(null);
  // width of the carousel images container for aligning images in center
  const [childWidth, setChildWidth] = useState(0);
  // The width of the entire carousel
  const dynamicWidth = useDivSize(carouselRef);
  // Keeps track of the currently selected image, increased is whether the image has been clicked once, which focuses it in the middle of the screen
  // Displayed is the second click where the image is displayed in full size on the screen
  const [currentIndex, setCurrentIndex] = useState<CurrentIndexType>({
    index: 0,
    displayed: false,
    increased: false,
  });

  // Resize images when the screen is shrunken/expanded
  useEffect(() => {
    // make sure the screen is actually small enough to justify resizing the width and height
    if (
      dynamicWidth < imageHeight + SMALL_BUTTON_WIDTH * 2 &&
      dynamicWidth != 0
    ) {
      // make sure width spans all the way across, excluding buttons and width is in relation to height
      setImageHeightState(dynamicWidth - SMALL_BUTTON_WIDTH * 2);
      setImageWidth(imageHeightState / imageRatio);
    }

    // get and set the width of the images section (excludes buttons)
    const childElement = carouselRef?.current?.querySelector(
      ".carousel-image-wrapper"
    );
    if (childElement) {
      setChildWidth((childElement as HTMLElement).offsetWidth);
    }
  }, [width, imageHeightState, imageWidth, childWidth]);

  useEffect(() => {
    // update the ui colors based on color prop, but only when the user provided one
    if (color != DEFAULT_COLOR) {
      setCSSColors(color);
    }
  }, [color]);

  /**
   * Move the carousel to the right or left by one image + padding space. Used when the carousel next/prev buttons are clicked.
   * @param direction Right or left direction to move carousel by one index
   */
  const navigateCarousel = (direction: string) => {
    let scrollPixels = imageWidth + SPACING;
    // by turning scrollPixels to negative, the carousel will scroll left, instead of right
    if (direction !== "right") {
      scrollPixels *= -1;
    }

    if (carouselDivRef.current) {
      carouselDivRef.current.navigateCarousel(scrollPixels);
    }
  };

  /**
   * Calculate the current index based off of scroll position using image widths, spacing and width of the entire image
   * container because the images are centered.
   * @param scrollPixels The current scrollLeft position
   */
  const updateIndexOnScroll = (scrollPixels: number): void => {
    const newIndex = Math.floor(
      (scrollPixels + childWidth / 2) / (imageWidth + SPACING)
    );

    setCurrentIndex((prevIndex) => {
      return {
        ...prevIndex,
        index: newIndex,
      };
    });
  };

  const updateScrollPixelsOnSelectImage = (index: number): void => {
    // exit function if the clicked image is already the focused one, but display the large view of the image if so
    if (index === currentIndex.index) {
      setCurrentIndex((prevIndex) => {
        return {
          ...prevIndex,
          displayed: prevIndex.index === index,
        };
      });
      return;
    }

    // get amount to scroll based on image index
    // This calculation just kinda works after tinkering around lol to get it perfectly in center
    const scrollPixels =
      (index + 1) * (imageWidth + SPACING) -
      childWidth / 2 -
      imageWidth / 2 +
      SPACING * 2;

    // update UI scrollLeft based on selected image
    if (carouselDivRef.current) {
      carouselDivRef.current.setScrollPixels(scrollPixels);
    }
  };

  return (
    <div
      className="carousel"
      ref={carouselRef}
      style={{
        height:
          imageHeightState * (Math.abs(imageRatio - 1) + 1) +
          32 +
          64 +
          16 +
          "px",
        backgroundColor: shade10,
        maxWidth: width,
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
        style={{
          height: imageHeightState * (Math.abs(imageRatio - 1) + 1) + 32 + "px",
        }}
      >
        <CarouselButton
          color={color}
          direction="left"
          navigateCarousel={navigateCarousel}
        />
        <CarouselImages
          ref={carouselDivRef}
          updateIndexOnScroll={updateIndexOnScroll}
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
                selectImage={updateScrollPixelsOnSelectImage}
              />
            );
          })}
          elementHeight={
            imageHeightState * (Math.abs(1 - imageRatio) + 1) + 32 + "px"
          }
        />
        <CarouselButton
          color={color}
          direction="right"
          navigateCarousel={navigateCarousel}
        />
      </div>

      <ProgressBar
        currentIndex={currentIndex.index}
        maxIndex={images.length}
        width={dynamicWidth}
      />
    </div>
  );
};

export default Carousel;

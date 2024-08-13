import React, {
    useState,
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
} from "react";

export interface CarouselImageProps {
    image: string;
    width: number;
    height: number;
    imageRatio: number;
    selected: boolean;
    index: number;
    selectImage: (selectedIndex: number) => void;
}


interface Dimensions {
    width: number;
    height: number;
}

const CarouselImage: React.FC<CarouselImageProps> = (
    ({ image, height, width, selected, imageRatio, index, selectImage }) => {
        const getDimensions = (dimensions: Dimensions): Dimensions => {
            if (selected) {
                return {
                    width: dimensions.width * imageRatio,
                    height: dimensions.height * imageRatio,
                };
            } else {
                return { height, width };
            }
        };

        const baseHeight = height;
        const baseWidth = width;
        const [selectedState, setSelectedState] = useState(selected);
        const [dimensionsState, setDimensionsState] = useState<Dimensions>(
            getDimensions({ height, width })
        );

        useEffect(() => {
            setDimensionsState(getDimensions);
        }, [selected]);
        return (
            <img
                onClick={() => selectImage(index)}
                className="carousel-image"
                src={image}
                width={dimensionsState.width}
                height={dimensionsState.height}
            />
        );
    }
);

export default CarouselImage;

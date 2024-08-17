import React, { useEffect, useState } from "react";

export interface ProgressBarProps {
    currentIndex: number;
    maxIndex: number;
    width: number;
}

const MIN_HEIGHT = 12,
    BAR_COUNT = 7,
    SMALL_SCREEN_WIDTH = 768;

let MAX_HEIGHT = 64;
const ProgressBar: React.FC<ProgressBarProps> = ({
    currentIndex,
    maxIndex,
    width,
}) => {
    const barElements = [];
    const ratio = Math.ceil(maxIndex / BAR_COUNT);

    useEffect(() => {
        if (width < SMALL_SCREEN_WIDTH) {
            if (MAX_HEIGHT == 64) {
                MAX_HEIGHT = 32;
            }
        } else if (MAX_HEIGHT != 64) {
            MAX_HEIGHT = 64;
        }
    }, [width]);
    for (let i = 0; i < maxIndex; i += ratio) {
        barElements.push(
            <div
                className="progress-bar"
                style={{
                    height:
                        MAX_HEIGHT -
                        Math.abs(currentIndex - i) * MIN_HEIGHT +
                        MIN_HEIGHT +
                        "px",
                }}
            ></div>
        );
    }
    return <div className="progress-bar-holder">{barElements}</div>;
};

export default ProgressBar;

import React, { useState } from "react";

export interface ProgressBarProps {
    currentIndex: number;
    maxIndex: number;
}

const MAX_HEIGHT = 64,
    MIN_HEIGHT = 12,
    BAR_COUNT = 7;

const ProgressBar: React.FC<ProgressBarProps> = ({
    currentIndex,
    maxIndex,
}) => {
    const barElements = [];
    const ratio = Math.ceil(maxIndex / BAR_COUNT);
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

const COLOR_OFFSET_DEFAULT = -40,
    COLOR_OFFSET_DARK = -120;

// Utility function to convert hex or named color to RGBA
export const convertToRGBA = (color: string, opacity: number = 1): string => {
    let r, g, b;
    if (color.startsWith("rgba")) {
        const rgbaMatch = color.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?\.?\d+))?\)/
        );
        if (rgbaMatch) {
            r = parseInt(rgbaMatch[1], 10);
            g = parseInt(rgbaMatch[2], 10);
            b = parseInt(rgbaMatch[3], 10);
            opacity = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : opacity; // Default to provided opacity if not present
        }
    } else if (color.startsWith("#")) {
        // Hex color
        const hex = color.replace("#", "");
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
    } else {
        // Named color
        const ctx = document.createElement("canvas").getContext("2d");
        if (ctx) {
            ctx.fillStyle = color;
            const computedColor = ctx.fillStyle;
            return convertToRGBA(computedColor, opacity);
        }
    }

    return `rgba(${r},${g},${b},${opacity})`;
};

export const reColor = (color: string, colorOffset: number): string => {
    const colorRGBA = convertToRGBA(color);
    const regexp = /\d+(\.\d+)?/g;
    // extract numbers from rgba
    const matches = [...colorRGBA.matchAll(regexp)];

    // turn numbers into variables
    let [r, g, b, o] = matches.map((match) => parseFloat(match[0]));
    // change values based on provided color offset
    // Increases or decreases if provided value is positive/negative and ensures
    // value doesn't go out of rgb bounds
    [r, g, b] = [r, g, b].map((color) => {
        color = Math.min(color + colorOffset, 255);
        color = Math.max(color, 0);
        return color;
    });

    return `rgba(${r},${g},${b},${o})`;
};

export const setCSSColors = (color: string): void => {
    const mainBg = convertToRGBA(color, 0.1);
    const mainLight = convertToRGBA(color, 0.2);
    const mainLightAccent = convertToRGBA(color, 0.3);
    const mainLightAccentSecondary = convertToRGBA(color, 0.5);
    const mainDark = reColor(color, COLOR_OFFSET_DEFAULT);
    let mainDarkSecondary = convertToRGBA("rgba(128,128,128,0.8)", 1);
    mainDarkSecondary = reColor(mainDarkSecondary, COLOR_OFFSET_DARK);

    document.documentElement.style.setProperty("--main-color-base", color);
    document.documentElement.style.setProperty("--main-bg-color", mainBg);
    document.documentElement.style.setProperty("--main-color-light", mainLight);
    document.documentElement.style.setProperty(
        "--main-color-light-accent",
        mainLightAccent
    );
    document.documentElement.style.setProperty(
        "--main-color-light-accent-secondary",
        mainLightAccentSecondary
    );
    document.documentElement.style.setProperty("--main-color-dark", mainDark);
    document.documentElement.style.setProperty(
        "--main-color-dark-secondary",
        mainDarkSecondary
    );
};

const aspectRatioObject: { [key: string]: number } = {
    portrait: 1.25,
    vertical: 1.25,
    square: 1,
    landscape: 0.75,
    horizontal: 0.75,
};

/**
 *
 * @param aspectRatio The aspect ratio as a string "portrait", "square", or "landscape" or
 * as a number, which is the scale of width to height. 1 is a square, > 1 is portrait and < 1 is landscape.
 * @returns Aspect ratio
 */
export const getAspectRatio = (aspectRatio: string | number): number => {
    let aspectRatioReturn;

    // no conversion required if aspect ratio is provided
    if (typeof aspectRatio === "number") {
        return aspectRatio;
        // return the corresponding aspect ratio if valid string key was provided, else return portrait default (1.25)
    } else if (typeof aspectRatio === "string") {
        aspectRatioReturn = aspectRatioObject[aspectRatio];
        if (aspectRatioReturn === undefined) {
            aspectRatioReturn = aspectRatioObject["portrait"];
        }
        // default to portrait (1.25) if string or number type not provided
    } else {
        aspectRatioReturn = aspectRatioObject["portrait"];
    }

    return aspectRatioReturn;
};

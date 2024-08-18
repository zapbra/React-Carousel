import { getAspectRatio } from "../../utils/functions";

const PORTRAIT_VALUE = 1.25,
  SQUARE_VALUE = 1,
  LANDSCAPE_VALUE = 0.75;

describe("Testing Carousel local function", () => {
  test("'portrait' should return 1.25", () => {
    expect(getAspectRatio("portrait")).toBe(PORTRAIT_VALUE);
  });

  test("'square' should return 1", () => {
    expect(getAspectRatio("square")).toBe(SQUARE_VALUE);
  });

  test("'landscape' should return 0.75", () => {
    expect(getAspectRatio("landscape")).toBe(LANDSCAPE_VALUE);
  });

  test("'gibberish' should return 1.25", () => {
    expect(getAspectRatio("gibberish")).toBe(PORTRAIT_VALUE);
  });

  test("'3' should return 3", () => {
    expect(getAspectRatio(3)).toBe(3);
  });
});

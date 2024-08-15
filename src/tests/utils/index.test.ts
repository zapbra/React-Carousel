import { convertToRGBA, reColor, setCSSColors } from "../../utils/functions";

describe("testing covertToRGBA function", () => {
    /*
    test("string red, number 1 should result in rgba(255,0,0,1)", () => {
        expect(convertToRGBA("red", 1)).toBe("rgba(255,0,0,1)");
    });
    test("string red, number 0.1 should result in rgba(255, 0, 0, 0.1)", () => {
        expect(convertToRGBA("red", 0.5)).toBe("rgba(255,0,0,0.5)");
    });

    test("string blue, number 1 should result in rgba(0,0,255,1)", () => {
        expect(convertToRGBA("blue", 1)).toBe("rgba(0,0,255,1)");
    });

    test("string #FF0000, number 1 should result in rgba(255,0,0,1)", () => {
        expect(convertToRGBA("#FF0000", 1)).toBe("rgba(255,0,0,1)");
    });

    test("string #00FF00, number 1 should result in rgba(0,255,0,1)", () => {
        expect(convertToRGBA("#00FF00", 1)).toBe("rgba(0,255,0,1)");
    });

    test("string #0000FF, number 1 should result in rgba(0,0,255,1)", () => {
        expect(convertToRGBA("#0000FF", 1)).toBe("rgba(0,0,255,1)");
    });

    test("string #FFC0CB, number 1 should result in rgba(255,192,203,1)", () => {
        expect(convertToRGBA("#FFC0CB", 1)).toBe("rgba(255,192,203,1)");
    });

    test("string #808080, number 1 should result in rgba(128,128,128,1)", () => {
        expect(convertToRGBA("#808080", 1)).toBe("rgba(128,128,128,1)");
    });

    test("string #FFA500, number 1 should result in rgba(255,165,1)", () => {
        expect(convertToRGBA("#FFA500", 1)).toBe("rgba(255,165,0,1)");
    }); */
    /*
    test("Test rgba(128,128,128,1)", () => {
        expect(convertToRGBA("FFF43FFF", 1)).toBe("rgba(128,128,128,1)");
    }); */
    /*
    test("Test rgba(128,128,128,1) to equal itself", () => {
        expect(convertToRGBA("rgba(128,128,128,1)", 1)).toBe(
            "rgba(128,128,128,1)"
        );
    });
*/
    test("Test rgba(128,128,128,0.8), 0.8 to equal itself", () => {
        expect(convertToRGBA("rgba(128,128,128,0.8)", 0.8)).toBe(
            "rgba(128,128,128,0.8)"
        );
    });
});

describe("testing reColor function", () => {
    /*
    test("reColor rgba(128,128,128,1), 40 should equal rbga(168,168,168,1)", () => {
        expect(reColor("rgba(128,128,128,1)", 40)).toBe("rgba(168,168,168,1)");
    });

    test("reColor rgba(128,128,128,1), 40 should not equal itself", () => {
        expect(reColor("rgba(128,128,128,1)", 40)).not.toBe(
            "rgba(128,128,128,1)"
        );
    }); */
    /*
    test("reColor rgba(128,128,128,1), 40 should equal rbga(255,255,255,1)", () => {
        expect(reColor("rgba(128,128,128,1)", 200)).toBe("rgba(255,255,255,1)");
    });

    test("reColor rgba(128,128,128,1) should equal rbga(88,88,88,1)", () => {
        expect(reColor("rgba(128,128,128,1)", -40)).toBe("rgba(88,88,88,1)");
    });

    test("reColor rgba(128,128,128,1) should equal rbga(0,0,0,1)", () => {
        expect(reColor("rgba(128,128,128,1)", -400)).toBe("rgba(0,0,0,1)");
    });
*/
});

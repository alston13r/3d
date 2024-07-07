"use strict";
class Color {
    static Black = new Color();
    static White = new Color(255, 255, 255);
    static Red = new Color(255);
    static Green = new Color(0, 255);
    static Blue = new Color(0, 0, 255);
    r;
    g;
    b;
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static FromGrey(x = 0) {
        return new Color(x, x, x);
    }
    static FromString(str) {
        if (str.indexOf('#') == 0)
            str = str.substring(1);
        let r;
        let g;
        let b;
        if (str.length == 3) {
            r = parseInt(str[0] + str[0], 16);
            g = parseInt(str[1] + str[1], 16);
            b = parseInt(str[2] + str[2], 16);
        }
        else {
            r = parseInt(str.substring(0, 2), 16);
            g = parseInt(str.substring(2, 4), 16);
            b = parseInt(str.substring(4, 6), 16);
        }
        return new Color(r, g, b);
    }
    toString() {
        const rByte = this.r.toString(16);
        const gByte = this.g.toString(16);
        const bByte = this.b.toString(16);
        const rString = rByte.length == 1 ? '0' + rByte : rByte;
        const gString = gByte.length == 1 ? '0' + gByte : gByte;
        const bString = bByte.length == 1 ? '0' + bByte : bByte;
        return '#' + rString + gString + bString;
    }
}
//# sourceMappingURL=Color.js.map
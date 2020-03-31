import tinyColor from "tinycolor2";

let hueStep = 2;
let saturationStep = 16;
let saturationStep2 = 5;
let brightnessStep1 = 5;
let brightnessStep2 = 15;
let lightColorCount = 5;
let darkColorCount = 4;

let getHue = function (hsv, i, isLight) {
    let hue;
    if (hsv.h >= 60 && hsv.h <= 240) {
        hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
        hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }
    if (hue < 0) {
        hue += 360;
    } else if (hue >= 360) {
        hue -= 360;
    }
    return Math.round(hue);
};
let getSaturation = function (hsv, i, isLight) {
    let saturation;
    if (isLight) {
        saturation = Math.round(hsv.s * 100) - saturationStep * i;
    } else if (i === darkColorCount) {
        saturation = Math.round(hsv.s * 100) + saturationStep;
    } else {
        saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
    }
    if (saturation > 100) {
        saturation = 100;
    }
    if (isLight && i === lightColorCount && saturation > 10) {
        saturation = 10;
    }
    if (saturation < 6) {
        saturation = 6;
    }
    return Math.round(saturation);
};
let getValue = function (hsv, i, isLight) {
    if (isLight) {
        return Math.round(hsv.v * 100) + brightnessStep1 * i;
    }
    return Math.round(hsv.v * 100) - brightnessStep2 * i;
};

let colorPalette = function (color, index) {
    let isLight = index <= 6;
    let hsv = tinyColor(color).toHsv();
    let i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
    return tinyColor({
        h: getHue(hsv, i, isLight),
        s: getSaturation(hsv, i, isLight),
        v: getValue(hsv, i, isLight),
    }).toHexString();
};

export default colorPalette
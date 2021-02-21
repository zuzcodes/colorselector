"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#picker").addEventListener("input", getInputValue);
  getInputValue();
}

function getInputValue() {
  let hexVal = document.querySelector("#picker").value;
  showInputValue(hexVal);
}

// DELEGATOR FN
function showInputValue(hexVal) {
  const rgb = hexToRgb(hexVal);
  const cssStr = rgbToCss(rgb);
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  colorTheBox(hexVal);
  showHex(hex);
  showRgb(cssStr);
  showHsl(hsl);
}

// CONVERSION PART
function hexToRgb(hexVal) {
  const r = parseInt(hexVal.substring(1, 3), 16);
  const g = parseInt(hexVal.substring(3, 5), 16);
  const b = parseInt(hexVal.substring(5, 7), 16);

  return { r, g, b };
}

function rgbToCss(rgb) {
  return `RGB: (${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function rgbToHex(rgb) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);

  if (r.length < 2) {
    r = "0" + r;
  }
  if (g.length < 2) {
    g = "0" + g;
  }
  if (b.length < 2) {
    b = "0" + b;
  }

  return `HEX: #${r}${g}${b}`;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  s *= 100;
  l *= 100;

  return `HSL: ${h.toFixed(0)}° ${s.toFixed(0)}% ${l.toFixed(0)}%`;
}

// DISPLAY PART
function colorTheBox(hexVal) {
  document.querySelector(".colorbox").style.backgroundColor = hexVal;
}

function showHex(hexVal) {
  document.getElementById("hex").innerHTML = hexVal.toUpperCase();
}

function showRgb(cssStr) {
  document.getElementById("rgb").innerHTML = cssStr;
}

function showHsl(hsl) {
  document.getElementById("hsl").innerHTML = hsl;
}

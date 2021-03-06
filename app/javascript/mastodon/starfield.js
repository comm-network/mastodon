/*!
 The MIT License (MIT)
 Copyright (c) 2015 popAD, LLC dba Rocket Wagon Labs <lukel99@gmail.com>
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
export const COORDINATE_LENGTH = 5000;

//CLASSES
/**
 * The star object we're going to create
 * Star's coordinate system is 0 through COORDINATE_LENGTH, and then mapped onto the coordinate system of our canvas
 * @param  {number} x
 * @param  {number} y
 * @param  {number} size
 * @param  {string} color - color string
 * @return {Star} a star object
 */
export const Star = function (x, y, size, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
};

/**
 * Convert from star X/Y (0-COORDINATE_LENGTH) to canvas X/Y
 * @param  {number} canvasWidth - the canvas width in pixels
 * @param  {number} canvasHeight - the canvas height in pixels
 * @return {Object} an object containing the coordinates on the canvas
 */
Star.prototype.mapXYToCanvasCoordinates = function (canvasWidth, canvasHeight) {
  const canvasX = Math.round((this.x / COORDINATE_LENGTH) * canvasWidth);
  const canvasY = Math.round((this.y / COORDINATE_LENGTH) * canvasHeight);
  return {
    x: canvasX,
    y: canvasY,
  };
};

export const StarFactory = {
  /**
   * Generates all random values to create a random star
   * @return {Star} a star with random X/Y, size and color
   */
  getRandomStar: function () {
    const x = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
    const y = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
    const size = this._getWeightedRandomSize();
    const color = this._getWeightedRandomColor();
    const tintedColor = this._applyRandomShade(color);
    return new Star(x, y, size, this._getRGBColorString(tintedColor));
  },

  _getWeightedRandomSize: function () {
    const list = [1, 1.5, 2];
    const weight = [0.8, 0.15, 0.05];
    return this._getWeightedRandom(list, weight);
  },

  _getWeightedRandomColor: function () {
    const list = [
      { 'r': 255, 'g': 189, 'b': 111 },
      { 'r': 255, 'g': 221, 'b': 180 },
      { 'r': 255, 'g': 244, 'b': 232 },
      { 'r': 251, 'g': 248, 'b': 255 },
      { 'r': 202, 'g': 216, 'b': 255 },
      { 'r': 170, 'g': 191, 'b': 255 },
      { 'r': 155, 'g': 176, 'b': 255 },
    ];
    const weight = [0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05];
    return this._getWeightedRandom(list, weight);
  },

  _getRandomShade: function () {
    const list = [0.4, 0.6, 1];
    const weight = [0.5, 0.3, 0.2];
    return this._getWeightedRandom(list, weight);
  },

  _applyRandomShade: function (color) {
    const shade = this._getRandomShade();
    if (shade !== 1) { // skip processing full brightness stars
      color.r = Math.floor(color.r * shade);
      color.g = Math.floor(color.g * shade);
      color.b = Math.floor(color.b * shade);
    }
    return color;
  },

  _getRGBColorString: function (color) {
    return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
  },

  // http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
  _getWeightedRandom: function (list, weight) {

    const rand = function (min, max) {
      return Math.random() * (max - min) + min;
    };

    const total_weight = weight.reduce(function (prev, cur) {
      return prev + cur;
    });

    const random_num = rand(0, total_weight);
    let weight_sum = 0;

    for (let i = 0; i < list.length; i++) {
      weight_sum += weight[i];
      weight_sum = +weight_sum.toFixed(2);

      if (random_num <= weight_sum) {
        return list[i];
      }
    }
    return list[rand(0, list.length)];
  },
};


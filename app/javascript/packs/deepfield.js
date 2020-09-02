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
import { COORDINATE_LENGTH, StarFactory } from '../mastodon/starfield';

(() => {

  const Starfield = [];
  Window.starfield = function (options, elem) {

    const settings = {
      starDensity: 1.0,
      mouseScale: 1.0,
      seedMovement: true, ...options,
    };

    const width = elem.clientWidth;
    const height = elem.clientHeight;

    const totalPixels = width * height;
    const starRatio = 0.002 * settings.starDensity;
    const numStars = Math.floor(totalPixels * starRatio);

    const deltaX = 0.12;
    const deltaY = 0.04;

    let canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    const styleProps = { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' };
    const attrProps = { width: elem.clientWidth, height: elem.clientHeight };
    for (let prop in styleProps) {
      canvas.style[prop] = styleProps[prop];
    }
    for (let prop in attrProps) {
      canvas.setAttribute(prop, attrProps[prop]);
    }
    elem.appendChild(canvas);

    for (let i = 0; i < numStars; i++) {
      Starfield.push(StarFactory.getRandomStar());
    }

    // ANIMATION HANDLER
    const recalcMovement = function () {
      Starfield.forEach((star) => {
        let newX = star.x - deltaX;
        let newY = star.y - deltaY;

        if (newX < 0) {
          newX += COORDINATE_LENGTH;
        }
        if (newY < 0) {
          newY += COORDINATE_LENGTH;
        }
        if (newX > COORDINATE_LENGTH) {
          newX -= COORDINATE_LENGTH;
        }
        if (newY > COORDINATE_LENGTH) {
          newY -= COORDINATE_LENGTH;
        }

        star.x = newX;
        star.y = newY;
      });
    };

    const draw = function () {
      //get raw DOM element
      const canvas = document.getElementById('starfield');
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.setAttribute('width', width.toString());
      canvas.setAttribute('height', height.toString());

      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        // clear canvas
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        // iterate stars and draw them
        Starfield.forEach((star) => {
          const coords = star.mapXYToCanvasCoordinates(width, height);

          ctx.fillStyle = star.color;
          ctx.fillRect(coords.x, coords.y, star.size, star.size);
        });
      }
    };

    (function animloop() {
      requestAnimationFrame(animloop);
      recalcMovement();
      draw();
    })();

    return this;
  };

  document.addEventListener('DOMContentLoaded', function() {
    Window.starfield({ starDensity: 2.8 }, document.querySelector('body'));
  });
})();

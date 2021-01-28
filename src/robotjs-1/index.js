// @ts-check

const robot = require('robotjs');

// robot.typeString('Hello World');
// robot.keyTap('enter');


// const mouse = robot.getMousePos();
// const hex = robot.getPixelColor(mouse.x, mouse.y);
// console.log(`#${hex} at x:${mouse.x} y:${mouse.y}`);

robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
	y = height * Math.sin((twoPI * x) / width) + height;
    robot.moveMouse(x, y);
    console.log([x, y]);
}

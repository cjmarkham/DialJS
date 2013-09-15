DialJS
======

DialJS makes it easy to add a graphical dial animation to any html element.

Basic Usage
------------------------

Simply call the function on an element

	$('#dial').dial();

Extra options
------------------------

There are alot of options for DialJS (listed below).
To set them you can add them to the function constructor or add them to the elements data attributes.

	$('#dial').dial({
		color : 'blue'
	});

	<div id="dial" data-color="blue"></div>

Data attributes will always overwrite options specified in the constructor.

Multiple Instances
------------------------

You can have multiple instances of DialJS running too.

	$('.dial').dial({
		end : 270
	});

This will create a DialJS instance on each element and each one will share the options specified in the constructor.
You can then override the options for individual elements using the data attributes as described above.

Ranges
------------------------

You can also specify ranges in the options. 
These trigger color changes when the value of the dial is between the min and max.

	$('#dial').dial({
		ranges : [{
			min : 0,
			max : 49,
			color : 'green'
		}, {
			min : 50,
			max : 100,
			color : 'red'
		}]
	});

You can also add a callback to the object which is passed the instance

	$('#dial').dial({
		ranges : [{
			min : 0,
			max : 49,
			color : 'green',
			callback : function(instance) {
				console.log(instance.value);
			}
		}, {
			min : 50,
			max : 100,
			color : 'red'
		}]
	});

All Options
------------------------

* `color` `Hex Code` - Change the color of the dial. Default : `#000`
* `background` `Bool` - Whether to render background or not. Default : `true`
* `backgroundColor` `Hex Code` - The color of the background. Default : `#dadada`
* `ranges` `Array` - An array of range objects to change color. Default : `null`
* `start` `Integer` - At what angle the dial starts at. Default : `0`
* `end` `Integer` - At what angle the dial ends. Default : `360`
* `value` `Integer` - The starting value of this dial. Default : `0`
* `radius` `Integer` - The radius of the dial. Default : Max radius given container width and height minus line width
* `lineWidth` `Integer` - The width of the dials line. Default : `25`
* `lineCap` `Integer` - The style of the end of the line. Default : `null`
* `rotate` `Integer` - The amount to rotate the dial. Default : `0`
* `max` `Integer` - The max value for this dial. Default : `100`

Examples
------------------------

Examples can be found at [cjmarkham.co.uk](http://cjmarkham.co.uk/projects/dial)

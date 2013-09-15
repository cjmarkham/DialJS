var Dial = function() {
	var self = this;

	this.element = null;
	this.canvas  = null;
	this.ctx     = null;
	this.options = {};

	this.init = function(options) {

		this.options = $.extend({}, options);
		
		this.canvas  = $('<canvas />');
		this.canvas  = this.canvas[0];
		this.ctx	 = this.canvas.getContext('2d');

		this.canvas.width  = this.element.offsetWidth;
		this.canvas.height = this.element.offsetHeight;

		this.value 		= this.options.value || 0;
		this.lastValue  = 0;

		this.element.appendChild(this.canvas);

		this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

		if (this.options.rotate) {
			this.ctx.rotate(Math.PI / (this.options.rotate * Math.PI / 180));
		}

		this.max = this.options.max || 100;

		$(this.element).bind('update', function () {
			self.update($(this).data('value'));
		});

		return this;
	},

	this.render = function() {

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.lineCap = this.options.linecap || null;

		this.ctx.lineWidth = this.options.lineWidth || 25;

		this.radius 	= this.options.radius || Math.min(this.canvas.width, this.canvas.height) / 2 - this.ctx.lineWidth;
		
		this.start 		= this.options.start || 0;
		this.end 		= this.options.end   || 360;

		this.startAngle = (Math.PI / 180) * (this.start - 90);
		this.endAngle   = (Math.PI / 180) * (this.end - 90);

		this.counterClockwise = this.options.counterClockwise || false;

		if (this.options.background !== false) {
			// BACKGROUND
			this.ctx.beginPath();
			this.ctx.arc(0, 0, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
			this.ctx.strokeStyle = this.options.backgroundColor || '#dadada';
			this.ctx.stroke();
		}

		// CURRENT VALUE
		var percentage = (this.value / this.max) * 100;
		var degrees    = (percentage / 100) * this.end;
		var radians    = (degrees - 90) * Math.PI / 180;

		this.ctx.beginPath();
		this.ctx.arc(0, 0, this.radius, this.startAngle, radians, this.counterClockwise);
		
		this.ctx.strokeStyle = this.options.color || '#000';
		this.ctx.stroke();

		if ($(this.element).find('p').length) {
			var valContainer = $(this.element).find('p:first');
			valContainer.text(Math.round(this.value));
		}

		return this;
	}

	this.update = function(value) {

		var old = this.lastValue;

		if (value > old) {

			var increment = setInterval(function() {
				
				if (self.options.ranges) {

					for (var i in self.options.ranges) {

						var range = self.options.ranges[i];

						if (old >= range.min && old <= range.max) {
							self.options.color = range.color;
						}
					}

				}

				self.value = old;
				self.render();

				if (old >= value) {
					clearInterval(increment);
				}

				++old;

			}, 10);

		} else {

			var decrement = setInterval(function() {

				if (self.options.ranges) {

					for (var i in self.options.ranges) {

						var range = self.options.ranges[i];

						if (old >= range.min && old <= range.max) {
							self.options.color = range.color;
						}
					}

				}

				self.value = old;
				self.render();

				if (old <= value) {
					clearInterval(decrement);
				}

				--old;

			}, 10);

		}

		this.lastValue = value;
		
		return self;
	}

	return this;

};

$.fn.dial = function(options) {
	return this.each(function(i, el) {
		var dial = new Dial();
		dial.element = el;

		if ($(el).data()) {
			for (var i in $(el).data()) {
				options[i] = $(el).data(i);
			}
		}

		dial.init(options).render();
	});
}
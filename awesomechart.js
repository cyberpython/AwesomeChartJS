/*
 *   Copyright 2013 Georgios Migdos
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

function updateChart(awesomeChart) {
	awesomeChart.ctx.clearRect(0, 0, awesomeChart.width, awesomeChart.height);

	awesomeChart.drawChart(awesomeChart.currentFrame);

	awesomeChart.drawTitleAndBorders();

	if (awesomeChart.currentFrame < awesomeChart.animationFrames) {
		awesomeChart.currentFrame++;
		setTimeout(function() {
			updateChart(awesomeChart);
		}, 1000 / awesomeChart.animationFrames);
	}
}

function AwesomeChart(canvasElementId) {
	var canvas = (typeof canvasElementId === 'string') ? document
			.getElementById(canvasElementId) : canvasElementId;
	this.ctx = canvas.getContext('2d');
	this.width = this.ctx.canvas.width;
	this.height = this.ctx.canvas.height;

	this.numberOfDecimals = 0;

	this.proportionalSizes = true;
	this.widthSizeFactor = 1;
	this.heightSizeFactor = 1;

	this.chartType = 'bar';
	this.randomColors = false;

	this.animate = true;
	this.animationFrames = 60;
	this.currentFrame = 0;

	this.marginTop = 10;
	this.marginBottom = 10;
	this.marginLeft = 10;
	this.marginRight = 10;

	this.labelMargin = 10;
	this.dataValueMargin = 20;
	this.titleMargin = 10;
	this.yAxisLabelMargin = 5;

	this.data = new Array();
	this.labels = new Array();
	this.colors = new Array();
	this.title = null;

	this.backgroundFillStyle = 'rgba(255,255,255,0)';
	this.borderStrokeStyle = 'rgba(255,255,255,0)';
	this.borderWidth = 1.0;

	this.labelFillStyle = 'rgb(220, 36, 0)';
	this.labelFont = 'sans-serif';
	this.labelFontHeight = 12;
	this.labelFontStyle = '';

	this.dataValueFillStyle = '#333';
	this.dataValueFont = 'sans-serif';
	this.dataValueFontHeight = 15;
	this.dataValueFontStyle = '';

	this.titleFillStyle = '#333';
	this.titleFont = 'sans-serif';
	this.titleFontHeight = 16;
	this.titleFontStyle = 'bold';

	this.yAxisLabelFillStyle = '#333';
	this.yAxisLabelFont = 'sans-serif';
	this.yAxisLabelFontHeight = 10;
	this.yAxisLabelFontStyle = '';

	var lingrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
	lingrad.addColorStop(0.2, '#fdfdfd');
	lingrad.addColorStop(0.8, '#ededed');

	this.chartBackgroundFillStyle = lingrad;
	this.chartBorderStrokeStyle = '#999';
	this.chartBorderLineWidth = 1;
	this.chartHorizontalLineStrokeStyle = '#999';
	this.chartHorizontalLineWidth = 1;
	this.chartVerticalLineStrokeStyle = '#999';
	this.chartVerticalLineWidth = 1;

	this.chartMarkerSize = 5;

	this.chartPointRadius = 4;
	this.chartPointFillStyle = 'rgb(150, 36, 0)';

	this.chartLineStrokeStyle = 'rgba(150, 36, 0, 0.5)';
	this.chartLineWidth = 2;

	this.seriesHGap = 20;
	this.seriesVGap = 20;
};

AwesomeChart.prototype = {
	isArray : function(x) {
		if (Object.prototype.toString.call(x) === Object.prototype.toString
				.call([])) {
			return true;
		}
		return false;
	},

	arrayNumericSortReverse : function(arr, data) {
		arr.sort(function(a, b) {
			return data[b] - data[a];
		});
	},

	dataMax : function(arr) {
		var max = null;
		var tmp = null;
		for ( var a in arr) {
			tmp = Math.max.apply(null, arr[a]);
			if ((max == null) || (max < tmp)) {
				max = tmp;
			}
		}
		return max;
	},

	dataMin : function(arr) {
		var min = null;
		var tmp = null;
		for ( var a in arr) {
			tmp = Math.min.apply(null, arr[a]);
			if ((min == null) || (min < tmp)) {
				min = tmp;
			}
		}
		return min;
	},

	maxSeriesLength : function(arr) {
		var len = 0;
		for ( var a in arr) {
			tmp = arr[a].length;
			if (len <= tmp) {
				len = tmp;
			}
		}
		return len;
	},

	generateRandomColor : function() {
		var rgb = new Array();
		for ( var i = 0; i < 3; i++) {
			rgb.push(Math.ceil(Math.random() * 150 + 50));
		}
		return 'rgb(' + rgb.join(",") + ')';
	},

	draw : function() {
		var context = this.ctx;
		context.lineCap = 'round';
		var minFactor = Math.min(this.widthSizeFactor, this.heightSizeFactor);

		if (this.proportionalSizes) {
			this.labelMargin = this.labelMargin * this.heightSizeFactor;
			this.dataValueMargin = this.dataValueMargin * this.heightSizeFactor;
			this.titleMargin = this.titleMargin * this.heightSizeFactor;
			this.yAxisLabelMargin = this.yAxisLabelMargin
					* this.heightSizeFactor;

			this.labelFontHeight = this.labelFontHeight * minFactor;
			this.dataValueFontHeight = this.dataValueFontHeight * minFactor;
			this.titleFontHeight = this.titleFontHeight * minFactor;
			this.yAxisLabelFontHeight = this.yAxisLabelFontHeight * minFactor;
		}

		if (this.randomColors) {
			for ( var i in this.data) {
				this.colors[i] = this.generateRandomColor();
			}
		}

		if (!this.animate) {
			this.currentFrame = this.animationFrames;
		} else {
			this.currentFrame = 0;
		}

		updateChart(this);

	},

	drawTitleAndBorders : function() {
		var context = this.ctx;

		if (this.title != null) {
			// Draw the title:

			context.font = this.titleFontStyle + ' ' + this.titleFontHeight
					+ 'px ' + this.titleFont;
			context.fillStyle = this.titleFillStyle;
			context.textAlign = 'center';
			context.textBaseline = 'bottom';
			context.fillText(this.title, this.width / 2, this.marginTop
					+ this.titleFontHeight, this.width - 10);
		}

		// Draw the outer border:

		context.lineWidth = this.borderWidth;
		context.strokeStyle = this.borderStrokeStyle;
		context.strokeRect(0, 0, this.width, this.height);

		context.globalCompositeOperation = 'destination-over';

		// Fill the background:

		context.fillStyle = this.backgroundFillStyle;
		context.fillRect(0, 0, this.width, this.height);

		context.globalCompositeOperation = 'source-over';
	},

	drawChart : function(frameNumber) {
	}
};

function AwesomeBarChart(canvasElementId) {

	AwesomeChart.call(this, canvasElementId);

	this.barFillStyle = 'rgb(220, 36, 0)';
	this.barStrokeStyle = '#fff';
	this.barBorderWidth = 2.0;
	this.barShadowColor = 'rgba(0, 0, 0, 0.5)';
	this.barShadowBlur = 5;
	this.barShadowOffsetX = 3.0;
	this.barShadowOffsetY = 0.0;
};

AwesomeBarChart.prototype = Object.create(AwesomeChart.prototype);

function AwesomeHorizontalBarChart(canvasElementId) {

	AwesomeBarChart.call(this, canvasElementId);
	this.barHGap = 5;

	var parentDraw = this.draw;

	this.draw = function() {
		this.barHGap = this.barHGap * this.widthSizeFactor;
		this.barVGap = this.barHGap * this.heightSizeFactor;
		parentDraw.call(this);
	};

	this.drawChart = function(frameNumber) {
		var context = this.ctx;
		// Calculate bar size:

		var n = this.maxSeriesLength(this.data);
		var numOfSeries = Object.keys(this.data).length;
		var maxData = this.dataMax(this.data);
		var minData = this.dataMin(this.data);

		var barWidth = (this.width - this.marginLeft - this.marginRight - (((numOfSeries - 1)
				* n * this.barHGap) + (n * this.seriesHGap)))
				/ (n * numOfSeries);

		var barMaxTopY = this.marginTop + this.labelMargin
				+ this.labelFontHeight + this.dataValueMargin
				+ this.dataValueFontHeight;

		var barMinTopY = this.height - this.marginBottom;

		if (this.title != null) {
			barMaxTopY += this.titleFontHeight + this.titleMargin;
		}

		var barBottomY = this.height - this.marginBottom;

		if (minData < 0) {

			barMinTopY = this.height - this.marginBottom - this.labelMargin
					- this.labelFontHeight - this.dataValueMargin
					- this.dataValueFontHeight;

			barBottomY = barMinTopY
					+ ((this.height - this.marginBottom - barMaxTopY
							- this.labelMargin - this.labelFontHeight
							- this.dataValueMargin - this.dataValueFontHeight) * minData)
					/ (Math.abs(minData) + maxData);

		}

		var maxBarHeight = Math.max(Math.abs(barBottomY - barMaxTopY), Math
				.abs(barBottomY - barMinTopY));
		var maxBarAbsData = Math.max(Math.abs(minData), Math.abs(maxData));

		var x = this.marginLeft;
		var y = barBottomY;
		var barHeight = 0;

		for ( var i = 0; i < n; i++) {

			for ( var series in this.data) {
				di = this.data[series][i];
				barHeight = (di * frameNumber / this.animationFrames)
						* maxBarHeight / maxBarAbsData;

				// Draw the bar:
				context.fillStyle = this.colors[series] ? this.colors[series]
						: this.barFillStyle;
				context.strokeStyle = this.barStrokeStyle;
				context.lineWidth = this.barBorderWidth;

				context.beginPath();
				context.moveTo(x, y);
				context.lineTo(x, y - barHeight);
				context.lineTo(x + barWidth, y - barHeight);
				context.lineTo(x + barWidth, y);

				context.save();
				context.shadowOffsetX = this.barShadowOffsetX;
				context.shadowOffsetY = this.barShadowOffsetY;
				context.shadowBlur = this.barShadowBlur;
				context.shadowColor = this.barShadowColor;

				context.fill();
				context.restore();
				context.stroke();

				// Draw the label:

				context.font = this.labelFontStyle + ' ' + this.labelFontHeight
						+ 'px ' + this.labelFont;
				context.fillStyle = this.colors[series] ? this.colors[series]
						: this.labelFillStyle;
				context.textAlign = 'center';

				if (di >= 0) {
					context.textBaseline = 'bottom';
					context.fillText(series, x + barWidth / 2, barBottomY
							- barHeight - this.labelMargin, barWidth);
				} else {
					context.textBaseline = 'top';
					context.fillText(series, x + barWidth / 2, barBottomY
							- barHeight + this.labelMargin, barWidth);
				}

				// Draw the data value:

				context.font = this.dataValueFontStyle + ' '
						+ this.dataValueFontHeight + 'px ' + this.dataValueFont;
				context.fillStyle = this.dataValueFillStyle;
				context.textAlign = 'center';
				if (di >= 0) {
					context.textBaseline = 'bottom';
					context.fillText(di, x + barWidth / 2, barBottomY
							- barHeight - this.labelMargin
							- this.dataValueMargin, barWidth);
				} else {
					context.textBaseline = 'top';
					context.fillText(di, x + barWidth / 2, barBottomY
							- barHeight + this.labelMargin
							+ this.dataValueMargin, barWidth);
				}

				// Update x:

				x += barWidth + this.barHGap;
			}
			x += this.seriesHGap;

		}
	};
}

AwesomeHorizontalBarChart.prototype = Object.create(AwesomeBarChart.prototype);

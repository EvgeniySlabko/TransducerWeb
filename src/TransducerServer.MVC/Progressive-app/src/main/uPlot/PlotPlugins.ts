import { IncreaseBrightness } from "../Common/ColorHelpers";
import { Label, LimitLine } from "./PlotBase";

export function labelsPlugin(labels: Label[]) {
    function drawBg(u: uPlot) {
        labels.forEach((l) => {
            let xRange = <number[]>[u.scales["x"]!.min, u.scales["x"]!.max];

            if (l.time > xRange[1] || l.time < xRange[0]) return;

            let xCord = u.valToPos(l.time, "x", true);
            let yCord = u.valToPos(l.value, l.scale, true);

            let xShifted = xCord;
            let yShifted = yCord;
            if (l.value > 0) yShifted -= 10;
            else yShifted += 20;

            u.ctx.save();

            u.ctx.font = "15px Comic Sans MS";
            u.ctx.fillStyle = "black";
            u.ctx.textAlign = "center";
            u.ctx.fillText(l.text, xShifted, yShifted);

            u.ctx.strokeStyle = "red";
            u.ctx.fillStyle = "red";
            u.ctx.beginPath();
            u.ctx.arc(xCord, yCord, 3, 0, 2 * Math.PI, true);
            u.ctx.fill();
            u.ctx.stroke();

            u.ctx.stroke(); // Отображает путь
            u.ctx.restore();
        });
    }

    return {
        hooks: {
            draw: drawBg,
        },
    };
}

export function limitsPlugin(limits: LimitLine[]) {
    function drawBg(u: uPlot) {
        //console.log("left: ", left, "top: ", top, "width", width, "height", height);
        limits.forEach((l) => {
            if (!l.enabled()) return;
            let { left, top, width, height } = u.bbox;
            let range = l.range();
            if (l.value > range[1] || l.value < range[0]) return;
            let rangeValue = range[1] - range[0];
            let dr = rangeValue / height;

            let tmpR = [range[0] + -range[0], range[1] + -range[0]];
            let tmpV = l.value + -range[0];

            let relVal = tmpV - tmpR[0];
            let limitHeight = (relVal * height) / rangeValue;

            u.ctx.save();
            u.ctx.strokeStyle = IncreaseBrightness(l.color(), 40);

            let xMax = u.scales["x"].max;
            let xMin = u.scales["x"].min;
            let dashLen = 5;
            let dashGap = 15;
            if (xMax && xMin) {
                let range = xMax - xMin;
                dashLen = (1 / range) * 160;
                dashGap = (1 / range) * 250;
            }

            u.ctx.beginPath();
            u.ctx.setLineDash([dashLen, dashGap]);
            u.ctx.font = "10px serif";
            u.ctx.textAlign = "start";
            u.ctx.fillStyle = IncreaseBrightness(l.color(), 40);

            let dy = height - limitHeight + top;
            u.ctx.fillText(l.label, left, dy - 6);
            u.ctx.moveTo(left, dy);
            u.ctx.lineWidth = 2;
            u.ctx.lineTo(left + width, dy);
            u.ctx.stroke();
            u.ctx.restore();
        });
    }

    return {
        hooks: {
            drawClear: drawBg,
        },
    };
}

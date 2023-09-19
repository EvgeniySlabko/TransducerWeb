import { IncreaseBrightness } from "../Common/ColorHelpers";
import { Axis } from "./uplot";

export declare class LimitLine {
    label: string;
    axis: uPlot.Axis;
    range: () => number[];
    value: number;
    color: () => string;
    enabled: () => boolean;
}

export declare class Label {
    scale: string;
    time: number;
    text: string;
    value: number;
}

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

export const limitsPlugin = (limits: LimitLine[]) =>{
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

/*
export const wheelZoomPlugin = (opts: CustomOptions) => {
    let factor = 0.75;

    let xMin: number, xMax: number, yMin: number, yMax: number, xRange: number, yRange: number;

    function clamp(nRange: number, nMin: number, nMax: number, fRange: number, fMin: number, fMax: number) {
        return [nMin, nMax];
    }

    const SetScale = (min: number, max: number) => {
        if (min >= max) throw "min higher then max";
        let rangeValue = max - min;
        if (rangeValue > opts.maxScreenSize) {
            this.params.setScreenSize(this.params.maxScreenSize);
            return;
        }
        this.params.range = [min, max];
    }

    return {
        hooks: {
            ready: (u: any) => {
                xMin = u.scales.x.min;
                xMax = u.scales.x.max;
                yMin = u.scales.y.min;
                yMax = u.scales.y.max;

                xRange = xMax - xMin;
                yRange = yMax - yMin;

                let over = u.over;
                let rect = over.getBoundingClientRect();

                over.addEventListener("dblclick", (e: MouseEvent) => {
                    e.stopPropagation();
                });

                over.addEventListener("contextmenu", (e: Event) => {
                    e.preventDefault();
                    //return false;
                });
                // wheel drag pan
                over.addEventListener("mousedown", (e: any) => {
                    if (e.button === 2) {
                        e.preventDefault();

                        let left0 = e.clientX;

                        let scXMin0 = opts.range[0];
                        let scXMax1 = opts.range[1];

                        let xUnitsPerPx = u.posToVal(1, "x") - u.posToVal(0, "x");

                        let onmove = (e: any) => {
                            e.preventDefault();

                            let left1 = e.clientX;
                            let dx = xUnitsPerPx * (left1 - left0);
                            this.SetScale(scXMin0 - dx, scXMax1 - dx);
                        };

                        function onup(e: any) {
                            document.removeEventListener("mousemove", onmove);
                            document.removeEventListener("mouseup", onup);
                        }

                        document.addEventListener("mousemove", onmove);
                        document.addEventListener("mouseup", onup);
                    }
                });

                // wheel scroll zoom
                over.addEventListener("wheel", (e: any) => {
                    e.preventDefault();

        
                    xMin = opts.range[0];
                    xMax = opts.range[1];
                    //yMin = u.scales.y1.min;
                    //yMax = u.scales.y1.max;
                    xRange = xMax - xMin;
                    //yRange = yMax - yMin;
                    if (xRange < 0.001 && e.deltaY < 0) return;
                    rect = over.getBoundingClientRect();

                    let { left, top } = u.cursor;

                    let leftPct = left / rect.width;
                    let btmPct = 1 - top / rect.height;
                    let xVal = u.posToVal(left, "x");
                    let yVal = u.posToVal(top, "y1");
                    let oxRange = u.scales.x.max - u.scales.x.min;
                    let oyRange = u.scales.y.max - u.scales.y.min;

                    let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
                    let nxMin = xVal - nxRange * leftPct;
                    let nxMax = nxMin + nxRange;
                    [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

                    this.SetScale(nxMin, nxMax);
                });

                this.ready.dispatch(this, u);
            },
        },
    };
}
*/

export const valuesMapper : Axis.Values = (u, vals, space) =>

    vals.map((v) => {
    let rounded = v.toFixed(4).replace(/0*$/, "");
    if (rounded[rounded.length - 1] === ".") {
        rounded = rounded.replace(".", "");
    }

    return rounded;
})







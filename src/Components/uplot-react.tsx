import React, { useCallback, useEffect, useRef } from 'react';
import uPlot, { AlignedData, Options } from '../uPlot/uplot';

type OptionsUpdateState = 'keep' | 'update' | 'create';
if (!Object.is) {
    // eslint-disable-next-line
    Object.defineProperty(Object, "is", {value: (x: any, y: any) =>
        (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
    });
}
export const UplotReact = ({
    options,
    data,
    target,
    onDelete,
    onCreate,
    resetScales = true,
}: {
    options: Options;
    data: AlignedData;
    // eslint-disable-next-line
    target?: HTMLElement | ((self: uPlot, init: Function) => void);
    onDelete?: (chart: uPlot) => void;
    onCreate?: (chart: uPlot) => void;
    resetScales?: boolean;
}) => {
    const chartRef = useRef<uPlot | null>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const propOptionsRef = useRef(options);
    const propTargetRef = useRef(target);
    const propDataRef = useRef(data);
    const onCreateRef = useRef(onCreate);
    const onDeleteRef = useRef(onDelete);

    useEffect(() => {
        onCreateRef.current = onCreate;
        onDeleteRef.current = onDelete;
    });

    const destroy = useCallback((chart: uPlot | null) => {
        if (chart) {
            onDeleteRef.current?.(chart);
            chart.destroy();
            chartRef.current = null;
        }
    }, []);
    const create = useCallback(() => {
        const newChart = new uPlot(
            propOptionsRef.current,
            propDataRef.current,
            propTargetRef.current || (targetRef.current as HTMLDivElement)
        );
        chartRef.current = newChart;
        onCreateRef.current?.(newChart);
    }, []);


    const optionsUpdateState = (_lhs: Options, _rhs: Options): OptionsUpdateState => {
        const {width: lhsWidth, height: lhsHeight, ...lhs} = _lhs;
        const {width: rhsWidth, height: rhsHeight, ...rhs} = _rhs;
    
        let state: OptionsUpdateState = 'keep';
        if (lhsHeight !== rhsHeight || lhsWidth !== rhsWidth) {
            state = 'update';
        }
        if (Object.keys(lhs).length !== Object.keys(rhs).length) {
            return 'create';
        }
        for (const k of Object.keys(lhs)) {
            if (!Object.is((lhs as any)[k], (rhs as any)[k])) {
                state = 'create';
                break;
            }
        }
        return state;
    }
    
    const dataMatch = (lhs: AlignedData, rhs: AlignedData): boolean => {
        if (lhs.length !== rhs.length) {
            return false;
        }
        return lhs.every((lhsOneSeries, seriesIdx) => {
            const rhsOneSeries = rhs[seriesIdx];
            if (lhsOneSeries.length !== rhsOneSeries.length) {
                return false;
            }
            return (lhsOneSeries as any).every((value: any, valueIdx: any) => value === rhsOneSeries[valueIdx]);
        });
    }

    useEffect(() => {
        create();
        return () => {
            destroy(chartRef.current);
        };
    }, [create, destroy]);

    useEffect(() => {
        if (propOptionsRef.current !== options) {
            const optionsState = optionsUpdateState(propOptionsRef.current, options);
            propOptionsRef.current = options;
            if (!chartRef.current || optionsState === 'create') {
                destroy(chartRef.current);
                create();
            } else if (optionsState === 'update') {
                chartRef.current.setSize({
                    width: options.width,
                    height: options.height,
                });
            }
        }
    }, [options, create, destroy]);

    useEffect(() => {
        if (propDataRef.current !== data) {
            if (!chartRef.current) {
                propDataRef.current = data;
                create();
            } else if (!dataMatch(propDataRef.current, data)) {
                if (resetScales) {
                    chartRef.current.setData(data, true);
                } else {
                    chartRef.current.setData(data, false);
                    chartRef.current.redraw();
                }
            }
            propDataRef.current = data;
        }
    }, [data, resetScales, create]);

    useEffect(() => {
        if (propTargetRef.current !== target) {
            propTargetRef.current = target;
            create();
        }

        return () => destroy(chartRef.current);
    }, [target, create, destroy]);

    return target ? null : <div ref={targetRef}></div>;
}
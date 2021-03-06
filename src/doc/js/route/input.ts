// tslint:disable:object-literal-sort-keys
import * as Util from '../util';

declare var Tweakpane: any;

export const InputRoute = {
	pathname: /^(\/tweakpane)?\/input.html$/,

	init: () => {
		const markerToFnMap: {
			[key: string]: (container: HTMLElement | null) => void;
		} = {
			input: (container) => {
				const PARAMS = {
					b: true,
					c: '#ff8800',
					n: 50,
					p: {x: 12, y: 34},
					s: 'string',
				};
				const pane = new Tweakpane({
					container: container,
				});
				const nf = pane.addFolder({
					title: 'Number',
				});
				nf.addInput(PARAMS, 'n', {
					label: 'text',
				});
				nf.addInput(PARAMS, 'n', {
					label: 'slider',
					max: 100,
					min: 0,
				});
				nf.addInput(PARAMS, 'n', {
					label: 'list',
					options: {
						low: 0,
						medium: 50,
						high: 100,
					},
				});
				const sf = pane.addFolder({
					title: 'String',
				});
				sf.addInput(PARAMS, 's', {
					label: 'text',
				});
				sf.addInput(PARAMS, 's', {
					label: 'list',
					options: {
						dark: 'Dark',
						light: 'Light',
					},
				});
				const bf = pane.addFolder({
					title: 'Boolean',
				});
				bf.addInput(PARAMS, 'b', {
					label: 'checkbox',
				});
				const cf = pane.addFolder({
					title: 'Color',
				});
				cf.addInput(PARAMS, 'c', {
					label: 'picker',
				});
				const pf = pane.addFolder({
					title: 'Point',
				});
				pf.addInput(PARAMS, 'p', {
					label: 'picker',
				});
			},
			numberText: (container) => {
				const PARAMS = {value: 50};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'text',
				});
			},
			slider: (container) => {
				const PARAMS = {value: 50};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'slider',
					max: 100,
					min: 0,
				});
			},
			step: (container) => {
				const PARAMS = {
					speed: 0.5,
					count: 10,
				};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'speed', {
					step: 0.1,
				});
				pane.addInput(PARAMS, 'count', {
					label: 'count',
					max: 100,
					min: 0,
					step: 10,
				});
			},
			numberList: (container) => {
				const PARAMS = {value: 50};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'quality',
					options: {
						low: 0,
						medium: 50,
						high: 100,
					},
				});
				pane.addSeparator();
				pane.addMonitor(PARAMS, 'value', {
					label: '(actual)',
				});
			},
			stringText: (container) => {
				const PARAMS = {value: 'hello, world'};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'message',
				});
			},
			stringList: (container) => {
				const PARAMS = {value: ''};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'theme',
					options: {
						none: '',
						dark: 'path/to/dark.json',
						light: 'path/to/Light.json',
					},
				});
				pane.addSeparator();
				pane.addMonitor(PARAMS, 'value', {
					label: '(actual)',
				});
			},
			checkbox: (container) => {
				const PARAMS = {value: true};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'hidden',
				});
			},
			objectColor: (container) => {
				const PARAMS = {tint: {r: 255, g: 127, b: 0}};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'tint');
			},
			stringColor: (container) => {
				const PARAMS = {
					tint: '#8df',
				};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'tint');
			},
			numberColor: (container) => {
				const PARAMS = {
					tint: 0x0088ff,
				};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'tint', {
					input: 'color',
				});
			},
			point2d: (container) => {
				const PARAMS = {value: {x: 50, y: 25}};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'offset',
				});
			},
			point2dParams: (container) => {
				const PARAMS = {value: {x: 20, y: 30}};
				const pane = new Tweakpane({
					container: container,
				});
				pane.addInput(PARAMS, 'value', {
					label: 'offset',
					x: {step: 20},
					y: {min: 0, max: 100},
				});
			},
		};
		Object.keys(markerToFnMap).forEach((marker) => {
			const initFn = markerToFnMap[marker];
			const container = Util.selectContainer(marker);
			initFn(container);
		});
	},
};

import {assert} from 'chai';
import {describe, describe as context, it} from 'mocha';

import {MonitorBinding} from '../binding/monitor';
import {MultiLogMonitorController} from '../controller/monitor/multi-log';
import {SingleLogMonitorController} from '../controller/monitor/single-log';
import {RootController} from '../controller/root';
import {TestUtil} from '../misc/test-util';
import {IntervalTicker} from '../misc/ticker/interval';
import {RootApi} from './root';

function createApi(): RootApi {
	const c = new RootController(TestUtil.createWindow().document, {});
	return new RootApi(c);
}

describe(RootApi.name, () => {
	[
		{
			expectedClass: SingleLogMonitorController,
			params: {},
			value: true,
		},
		{
			expectedClass: MultiLogMonitorController,
			params: {
				count: 10,
			},
			value: true,
		},
	].forEach((testCase) => {
		context(`when params = ${JSON.stringify(testCase.params)}`, () => {
			it(`should return class ${testCase.expectedClass.name}`, () => {
				const api = createApi();
				const obj = {foo: testCase.value};
				const bapi = api.addMonitor(obj, 'foo', testCase.params);
				assert.instanceOf(bapi.controller.controller, testCase.expectedClass);

				const b = bapi.controller.binding;
				if (b instanceof MonitorBinding) {
					const t = b.ticker;
					if (t instanceof IntervalTicker) {
						t.dispose();
					}
				}
			});
		});
	});
});

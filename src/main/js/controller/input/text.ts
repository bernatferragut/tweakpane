import {Formatter} from '../../formatter/formatter';
import {TypeUtil} from '../../misc/type-util';
import {InputValue} from '../../model/input-value';
import {Parser} from '../../parser/parser';
import {TextInputView} from '../../view/input/text';
import {InputController} from './input';

/**
 * @hidden
 */
export interface Config<T> {
	formatter: Formatter<T>;
	parser: Parser<string, T>;
	value: InputValue<T>;
}

/**
 * @hidden
 */
export class TextInputController<T> implements InputController<T> {
	public readonly value: InputValue<T>;
	public readonly view: TextInputView<T>;
	private parser_: Parser<string, T>;

	constructor(document: Document, config: Config<T>) {
		this.onInputChange_ = this.onInputChange_.bind(this);

		this.parser_ = config.parser;
		this.value = config.value;

		this.view = new TextInputView(document, {
			formatter: config.formatter,
			value: this.value,
		});
		this.view.inputElement.addEventListener('change', this.onInputChange_);
	}

	public dispose(): void {
		this.view.dispose();
	}

	private onInputChange_(e: Event): void {
		const inputElem: HTMLInputElement = TypeUtil.forceCast(e.currentTarget);
		const value = inputElem.value;

		const parsedValue = this.parser_(value);
		if (!TypeUtil.isEmpty(parsedValue)) {
			this.value.rawValue = parsedValue;
		}
		this.view.update();
	}
}

import {ClassName} from '../../misc/class-name';
import {Color} from '../../model/color';
import {InputValue} from '../../model/input-value';
import {ColorSwatchInputView} from '../input/color-swatch';
import {View} from '../view';
import {InputView} from './input';
import {TextInputView} from './text';

interface Config {
	swatchInputView: ColorSwatchInputView;
	textInputView: TextInputView<Color>;
}

const className = ClassName('cswtxt', 'input');

/**
 * @hidden
 */
export class ColorSwatchTextInputView extends View implements InputView<Color> {
	private swatchInputView_: ColorSwatchInputView;
	private textInputView_: TextInputView<Color>;

	constructor(document: Document, config: Config) {
		super(document);

		this.element.classList.add(className());

		const swatchElem = document.createElement('div');
		swatchElem.classList.add(className('s'));
		this.swatchInputView_ = config.swatchInputView;
		swatchElem.appendChild(this.swatchInputView_.element);
		this.element.appendChild(swatchElem);

		const textElem = document.createElement('div');
		textElem.classList.add(className('t'));
		this.textInputView_ = config.textInputView;
		textElem.appendChild(this.textInputView_.element);
		this.element.appendChild(textElem);
	}

	get value(): InputValue<Color> {
		return this.textInputView_.value;
	}

	public dispose(): void {
		this.swatchInputView_.dispose();
		this.textInputView_.dispose();
		super.dispose();
	}

	public update(): void {
		this.swatchInputView_.update();
		this.textInputView_.update();
	}
}

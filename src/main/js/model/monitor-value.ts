import {Emitter} from '../misc/emitter';

type EventType = 'update';

/**
 * @hidden
 */
export class MonitorValue<T> {
	public readonly emitter: Emitter<EventType>;
	private rawValues_: T[];
	private totalCount_: number;

	constructor(totalCount: number) {
		this.emitter = new Emitter();
		this.rawValues_ = [];
		this.totalCount_ = totalCount;
	}

	get rawValues(): T[] {
		return this.rawValues_;
	}

	get totalCount(): number {
		return this.totalCount_;
	}

	public append(rawValue: T): void {
		this.rawValues_.push(rawValue);

		if (this.rawValues_.length > this.totalCount_) {
			this.rawValues_.splice(0, this.rawValues_.length - this.totalCount_);
		}

		this.emitter.emit('update', [rawValue]);
	}
}

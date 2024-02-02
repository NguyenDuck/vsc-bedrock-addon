import { ExtensionContext, Disposable } from 'vscode'
import { Event } from '../Event'

/**
 * Abstract class representing a group of events.
 * Maintains a private array of Event objects.
 * Provides methods to add and remove events from the group.
 */
export abstract class EventGroup {
	private _events: Event<any>[] = []

	constructor(protected context: ExtensionContext) {}

	get eventGroup(): Disposable[] {
		return this._events.flatMap(e => e.disposables())
	}

	addEvent(event: Event<any>): void {
		this._events.push(event)
	}

	removeEvent(event: Event<any>): void {
		this._events = this._events.filter(e => e !== event)
	}
}

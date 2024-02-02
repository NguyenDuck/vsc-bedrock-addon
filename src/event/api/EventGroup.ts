import { ExtensionContext, Disposable } from 'vscode'
import { Event } from '../Event'

/**
 * Abstract class representing a group of events.
 * Maintains a private array of Event objects.
 * Provides methods to add and remove events from the group.
 */
export abstract class EventGroup {
	private events: Event<any>[] = []

	constructor(protected context: ExtensionContext) {}

	eventGroup(): Disposable[] {
		return this.events.flatMap(e => e.disposables())
	}

	addEvent(event: Event<any>): void {
		this.events.push(event)
	}

	addEventGroup(eg: EventGroup): void {
		this.events.push(...eg.events)
	}

	removeEvent(event: Event<any>): void {
		this.events = this.events.filter(e => e !== event)
	}
}

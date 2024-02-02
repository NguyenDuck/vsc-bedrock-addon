import { $log } from '@tsed/logger'
import { Disposable, ExtensionContext } from 'vscode'
import { Event } from './Event'
import { EventGroup } from './api/EventGroup'

$log.name = 'EventManager'

/**
 * Manages registering and unregistering event handlers.
 *
 * On construction, registers events with the extension context.
 * Provides methods to register and unregister events.
 */
export class EventManager {
	private events: Event<any>[] = []

	constructor(private context: ExtensionContext) {}

	registerEvent(event: Event<any>): void {
		this.events.push(event)
		this.context.subscriptions.push(event)
	}

	registerEventGroup(eg: EventGroup): void {
		this.context.subscriptions.push(...eg.eventGroup())
	}

	removeEvent(event: Event<any>): void {
		this.events = this.events.filter(d => {
			if (d === event) {
				event.dispose()
				return false
			}
			return true
		})
	}
}

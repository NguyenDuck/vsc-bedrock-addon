import { $log } from '@tsed/logger'
import { Disposable, ExtensionContext } from 'vscode'
import { Event } from './Event'

$log.name = 'EventManager'

/**
 * Manages registering and unregistering event handlers.
 *
 * On construction, registers disposables with the extension context.
 * Provides methods to register and unregister events.
 */
export class EventManager {
	private disposables: Disposable[] = []

	constructor(private context: ExtensionContext) {}

	registerEvent(event: Event) {
		this.disposables.push(event)
		this.context.subscriptions.push(event)
	}

	removeEvent(event: Event) {
		this.disposables = this.disposables.filter(d => {
			if (d === event) {
				event.dispose()
				return false
			}
			return true
		})
	}
}

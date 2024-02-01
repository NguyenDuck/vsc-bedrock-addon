import { Disposable } from 'vscode'

/**
 * Abstract class representing an event that can have listeners registered to it.
 * Extends Disposable for automatic listener cleanup.
 */
export abstract class Event extends Disposable {
	private listeners = new Set<Function>()

	constructor() {
		super(() => this.dispose())
	}

	public on(listener: Function) {
		this.listeners.add(listener)
	}

	public off(listener: Function) {
		this.listeners.delete(listener)
	}

	public async emit(args: any[]) {
		for await (const listener of this.listeners) {
			await listener.call(this, args)
		}
	}

	dispose() {
		this.listeners.clear()
	}
}

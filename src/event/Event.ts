import { Disposable, ExtensionContext } from 'vscode'

/**
 * Abstract base class for events in the extension.
 * Defines common functionality like registering listeners, emitting events to listeners, and cleaning up listeners.
 * Subclasses should implement get disposables to return disposables to clean up any resources.
 */
export abstract class Event<T> {
	protected listeners = new Set<(args: T) => void>()

	constructor(protected context: ExtensionContext) {}

	public on(listener: (args: T) => void): this {
		this.listeners.add(listener)
		return this
	}

	public off(listener: (args: T) => void): this {
		this.listeners.delete(listener)
		return this
	}

	public async emit(args: T) {
		for await (const listener of this.listeners) {
			listener.call(this, args)
		}
	}

	dispose(): void {
		this.listeners.clear()
	}

	abstract disposables(): Disposable[]
}

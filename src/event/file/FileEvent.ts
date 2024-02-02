import { ExtensionContext, Uri } from 'vscode'
import { Event } from '../Event'

/**
 * Abstract base class for file event objects.
 *
 * Contains common properties for events related to file system changes.
 * Subclasses should provide additional properties specific to the file event type.
 */
export abstract class FileEvent<T> extends Event<T> {
	constructor(context: ExtensionContext, protected uri: Uri) {
		super(context)
	}
}

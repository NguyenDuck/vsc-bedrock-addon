import { ExtensionContext, GlobPattern, RelativePattern } from 'vscode'
import { Event } from '../Event'

/**
 * Abstract base class for events related to matching files using glob patterns.
 * Extends Event and takes a glob pattern to match against.
 */
export abstract class FileMatcherEvent<T> extends Event<T> {
	constructor(context: ExtensionContext, protected pattern: GlobPattern | RelativePattern) {
		super(context)
	}
}

import { ExtensionContext, Uri } from 'vscode'
import { EventGroup } from './EventGroup'
import { FileDeletedEvent } from '../file/FileDeletedEvent'
import { FileContentChangedEvent } from '../file/FileContentChangedEvent'

/**
 * ManifestEventGroup extends EventGroup to handle manifest.json events.
 */
export class ManifestEventGroup extends EventGroup {
	constructor(context: ExtensionContext, uri: Uri) {
		super(context)
		// this.addEvent(new FileDeletedEvent(context, uri).on(() => console.log(`File deleted`)))
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(({ contentChanges, document, reason }) =>
				console.log(`File content changed 1`)
			)
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(({ contentChanges, document, reason }) =>
				console.log(`File content changed 2`)
			)
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(({ contentChanges, document, reason }) =>
				console.log(`File content changed 3`)
			)
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(({ contentChanges, document, reason }) =>
				console.log(`File content changed 4`)
			)
		)
	}
}

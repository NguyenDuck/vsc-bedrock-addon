import { ExtensionContext, Uri, workspace } from 'vscode'
import { FileEvent } from './FileEvent'

/**
 * FileDeletedEvent extends FileEvent to handle the workspace.onDidDeleteFiles event.
 * It listens for delete events and checks if the deleted file matches this URI,
 * emitting the URI if so.
 */
export class FileDeletedEvent extends FileEvent {
	constructor(protected context: ExtensionContext, protected uri: Uri) {
		super(context, uri)
		this.context.subscriptions.push(
			workspace.onDidDeleteFiles(async e => {
				if (e.files.find(f => f.fsPath === uri.fsPath)) {
					await this.emit([uri])
				}
			})
		)
	}
}

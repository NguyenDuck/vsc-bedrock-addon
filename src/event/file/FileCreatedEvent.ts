import { ExtensionContext, Uri, workspace } from 'vscode'
import { FileEvent } from './FileEvent'

/**
 * FileCreatedEvent extends FileEvent to handle the workspace.onDidCreateFiles event.
 * It listens for when files are created in the workspace and checks if the
 * created file matches the uri, emitting the uri if so.
 */
export class FileCreatedEvent extends FileEvent {
	constructor(protected context: ExtensionContext, protected uri: Uri) {
		super(context, uri)
		this.context.subscriptions.push(
			workspace.onDidCreateFiles(async e => {
				if (e.files.find(f => f.fsPath === uri.fsPath)) {
					await this.emit([uri])
				}
			})
		)
	}
}

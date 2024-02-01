import { ExtensionContext, Uri, workspace } from 'vscode'
import { FileEvent } from './FileEvent'

/**
 * FileContentChangedEvent extends FileEvent to listen for text document
 * changes and emit events when the content changes for the file URI.
 */
export class FileContentChangedEvent extends FileEvent {
	constructor(context: ExtensionContext, uri: Uri) {
		super(context, uri)
		this.context.subscriptions.push(
			workspace.onDidChangeTextDocument(async e => {
				if (e.document.uri.fsPath === uri.fsPath) {
					await this.emit([uri])
				}
			})
		)
	}
}

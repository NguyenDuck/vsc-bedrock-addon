import { workspace, Disposable, Uri, TextDocumentChangeEvent } from 'vscode'
import { FileEvent } from './FileEvent'

/**
 * Returns an array of Disposable objects that will dispose event handlers when this object is disposed.
 * Specifically, it listens for text document change events and checks if the changed document matches this FileContentChangedEvent's uri.
 * If so, it emits the uri and change event.
 */
export class FileContentChangedEvent extends FileEvent<TextDocumentChangeEvent> {
	disposables(): Disposable[] {
		return [
			workspace.onDidChangeTextDocument(async e => {
				if (e.document.uri.fsPath === this.uri.fsPath) {
					return await this.emit(e)
				}
			}),
		]
	}
}

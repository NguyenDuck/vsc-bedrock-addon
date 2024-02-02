import { Disposable, FileDeleteEvent, workspace } from 'vscode'
import { FileEvent } from './FileEvent'

/**
 * Extends FileEvent to handle the 'onDidDeleteFiles' event from VS Code
 * workspace. Checks if the deleted file matches this event's file,
 * and if so, emits the delete event.
 */
export class FileDeletedEvent extends FileEvent<FileDeleteEvent> {
	disposables(): Disposable[] {
		return [
			workspace.onDidDeleteFiles(async e => {
				if (e.files.find(f => f.fsPath === this.uri.fsPath)) {
					return await this.emit(e)
				}
			}),
		]
	}
}

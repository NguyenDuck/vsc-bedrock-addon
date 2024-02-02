import { workspace, Disposable, FileCreateEvent } from 'vscode'
import { FileEvent } from './FileEvent'

/**
 * Overrides the disposables getter to listen for file creation events
 * and emit a FileCreatedEvent when a file matching the uri is created.
 */
export class FileCreatedEvent extends FileEvent<FileCreateEvent> {
	disposables(): Disposable[] {
		return [
			workspace.onDidCreateFiles(async e => {
				if (e.files.find(f => f.fsPath === this.uri.fsPath)) {
					return await this.emit(e)
				}
			}),
		]
	}
}

import { Disposable, Uri, workspace } from 'vscode'
import { FileMatcherEvent } from './FileMatcherEvent'

/**
 * Extends FileMatcherEvent to create a file system watcher that emits
 * FileMatcherCreatedEvents when files matching the pattern are created.
 */
export class FileMatcherCreatedEvent extends FileMatcherEvent<Uri> {
	disposables(): Disposable[] {
		const fileWatcher = workspace.createFileSystemWatcher(this.pattern, false, true, true)
		fileWatcher.onDidCreate(async e => await this.emit(e))
		return [fileWatcher]
	}
}

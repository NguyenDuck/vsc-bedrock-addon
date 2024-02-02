import { Disposable, Uri, workspace } from 'vscode'
import { FileMatcherEvent } from './FileMatcherEvent'

/**
 * Extends FileMatcherEvent to handle deleted file events.
 * Sets up a file system watcher to emit delete events.
 */
export class FileMatcherDeletedEvent extends FileMatcherEvent<Uri> {
	disposables(): Disposable[] {
		const fileWatcher = workspace.createFileSystemWatcher(this.pattern, true, true, false)
		fileWatcher.onDidDelete(async e => await this.emit(e))
		return [fileWatcher]
	}
}

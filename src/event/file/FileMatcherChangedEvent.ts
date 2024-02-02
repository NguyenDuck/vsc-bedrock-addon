import { Disposable, Uri, workspace } from 'vscode'
import { FileMatcherEvent } from './FileMatcherEvent'

/**
 * Extends FileMatcherEvent to create a FileMatcherChangedEvent that emits
 * when the file system watcher detects a change to a matched file.
 * Sets up a file system watcher on the provided pattern.
 */
export class FileMatcherChangedEvent extends FileMatcherEvent<Uri> {
	disposables(): Disposable[] {
		const fileWatcher = workspace.createFileSystemWatcher(this.pattern, true, false, true)
		fileWatcher.onDidChange(async e => await this.emit(e))
		return [fileWatcher]
	}
}

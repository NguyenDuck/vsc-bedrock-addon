import { ExtensionContext, Uri } from 'vscode'
import { EventGroup } from './EventGroup'
import { FileContentChangedEvent } from '../file/FileContentChangedEvent'
import { $log } from '@tsed/logger'

export class BlockEventGroup extends EventGroup {
	constructor(context: ExtensionContext, uri: Uri) {
		super(context)
		$log.name = `BlockEventGroup`
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(() => {
				$log.debug(`FileContentChanged 1`)
			})
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(async () => {
				$log.debug(`FileContentChanged 2`)
			})
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(() => {
				$log.debug(`FileContentChanged 3`)
			})
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(async () => {
				$log.debug(`FileContentChanged 4`)
			})
		)
		this.addEvent(
			new FileContentChangedEvent(context, uri).on(() => {
				$log.debug(`FileContentChanged 5`)
			})
		)
	}
}

import { ExtensionContext, Uri } from 'vscode'
import { EventGroup } from './EventGroup'

export class MCFunctionEventGroup extends EventGroup {
	constructor(context: ExtensionContext, uri: Uri) {
		super(context)
	}
}

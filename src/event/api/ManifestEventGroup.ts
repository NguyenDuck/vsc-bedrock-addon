import { ExtensionContext, Uri } from 'vscode'
import { EventGroup } from './EventGroup'
import { BlockEventGroup } from './BlockEventGroup'

export class ManifestEventGroup extends EventGroup {
	constructor(context: ExtensionContext, protected uri: Uri) {
		super(context)
		this.addEventGroup(new BlockEventGroup(context, uri))
	}

	private addEventGroupWhenValid() {
		return
	}

	private addAutoCompleteProvider() {
		return
	}

	private addDiagnosticProvider() {
		return
	}

	private updateGlobalStateWhenChanged() {
		return
	}
}

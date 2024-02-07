import { ExtensionContext, Uri } from 'vscode'
import { EventGroup } from '../EventGroup'

export class ManifestEventGroup extends EventGroup {
	constructor(context: ExtensionContext, protected uri: Uri) {
		super(context)
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

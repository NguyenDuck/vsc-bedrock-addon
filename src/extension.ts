import { $log } from '@tsed/logger'
import { ExtensionContext, Uri, workspace } from 'vscode'
import { parse } from 'jsonc-parser-vsc'
import { EventManager } from './event/EventManager'
import { ManifestEventGroup } from './event/api/ManifestEventGroup'

$log.name = 'VSCBedrockAddon'

const stateKey = 'vsc-bedrock-addon'

export async function activate(context: ExtensionContext) {
	// const globalState = context.globalState
	// if (globalState.get(stateKey) === undefined) {
	// 	globalState.update(stateKey, {})
	// }

	// const workspaceState = context.workspaceState
	// if (workspaceState.get(stateKey) === undefined) {
	// 	workspaceState.update(stateKey, {})
	// }

	const eventManager = new EventManager(context)

	// TODO: Get cached addon data from globalStorage and add it to dynamic schema

	// Search manifest.json for addon define in current workspace
	const manifestPaths = await findManifestPaths()

	// Add it to EventManager
	for await (const uri of manifestPaths) {
		try {
			eventManager.registerEventGroup(new ManifestEventGroup(context, uri))
		} catch (e) {
			$log.error(e)
		}
		// await loadAddonManifest(context, uri)
	}
}

// async function addFileSystemWatcher(context: ExtensionContext, uri: Uri) {
// 	const watcher = workspace.createFileSystemWatcher(
// 		new RelativePattern(dirname(uri.path), basename(uri.path)),
// 		true
// 	)
// 	watcher.onDidChange(async (e: Uri) => {
// 		await loadAddonManifest(context, e)
// 	})
// 	watcher.onDidDelete(async (e: Uri) => {
// 		await deleteAddonManifest(context, e)
// 		watcher.dispose()
// 	})
// 	context.subscriptions.push(watcher)
// }

async function findManifestPaths(): Promise<Uri[]> {
	return workspace.findFiles('**/manifest.json', '**/node_modules/**')
}

// async function readJsonFile(uri: Uri) {
// 	const fileData = await workspace.fs.readFile(uri)
// 	const jsonObj = parse(fileData.toString())
// 	if (jsonObj.errors.length > 0) {
// 		return
// 	}
// 	return jsonObj.text
// }

// async function loadAddonManifest(context: ExtensionContext, uri: Uri) {
// 	const path = uri.path
// 	const content = await readJsonFile(uri)
// 	if (!content) {
// 		return false
// 	}
// 	if (content.toString().length < 150) {
// 		return false
// 	}

// 	const manifest = content.toJSON()
// 	if (!manifest) {
// 		return false
// 	}
// 	// Object.assign(getGlobalState(context), {
// 	// 	[path]: manifest,
// 	// })
// 	return true
// }

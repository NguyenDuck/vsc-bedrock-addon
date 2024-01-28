import { $log } from '@tsed/logger'
import { ExtensionContext, RelativePattern, Uri, workspace } from 'vscode'
import { parse } from 'jsonc-parser-vsc'
import { basename, dirname } from 'path'

$log.name = 'VSCBedrockAddon'

const globalStateKey = 'vsc-bedrock-addon'

export async function activate(context: ExtensionContext) {
	const globalState = context.globalState
	if (globalState.get(globalStateKey) === undefined) {
		globalState.update(globalStateKey, {})
	}

	// TODO: Get cached addon data from globalStorage and add it to dynamic schema

	// Search manifest.json for addon define in current workspace
	const manifestPaths = await findManifestPaths()

	// Load and add to globalStorage
	for await (const uri of manifestPaths) {
		const completed = await loadAddonManifest(context, uri)
		if (completed) await addFileSystemWatcher(context, uri)
	}
}

async function addFileSystemWatcher(context: ExtensionContext, uri: Uri) {
	const watcher = workspace.createFileSystemWatcher(
		new RelativePattern(dirname(uri.path), basename(uri.path)),
		true
	)
	watcher.onDidChange(async (e: Uri) => {
		await loadAddonManifest(context, e)
	})
	watcher.onDidDelete(async (e: Uri) => {
		await deleteAddonManifest(context, e)
		watcher.dispose()
	})
	context.subscriptions.push(watcher)
}

async function findManifestPaths(): Promise<Uri[]> {
	return workspace.findFiles('**/manifest.json', '**/node_modules/**')
}

async function readJsonFile(uri: Uri) {
	const fileData = await workspace.fs.readFile(uri)
	const jsonObj = parse(fileData.toString())
	if (jsonObj.errors.length > 0) {
		return
	}
	return jsonObj.text
}

async function loadAddonManifest(context: ExtensionContext, uri: Uri) {
	const path = uri.path
	const content = await readJsonFile(uri)
	if (!content) return false
	if (content.toString().length < 150) return false

	const manifest = content.toJSON()
	if (!manifest) return false
	Object.assign(getGlobalState(context), {
		[path]: manifest,
	})
	return true
}

async function deleteAddonManifest(context: ExtensionContext, uri: Uri) {
	const path = uri.path
	// @ts-expect-error
	delete getGlobalState(context)[path]
}

function getGlobalState(context: ExtensionContext): Object {
	return <Object>context.globalState.get(globalStateKey)
}

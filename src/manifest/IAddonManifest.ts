export interface IAddonManifest {
	format_version: 1 | 2
	header: {
		allow_random_seed?: boolean
		base_game_version?: [number, number, number]
		description?: string
		lock_template_options?: boolean
		min_engine_version: string
		name: string
		uuid: string
		version: [number, number, number] | string
	}
	modules: [
		| {
				description?: string
				type: EModuleType.Data | EModuleType.Resources | EModuleType.WorldTemplate
				uuid: string
				version: [number, number, number] | string
		  }
		| {
				description?: string
				type: EModuleType.Script
				uuid: string
				entry: string
				version: [number, number, number] | string
				language: 'javascript'
		  }
	]
	dependencies?: [
		| {
				uuid: string
				version: Number[] | string
		  }
		| {
				module_name: EDependModuleName
				version: string
		  }
	]
	capabilities?: ECapability[]
	metadata?: {
		authors?: string[]
		license?: string
		generated_with?: { [key: string]: [number, number, number] | string }
		url?: string
	}
}

export enum ECapability {
	Chemistry = 'chemistry',
	EditorExtension = 'editorExtension',
	ExperimentalCustomUi = 'experimental_custom_ui',
	Raytraced = 'raytraced',
}

export enum EModuleType {
	Data = 'data',
	Resources = 'resources',
	WorldTemplate = 'world_template',
	Script = 'script',
}

export enum EDependModuleName {
	Admin = 'server-admin',
	Gametest = 'server-gametest',
	Net = 'server-net',
	UI = 'server-ui',
	Server = 'server',
	Editor = 'server-editor',
}

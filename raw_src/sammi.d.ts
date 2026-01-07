declare namespace SAMMI_TYPES {
	enum BoxType {
		ResizableText = 0,
		CheckBox = 2,
		OBSScenes = 4,
		OBSSources = 5,
		OBSFilters = 6,
		KeyboardButton = 7,
		CompareBox = 8,
		MathBox = 9,
		SoundPath = 10,
		Slider = 11,
		NormalBox = 14,
		VariableBox = 15,
		ColorBox = 17,
		SelectBoxValue = 18,
		SelectBoxString = 19,
		SelectBoxStringTypeable = 20,
		FilePath = 22,
		ImagePath = 23,
		TwitchRewardRedeemID = 24,
		OptionBox = 25,
		NoBox = 30,
		OBSPullBox = 32,
		SelectDeckBox = 33,
		PasswordBox = 34,
		TwitchAccountBox = 35,
		SaveVariableBox = 37
	}

	enum TriggerType {
		TwitchChat = 0,
		TwitchSub = 1,
		TwitchGift = 2,
		TwitchRedeem = 3,
		TwitchRaid = 4,
		TwitchBits = 5,
		TwitchFollower = 6,
		Hotkey = 7,
		Timer = 8,
		OBSTrigger = 9,
		SAMMI = 10,
		TwitchModeration = 11,
		ExtensionTrigger = 12
	}

	enum DeckStatus {
		Disabled = 0,
		Enabled = 1,
		Toggle = 2
	}

	type BoxDefinition = [
		boxName: string,
		boxType: BoxType | number,
		defaultValue: any,
		sizeModifier?: number,
		options?: any
	];
}

interface SammiBridge {
	/**
	 * Get a variable
	 * @param name Variable name
	 * @param buttonId Button ID, default 'global'
	 */
	getVariable(name: string, buttonId?: string): Promise<any>;

	/**
	 * Set a variable
	 * @param name Variable name
	 * @param value Variable value
	 * @param buttonId Button ID, default 'global'
	 * @param instanceID Optional instance ID for non-persistent buttons
	 */
	setVariable(name: string, value: any, buttonId?: string, instanceID?: string): Promise<void>;

	/**
	 * Delete a variable
	 * @param name Variable name
	 * @param buttonId Button ID, default 'global'
	 */
	deleteVariable(name: string, buttonId?: string): Promise<void>;

	/**
	 * Inserts an item to a specified index in an array, shifting the other items
	 * @param arrayName Name of the array
	 * @param index Index to insert the new item at
	 * @param value Item value
	 * @param buttonId Button ID, default 'global'
	 */
	insertArray(arrayName: string, index: number, value: any, buttonId?: string): Promise<void>;

	/**
	 * Deletes an item in a specified index in an array, shifting the other items
	 * @param arrayName Name of the array
	 * @param index Index to delete the item at
	 * @param buttonId Button ID, default 'global'
	 */
	deleteArray(arrayName: string, index: number, buttonId?: string): Promise<void>;

	/**
	 * Send an extension command to SAMMI
	 * @param name Name of the extension command
	 * @param color Color of the extension box (BGR hex), default 3355443
	 * @param height Height of the extension box, default 52
	 * @param boxes Object containing all extension boxes. 
	 *              Value is [boxName, boxType(SAMMI_TYPES.BoxType), defaultValue, sizeModifier?, options?]
	 * @param sendAsExtensionTrigger If true, triggers an extension within SAMMI instead of sending data to Bridge, default false
	 * @param hideCommand If true, hides the command from the extension menu, default false
	 */
	extCommand(name: string, color?: number, height?: number, boxes?: Record<string, SAMMI_TYPES.BoxDefinition>, sendAsExtensionTrigger?: boolean, hideCommand?: boolean): void;

	/**
	 * Trigger an extension
	 * @param trigger Name of the trigger
	 * @param data Object containing all trigger pull data
	 */
	triggerExt(trigger: string, data?: any): void;

	/**
	 * Triggers a button
	 * @param id Button ID to trigger
	 */
	triggerButton(id: string): void;

	/**
	 * Modifies a button appearance temporarily
	 * @param id Button ID to modify
	 * @param color Decimal button color (BGR)
	 * @param text Button text
	 * @param image Button image file name
	 * @param border Border size, 0-7
	 */
	modifyButton(id: string, color?: number, text?: string, image?: string, border?: number): void;

	/**
	 * Opens an edit commands window in SAMMI for the selected button
	 * @param deckId Deck ID where the button resides
	 * @param buttonId Button ID to open
	 */
	editButton(deckId: string, buttonId: string): void;

	/**
	 * Saves a value to an INI file
	 * @param fileName File name
	 * @param section Section name
	 * @param key Key name
	 * @param value Value to save
	 * @param type Type of the value, either "string" or "number"
	 */
	saveIni(fileName: string, section: string, key: string, value: any, type?: "string" | "number"): void;

	/**
	 * Loads a value from an INI file
	 * @param fileName File name
	 * @param section Section name
	 * @param key Key name
	 * @param type Type of the value, either "string" or "number"
	 */
	loadIni(fileName: string, section: string, key: string, type?: "string" | "number"): Promise<any>;

	/**
	 * Opens an URL in your default browser
	 * @param url Full URL to open
	 */
	openURL(url: string): void;

	/**
	 * Sends an HTTP request via SAMMI to avoid CORS issues
	 * @param url Full URL to send the request to
	 * @param method HTTP method (GET, POST, PUT, DELETE, etc.), default 'GET'
	 * @param headers Object containing all headers
	 * @param body Body of the request
	 */
	httpRequest(url: string, method?: string, headers?: Record<string, string>, body?: any): Promise<{ Value: string }>;

	/**
	 * Send a popup message to SAMMI
	 * @param message Message to display
	 */
	popUp(message: string): void;

	/**
	 * Send an alert message to SAMMI
	 * @param message Message to display
	 */
	alert(message: string): void;

	/**
	 * Sends a notification (tray icon bubble) message to SAMMI
	 * @param message Message to display
	 */
	notification(message: string): void;

	/**
	 * Request an array of all decks
	 */
	getDeckList(): Promise<any[]>;

	/**
	 * Request a deck params
	 * @param id ID of the specified deck
	 */
	getDeck(id: string): Promise<any>;

	/**
	 * Request current deck status
	 * @param id ID of the specified deck
	 * @returns 0 (disabled) or 1 (enabled)
	 */
	getDeckStatus(id: string): Promise<SAMMI_TYPES.DeckStatus | 0 | 1>;

	/**
	 * Change deck status
	 * @param id ID of the specified deck
	 * @param status New status: 1 = enable, 0 = disable, 2 = toggle
	 */
	changeDeckStatus(id: string, status: SAMMI_TYPES.DeckStatus | 0 | 1 | 2): void;

	/**
	 * Retrieve an image in base64
	 * @param fileName Image file without the path
	 */
	getImage(fileName: string): Promise<string>;

	/**
	 * Retrieves CRC32 of a file
	 * @param fileName File name without the path
	 */
	getSum(fileName: string): Promise<string>;

	/**
	 * Retrieves all currently active buttons
	 */
	getActiveButtons(): Promise<any[]>;

	/**
	 * Retrieves all currently modified buttons
	 */
	getModifiedButtons(): Promise<any[]>;

	/**
	 * Retrieves information for all linked Twitch accounts
	 */
	getTwitchList(): Promise<any[]>;

	/**
	 * Trigger a generic event
	 * @param type Trigger number
	 * @param data Data required for the trigger
	 */
	trigger(type: SAMMI_TYPES.TriggerType | number, data: any): void;

	/**
	 * Closes SAMMI connection to Bridge
	 */
	close(): void;

	/**
	 * Generates a random message (used for test triggers)
	 */
	generateMessage(): void;
}

interface SammiClient {
	/**
	 * Listen for an event (extension command)
	 * @param event Extension command name
	 * @param callback Function to execute when event is received
	 */
	on(event: string, callback: (payload: { Data: any }) => void): void;

	/**
	 * Add a listener for an event (extension command)
	 * @param event Extension command name
	 * @param callback Function to execute when event is received
	 */
	addListener(event: string, callback: (payload: { Data: any }) => void): void;
}

declare const SAMMI: SammiBridge;
declare const sammiclient: SammiClient;

browser.storage.local.get(["addSpace", "hostValue", "filterList"]).then(function(newconfig) {
	// load config or use defaults
	var config = {
		addSpace: newconfig.addSpace || false,
		hostValue: newconfig.hostValue || "HoSt",
		filterList: newconfig.filterList || ["*://*/*"]
	};

	// changes request headers
	function mangleHost(e) {
		for (var header of e.requestHeaders) {
			if(header.name.toLowerCase() == "host") {
				console.log("Overriding header for: ", header.value);
				if(config.addSpace)
					header.value = ' ' + header.value;
				header.name = config.hostValue;
				break; // don't check other headers
			}
	    	}
		return {requestHeaders: e.requestHeaders};
	}

	// update config when changed
	function storageChanged(changes, area) {
		if(area !== 'local')
			return;

		config.addSpace = changes.addSpace.newValue;
		config.hostValue = changes.hostValue.newValue;
		config.filterList = changes.filterList.newValue;

		console.log("Config updated:", config);

		// remove old listener if required
		if(browser.webRequest.onBeforeSendHeaders.hasListener(mangleHost))
			browser.webRequest.onBeforeSendHeaders.removeListener(mangleHost)

		// listen for headers
		browser.webRequest.onBeforeSendHeaders.addListener(
			mangleHost,
			{urls: config.filterList },
			["blocking", "requestHeaders"]
		);
	}

	// listen to config changes
	browser.storage.onChanged.addListener(storageChanged);

	// ensure config is saved initially to be used in options.js later (defaults)
	// also adds listener in storageChanged
	browser.storage.local.set(config);

	
}, function(err) {
	console.log("Error: ", error);
});
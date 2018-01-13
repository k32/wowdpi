/**
 * Options:
 * addSpace - boolean, adds whitespace before host name value;
 * hostValue - string, value to replace original "Host" key;
 * filterList - array of match patterns https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns
 */

function onError(err) {
	console.log("Error: ", err);
}

function restoreOptions() {
	browser.storage.local.get(["addSpace", "hostValue", "filterList"]).then(function(val) {
		document.querySelector("#addSpace").checked = val.addSpace;
		document.querySelector("#hostValue").value = val.hostValue;
		document.querySelector("#filterList").value = val.filterList.join("\n");
	}, onError);
}

function saveOptions() {
	browser.storage.local.set({
		addSpace: document.querySelector("#addSpace").checked,
		hostValue: document.querySelector("#hostValue").value,
		filterList: document.querySelector("#filterList").value.split("\n")
	});
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#saveButton").addEventListener("click", saveOptions);


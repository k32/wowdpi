function mangleHost(e) {
    for (var header of e.requestHeaders) {
        if (header.name == "Host") {
            header.value = ' ' + header.value;
            // header.name = "HoSt"; 
        }
    }
    return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
    mangleHost,
    {urls: ["http://*/*"]},
    ["blocking", "requestHeaders"]
);

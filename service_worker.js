// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info) {
    let url = info.linkUrl || info.srcUrl || info.pageUrl || null;

    // Guarda la URL en el almacenamiento local
    chrome.storage.local.set(
        { lastContextUrl: url }
    );
    // Abre una nueva pestaña con el popup y pasa la URL como parámetro
    chrome.tabs.create({
        url: chrome.runtime.getURL('popup.html') + '?url=' + encodeURIComponent(url)
    });
    
    switch (info.menuItemId) {
        case 'radio':
            // Radio item function
            console.log('Radio item clicked. Status:', info.checked);
            break;
        case 'checkbox':
            // Checkbox item function
            console.log('Checkbox item clicked. Status:', info.checked);
            break;
        default:
            // Standard context menu item function
            console.log('Standard context menu item clicked.');
    }
}
chrome.runtime.onInstalled.addListener(function () {
    // Create one test item for each context type.
    let contexts = [
        'page',
        'selection',
        'link',
        'editable',
        'image',
        'video',
        'audio'
    ];
    for (let i = 0; i < contexts.length; i++) {
        let context = contexts[i];
        let title = "Informacion de link seleccionado";
        chrome.contextMenus.create({
            title: title,
            contexts: [context],
            id: context,
            
        });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'contextMenuClick') {
        console.log('URL recibida:', message.url);
        // Aquí puedes usar la URL como necesites
    }
});
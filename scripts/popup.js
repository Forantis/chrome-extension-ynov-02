const storageCache = [];
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = chrome.storage.sync.get().then((items) => {
  // Copy the data retrieved from storage into storageCache.
  Object.assign(storageCache, items.bookmarks || []);
});

// init storageCache
async function initStorage() {
    try{
        await initStorageCache;
    } catch (error){
        console.error(error);
    }
}




/* const data = [{name: 'cat video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}, 
   {name: 'dog video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}]; */

function deleteBookmark(index){
    return function(){
        storageCache.splice(index, 1);
        chrome.storage.sync.set({bookmarks: storageCache});
        const ul = document.querySelector("#bookmarks-list");
        ul.innerHTML = "";
        loadBookmarks();
    }
}

// load bookmarks from storage
function loadBookmarks(){
if (storageCache.length > 0 && "content" in document.createElement("template")){
    const ul = document.querySelector("#bookmarks-list");
    const template = document.querySelector("#bookmark-template");
    let i = 0;

    storageCache.forEach(element => {
        const newListItem = template.content.cloneNode(true);
        newListItem.querySelector('li > a').textContent = element.name;
        newListItem.querySelector('li > a').href = element.href;
        newListItem.querySelector('li > button').dataset.index = i;
        newListItem.querySelector('li > button').addEventListener('click', deleteBookmark(i));
        i++;
        ul.appendChild(newListItem);
    });
}};

// add bookmark functionality
document.querySelector(".form").addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.querySelector("#bookmark-name").value;
    const href = document.querySelector("#bookmark-link").value;

    if(name && href){
        initStorage();
        const newBookmark = {"name": name, "href": href};
        storageCache.push(newBookmark);
        console.log(storageCache);
        chrome.storage.sync.set({bookmarks: storageCache});
    }

    const ul = document.querySelector("#bookmarks-list");
    ul.innerHTML = "";
    loadBookmarks();
});

// handle the state of the add / reload bookmark button
document.querySelector('#bookmark-name').addEventListener('input', function(){
    if(document.querySelector('#bookmark-name').value === "" && document.querySelector('#bookmark-link').value === ""){
        document.querySelector('#bookmark-button').value = "reload bookmarks";
    }
    else{
        document.querySelector('#bookmark-button').value = "add bookmark";
    }});

document.querySelector('#bookmark-link').addEventListener('input', function(){
    if(document.querySelector('#bookmark-name').value === "" && document.querySelector('#bookmark-link').value === ""){
        document.querySelector('#bookmark-button').value = "reload bookmarks";
    }
    else{
        document.querySelector('#bookmark-button').value = "add bookmark";
    }});

// get bookmarks from local storage and load them on popup load
document.addEventListener('DOMContentLoaded', function(){
    initStorage();
    loadBookmarks();
});

function getTitle() {

    console.log(document.querySelector("h1 > yt-formatted-string").textContent);
    return document.querySelector("h1 > yt-formatted-string").textContent;
  }
  
    chrome.action.onClicked.addListener((tab) => {
    console.log(tab.url);
    if (tab.url.includes('youtube')) {
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getTitle
        });
    }
    });
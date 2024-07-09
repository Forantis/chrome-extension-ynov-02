const storageCache = [];
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = chrome.storage.sync.get().then((items) => {
  // Copy the data retrieved from storage into storageCache.
  Object.assign(storageCache, items);
});

// init storageCache
async function initStorage() {
    try{
        await initStorageCache;
    } catch (error){
        console.error(error);
    }
}

initStorage();

const data = [{name: 'cat video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}, 
    {name: 'dog video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}];

if (storageCache.length > 0 && "content" in document.createElement("template")){
    const ul = document.querySelector("#bookmarks-list");
    const template = document.querySelector("#bookmark-template");

    storageCache.forEach(element => {
        const newListItem = template.content.cloneNode(true);
        newListItem.querySelector('li > a').textContent = element.name;
        newListItem.querySelector('li > a').href = element.href;
        ul.appendChild(newListItem);
    });
}

document.querySelector(".form").addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.querySelector("#bookmark-name").value;
    const href = document.querySelector("#bookmark-link").value;

    if(name && href){
        const newBookmark = {"name": name, "href": href};
        storageCache.push(newBookmark);
        console.log(storageCache);
        //chrome.storage.sync.set(storageCache);
    }
});
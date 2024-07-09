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

initStorage();


//const data = [{name: 'cat video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}, 
//   {name: 'dog video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}];

function loadBookmarks(){
if (storageCache.length > 0 && "content" in document.createElement("template")){
    const ul = document.querySelector("#bookmarks-list");
    const template = document.querySelector("#bookmark-template");

    storageCache.forEach(element => {
        const newListItem = template.content.cloneNode(true);
        newListItem.querySelector('li > a').textContent = element.name;
        newListItem.querySelector('li > a').href = element.href;
        ul.appendChild(newListItem);
    });
}};

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

loadBookmarks();
const data = [{name: 'cat video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}, 
    {name: 'dog video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}];

if (data.length > 0 && "content" in document.createElement("template")){
    const ul = document.querySelector("#bookmarks-list");
    const template = document.querySelector("#bookmark-template");

    data.forEach(element => {
        const newListItem = template.content.cloneNode(true);
        newListItem.querySelector('li > a').textContent = element.name;
        newListItem.querySelector('li > a').href = element.href;
        ul.appendChild(newListItem);
    });
}

document.querySelector(".form").addEventListener("submit", function(event){
    event.preventDefault();
    const name = document.querySelector("#bookmark-name").value;
    const href = document.querySelector("#bookmark-href").value;

    alert(`Name: ${name}, Href: ${href}`);
});

async function getStorageInfo(){
    const storageInfo = await navigator.storage.estimate();
    console.log(storageInfo);
}

getStorageInfo();
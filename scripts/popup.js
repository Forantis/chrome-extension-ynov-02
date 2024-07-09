const data = [{name: 'cat video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}, 
    {name: 'dog video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}];

    if (data.length > 0 && "content" in document.createElement("template")){
        const ul = document.querySelector("#bookmarks-list");
        const template = document.querySelector("#bookmark-template");
        console.log(template)

        data.forEach(element => {
            const newListItem = template.content.cloneNode(true);
            newListItem.textContent = element.name;
            newListItem.href = element.href;
            ul.appendChild(newListItem);
        });
    }
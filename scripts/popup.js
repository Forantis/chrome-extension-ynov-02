let data = [{name: 'cat video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}, 
    {name: 'dog video', href: 'https://www.youtube.com/watch?v=J---aiyznGQ'}];

    if (data.length > 0 && "content" in document.createElement("template")){
        const ul = document.getElementById("#bookmarks-list");
        const template = document.getElementById("#bookmark-template");

        data.forEach(element => {
            const newListItem = template.content.cloneNode(true);
            newListItem.textContent = element.name;
            newListItem.href = element.href;
            ul.appendChild(newListItem);
        });
    }
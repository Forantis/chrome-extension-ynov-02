console.log("background.js loaded");

function getTitle() {

    console.log(document.querySelector("h1 > yt-formatted-string").textContent);
    return document.querySelector("h1 > yt-formatted-string").textContent;
  }

//TODO: Onclicked event listener dont work
  
chrome.action.onClicked.addListener((tab) => {
    console.log(tab.url);
    if (tab.url.includes('youtube')) {
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getTitle()
        });
    }
});
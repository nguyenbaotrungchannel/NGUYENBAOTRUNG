chrome.runtime.onInstalled.addListener(() => {
  console.log("Hello World Extension installed!");
});

chrome.action.onClicked.addListener(() => {
  console.log("Extension icon clicked!");
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

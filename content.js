// This is the content script, it doesn't need to be triggered manually.
// When the message is sent, it will change the page's background color.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeColor') {
    document.body.style.backgroundColor = "LightBlue";
  }
});

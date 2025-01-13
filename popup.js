console.log("Popup script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const fillColorButton = document.getElementById("fillColorBtn");

  // Variable to track the current state of the background color (lightblue or not)
  let isRed = false;

  fillColorButton.addEventListener("click", async () => {
    try {
      // Get the currently active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Execute a script in the active tab to toggle the background color
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: (isRed) => {
          // Toggle the background color based on the `isRed` value
          if (isRed) {
            document.body.style.backgroundColor = ""; // Reset to original color
          } else {
            document.body.style.backgroundColor = "lightblue"; // Set background color to lightblue
          }
        },
        args: [isRed]
      });

      // Toggle the `isRed` flag to switch between lightblue and original color
      isRed = !isRed;
    } catch (error) {
      console.error("Error changing background color:", error);
    }
  });
});


console.log("Popup script loaded");

// Wait for the DOM to be ready in the popup
document.addEventListener("DOMContentLoaded", () => {
  const readButton = document.getElementById("readBtn");
  const articleList = document.getElementById("articleList");

  readButton.addEventListener("click", async () => {
    try {
      // 1. Get the currently active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // 2. Execute a script in the active tab to collect all <h3> elements
      const results = await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: () => {
          // This function runs in the context of the webpage
          // Grab all <h3> elements and return their text content
          const h3Elements = Array.from(document.querySelectorAll('h3'));
          return h3Elements.map(elem => elem.innerText.trim());
        }
      });
      
      // `results` is an array of objects: [{ frameId: 0, result: [...] }, ...]
      // We typically want results[0].result (main frame)
      if (results && results[0]?.result) {
        const h3Texts = results[0].result;
        
        // Clear the previous list
        articleList.innerHTML = "";

        // 3. Populate our <ul> with the collected h3 texts
        h3Texts.forEach(text => {
          const li = document.createElement("li");
          li.textContent = text;
          articleList.appendChild(li);
        });
      }
    } catch (error) {
      console.error("Error reading H3 tags:", error);
    }
  });
});

console.log("Popup script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const readButton = document.getElementById("readBtn");
  const articleList = document.getElementById("articleList");

  readButton.addEventListener("click", async () => {
    try {
      // 1. Get the currently active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // 2. Inject a script into the active tab to collect <h3> + <a> data
      const results = await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: () => {
          // This function runs in the webpage context
          // Select all <h3> elements (e.g., .title-news)
          const h3Elements = Array.from(document.querySelectorAll("h3"));

          // For each <h3>, look for an <a> link
          return h3Elements.map(h3 => {
            const anchor = h3.querySelector("a");
            if (anchor) {
              return {
                text: anchor.innerText.trim(),
                href: anchor.href
              };
            }
            return null;
          }).filter(item => item !== null);
        }
      });

      // 3. `results` is an array of objects: [{ frameId: 0, result: [...] }, ...]
      // We typically use results[0].result for the main frame
      if (results && results[0]?.result) {
        const headlines = results[0].result;
        
        // Clear existing list items
        articleList.innerHTML = "";

        // 4. Populate the <ul> with clickable links
        headlines.forEach(item => {
          const li = document.createElement("li");
          // Make the link clickable, opening in a new tab (target="_blank")
          li.innerHTML = `<a href="${item.href}" target="_blank">${item.text}</a>`;
          articleList.appendChild(li);
        });
      }
    } catch (error) {
      console.error("Error retrieving headlines:", error);
    }
  });
});

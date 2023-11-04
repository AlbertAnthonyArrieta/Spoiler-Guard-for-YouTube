let words = []; // Initialize the words array

// Load the saved words from storage
chrome.storage.local.get(['words'], function(result) {
    if (result.words) {
        words = result.words;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newWord) {
      // Add the new word to the words array
      words.push(request.newWord);
      console.log("Added new word: " + request.newWord);
      // Send a response
      sendResponse({success: true});
  }
});

let observer = new MutationObserver(function(mutations) {
  // Select all the video title elements
  let titles = document.querySelectorAll('ytd-rich-item-renderer #video-title');

  // Loop through each title
  titles.forEach(function(title) {
    // Loop through each word
    words.forEach(function(word) {
      // Create a regular expression to match the word case-insensitively
      let regex = new RegExp(`\\b${word}\\b`, 'i');

      // Check if the title includes the word
      if (regex.test(title.textContent)) {
        // Get the parent "ytd-rich-item-renderer" element
        let parent = title.closest('ytd-rich-item-renderer');

        // Add new div to block content.
        let newDiv = document.createElement('div');
        newDiv.textContent = 'Spoiler Guard blocked the following word: "' + word + '"';

        newDiv.style.backgroundColor = 'red';
        newDiv.style.width = parent.offsetWidth + 'px';
        newDiv.style.height = parent.offsetHeight + 'px';
        newDiv.style.color = 'white';
        newDiv.style.fontSize = '20px';
        newDiv.style.borderRadius = '5px';
        newDiv.style.margin = '2px';
        newDiv.style.padding = '5px';

        parent.parentNode.replaceChild(newDiv, parent);
      }
    });
  });
});

// Start observing the document with the configured mutation observer. This is to ensure that content is loaded before we start modifying it.
observer.observe(document, { childList: true, subtree: true });
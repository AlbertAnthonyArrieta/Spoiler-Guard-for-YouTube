let words = []; // Initialize the words array

// Load the saved words from storage
chrome.storage.local.get(['words'], function (result) {
  if (result.words) {
    words = result.words;
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.newWord) {
    // Add the new word to the words array
    words.push(request.newWord);
    console.log("Added new word: " + request.newWord);
    // Send a response
    sendResponse({ success: true });
  }
});

// This thing makes sure that elements are loaded before we start modifying them
let observer = new MutationObserver(function (mutations) {
  processHomepage();
  processSearchPage();
  processVideoPage();
});

function processHomepage() {
  // Select all the video title elements
  let titles = document.querySelectorAll('ytd-rich-item-renderer #video-title');

  // Loop through each title
  titles.forEach(function (title) {
    // Loop through each word
    words.forEach(function (word) {
      // Create a regular expression to match the word case-insensitively. This allows us to match the word regardless of case.
      let regex = new RegExp(`\\b${word}\\b`, 'i');

      // Check if the title includes the word
      if (regex.test(title.textContent)) {
        let parent = title.closest('ytd-rich-item-renderer');

        let newDiv = document.createElement('div');
        newDiv.textContent = 'Spoiler Guard blocked the following word: "' + word + '"';

        newDiv.style.backgroundColor = '#141414';
        newDiv.style.border = '2px solid #0fffe3';
        newDiv.style.color = '#0fffe3';
        newDiv.style.width = parent.offsetWidth + 'px';
        newDiv.style.height = parent.offsetHeight + 'px';
        newDiv.style.fontSize = '20px';
        newDiv.style.borderRadius = '5px';
        newDiv.style.margin = '2px';
        newDiv.style.padding = '5px';

        parent.parentNode.replaceChild(newDiv, parent);
      }
    });
  });
}

function processSearchPage() {
  let title = document.querySelectorAll('ytd-video-renderer #video-title');

  title.forEach(function (title) {
    // Loop through each word
    words.forEach(function (word) {
      // Create a regular expression to match the word case-insensitively. This allows us to match the word regardless of case.
      let regex = new RegExp(`\\b${word}\\b`, 'i');

      // Check if the title includes the word
      if (regex.test(title.textContent)) {
        let parent = title.closest('ytd-video-renderer');

        let newDiv = document.createElement('div');
        newDiv.textContent = 'Spoiler Guard blocked the following word: "' + word + '"';

        newDiv.style.backgroundColor = '#141414';
        newDiv.style.border = '2px solid #0fffe3';
        newDiv.style.color = '#0fffe3';
        newDiv.style.width = parent.offsetWidth + 'px';
        newDiv.style.height = parent.offsetHeight + 'px';
        newDiv.style.fontSize = '20px';
        newDiv.style.borderRadius = '5px';
        newDiv.style.margin = '2px';
        newDiv.style.padding = '5px';

        parent.parentNode.replaceChild(newDiv, parent);
      }
    });
  });
}

function processVideoPage() {
  let title = document.querySelectorAll('ytd-compact-video-renderer #video-title');

  title.forEach(function (title) {
    // Loop through each word
    words.forEach(function (word) {
      // Create a regular expression to match the word case-insensitively. This allows us to match the word regardless of case.
      let regex = new RegExp(`\\b${word}\\b`, 'i');

      // Check if the title includes the word
      if (regex.test(title.textContent)) {
        let parent = title.closest('ytd-compact-video-renderer');

        let newDiv = document.createElement('div');
        newDiv.textContent = 'Spoiler Guard blocked the following word: "' + word + '"';

        newDiv.style.backgroundColor = '#141414';
        newDiv.style.border = '2px solid #0fffe3';
        newDiv.style.color = '#0fffe3';
        newDiv.style.width = parent.offsetWidth + 'px';
        newDiv.style.height = parent.offsetHeight + 'px';
        newDiv.style.fontSize = '20px';
        newDiv.style.borderRadius = '5px';
        newDiv.style.margin = '2px';
        newDiv.style.padding = '5px';

        parent.parentNode.replaceChild(newDiv, parent);
      }
    });
  });
}

// Start observing the target node for configured mutations
observer.observe(document, { childList: true, subtree: true });
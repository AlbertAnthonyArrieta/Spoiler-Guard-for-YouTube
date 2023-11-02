let word = 'the';

let observer = new MutationObserver(function(mutations) {
  // Select all the video title elements
  let titles = document.querySelectorAll('ytd-rich-item-renderer #video-title');

  // Create a regular expression to match the word case-insensitively
  let regex = new RegExp(`\\b${word}\\b`, 'i');

  // Loop through each title
  titles.forEach(function(title) {
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

// Start observing the document with the configured mutation observer. This is to ensure that content is loaded before we start modifying it.
observer.observe(document, { childList: true, subtree: true });
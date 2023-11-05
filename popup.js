document.getElementById("clearbtn").addEventListener("click", clearWords);
document.getElementById("addbtn").addEventListener("click", addWord);

displayWords();

function addWord() {
    let newWord = document.getElementById("inputWord").value;
    if (newWord) {
        // Get the words array from storage
        chrome.storage.local.get(['words'], function(result) {
            let words = result.words || [];
            // Add the new word to the words array
            words.push(newWord);
            // Save the updated words array to storage
            chrome.storage.local.set({words: words}, function() {
                console.log('Word added to storage');
                // Clear the input field
                document.getElementById("inputWord").value = '';
                // Update the wordListContainer
                displayWords();
            });
        });
    }
}

function displayWords() {
    // Get the words array from storage
    chrome.storage.local.get(['words'], function(result) {
        console.log(result);
        if (result.words) {
            let wordListContainer = document.getElementById("wordListContainer");
            // Clear the wordListContainer
            wordListContainer.innerHTML = '';
            // Create a new div for each word
            result.words.forEach(function(word, index) {
                let wordDiv = document.createElement('div');
                let wordSpan = document.createElement('span');
                wordSpan.textContent = word;

                // Delete button and functions
                let deleteButton = document.createElement('button');
                deleteButton.textContent = ' X  ';
                deleteButton.addEventListener('click', function() {
                    result.words.splice(index, 1);
                    chrome.storage.local.set({words: result.words}, function() {
                        console.log('Word deleted from storage');
                        wordListContainer.removeChild(wordDiv);
                    });
                });
                wordDiv.appendChild(deleteButton);
                wordDiv.appendChild(wordSpan);
                wordListContainer.appendChild(wordDiv);
            });
        }
    });
}

function clearWords() {
    chrome.storage.local.clear(function() {
        console.log('Storage cleared');
        // Update the wordListContainer
        displayWords();
    });
}


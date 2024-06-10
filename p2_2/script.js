document.addEventListener('DOMContentLoaded', () => {
    const colorMapping = {
        category1: 'red', // 문학
        category2: 'blue', // 과학
        category3: 'green', // 인문
        category4: 'orange' // 수필, 에세이
        // Add more categories and colors as needed
    };

    // Select the fragments container
    const fragmentsContainer = document.querySelector('.fragments');
    
    // Get the word elements
    const words = Array.from(document.querySelectorAll('.word'));
    const overlay = document.querySelector('#overlay');
    const rightBox = document.querySelector('.rightBox');

    // Function to shuffle words
    const shuffleWords = () => {
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }
    };

    // Function to display words based on category
    const displayWords = (category) => {
        fragmentsContainer.innerHTML = '';
        words.forEach(word => {
            if (category === '전체' || word.getAttribute('data-category') === category) {
                fragmentsContainer.appendChild(word);
                word.style.display = 'inline-block';
            } else {
                word.style.display = 'none';
            }

            const wordCategory = word.getAttribute('data-category');
            if (wordCategory in colorMapping) {
                word.style.setProperty('--color', colorMapping[wordCategory]);
            }

            word.addEventListener('click', () => {
                const text = word.getAttribute('data-text');
                const author = word.getAttribute('data-author');
                const title = word.getAttribute('data-title');
                const publisher = word.getAttribute('data-publisher');
                const categoryColor = colorMapping[wordCategory];

                document.querySelector('#rightBox').textContent = text;
                document.querySelector('#authorText').textContent = `${author}`;
                document.querySelector('#titleText').textContent = `${title}`;
                document.querySelector('#publisherText').textContent = `${publisher}`;
                
                // Set the background gradient of rightBox to the gradient of the selected word's category
                document.querySelector('.rightBox').style.background = `linear-gradient(90deg, ${categoryColor} 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0) 100%)`;
            // Show rightBox for small screens
            if (window.innerWidth < 1247) {
                rightBox.classList.add('active');
                overlay.classList.add('active');
            }
        });
    });
};

    // Initial shuffle and display all words
    shuffleWords();
    displayWords('전체');

    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.categoryButton');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.classList[1]; // Get the second class as category

            if (category === undefined) {
                // Show all words and shuffle them for "전체"
                shuffleWords();
                displayWords('전체');
            } else {
                displayWords(category);
            }
        });
    });

    // Add event listener for the search input
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        words.forEach(word => {
            const text = word.getAttribute('data-text').toLowerCase();
            if (text.includes(searchTerm)) {
                word.style.display = 'inline-block'; // Show the word if it matches the search term
            } else {
                word.style.display = 'none'; // Hide the word if it doesn't match the search term
            }
        });
    });
    
    overlay.addEventListener('click', () => {
        rightBox.classList.remove('active');
        overlay.classList.remove('active');
    });
});




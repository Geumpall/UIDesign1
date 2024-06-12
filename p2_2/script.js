document.addEventListener('DOMContentLoaded', () => {
    const colorMapping = {
        category1: 'red', // 문학
        category2: 'blue', // 과학
        category3: 'green', // 인문
        category4: 'orange' // 수필, 에세이
        // 필요한 만큼 카테고리와 색상을 추가
    };

    // 요소 선택
    const fragmentsContainer = document.querySelector('.fragments');
    const words = Array.from(document.querySelectorAll('.word'));
    const overlay = document.querySelector('#overlay');
    const rightBox = document.querySelector('.rightBox');

    // 단어 섞기 함수
    const shuffleWords = () => {
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }
    };

    // 카테고리별 단어 표시 함수
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
                // word.style.setProperty('--color', colorMapping[wordCategory]);
            }

            word.addEventListener('click', () => {
                const text = word.getAttribute('data-text');
                const author = word.getAttribute('data-author');
                const title = word.getAttribute('data-title');
                const publisher = word.getAttribute('data-publisher');
                const categoryColor = colorMapping[wordCategory];

                // rightBox에 텍스트 설정
                document.querySelector('#rightBox').textContent = text;
                document.querySelector('#authorText').textContent = `${author}`;
                document.querySelector('#titleText').textContent = `${title}`;
                document.querySelector('#publisherText').textContent = `${publisher}`;
                
                // rightBox의 배경을 불투명하게 설정
                rightBox.style.backgroundColor = 'white'; // 불투명한 배경
                rightBox.style.background = `linear-gradient(90deg, ${categoryColor} 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,1) 100%)`;

                // rightBox와 overlay를 활성화
                if (window.innerWidth < 1247) {
                    rightBox.classList.add('active');
                    overlay.classList.add('active');
                }
            });
        });
    };

    // 초기 셔플 및 전체 단어 표시
    shuffleWords();
    displayWords('전체');

    // 카테고리 버튼에 이벤트 리스너 추가
    const categoryButtons = document.querySelectorAll('.categoryButton');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.classList[1]; // 두 번째 클래스를 카테고리로 가져옴
            if (category === undefined) {
                shuffleWords();
                displayWords('전체');
            } else {
                displayWords(category);
            }
        });
    });

    // 검색 입력에 이벤트 리스너 추가
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        words.forEach(word => {
            const text = word.getAttribute('data-text').toLowerCase();
            if (text.includes(searchTerm)) {
                word.style.display = 'inline-block';
            } else {
                word.style.display = 'none';
            }
        });
    });
    
    // overlay 클릭 시 비활성화
    overlay.addEventListener('click', () => {
        rightBox.classList.remove('active');
        overlay.classList.remove('active');
    });
});

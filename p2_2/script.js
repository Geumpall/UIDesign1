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
                word.style.setProperty('--color', colorMapping[wordCategory]);
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
    

    // HTML 요소를 찾기
const searchInputDesktop = document.querySelector('.header .menu #searchInput');
const searchInputMobile = document.querySelector('.header_mobile .menu_mobile #searchInput');

// 검색 이벤트 리스너 함수 정의
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const fragments = document.querySelectorAll('.fragments .word');

    fragments.forEach(fragment => {
        const text = fragment.dataset.text.toLowerCase();
        const author = fragment.dataset.author.toLowerCase();
        const title = fragment.dataset.title.toLowerCase();
        const publisher = fragment.dataset.publisher.toLowerCase();
        
        // 검색어와 일치하는 항목을 찾기
        if (text.includes(query) || author.includes(query) || title.includes(query) || publisher.includes(query)) {
            fragment.style.display = 'block'; // 일치하면 보이기
        } else {
            fragment.style.display = 'none'; // 일치하지 않으면 숨기기
        }
    });
}

// 두 검색 필드에 이벤트 리스너 추가
if (searchInputDesktop) {
    searchInputDesktop.addEventListener('input', handleSearch);
}
if (searchInputMobile) {
    searchInputMobile.addEventListener('input', handleSearch);
}

// 반응형으로 이벤트 리스너를 조정하는 함수
function adjustEventListeners() {
    if (window.innerWidth <= 600) {
        // 모바일 뷰에서 동작
        if (searchInputMobile) {
            searchInputMobile.addEventListener('input', handleSearch);
        }
    } else {
        // 데스크탑 뷰에서 동작
        if (searchInputDesktop) {
            searchInputDesktop.addEventListener('input', handleSearch);
        }
    }
}

// 초기 호출
adjustEventListeners();

// 창 크기 변경 시 이벤트 리스너 조정
window.addEventListener('resize', adjustEventListeners);



    
    // overlay 클릭 시 비활성화
    overlay.addEventListener('click', () => {
        rightBox.classList.remove('active');
        overlay.classList.remove('active');
    });
});

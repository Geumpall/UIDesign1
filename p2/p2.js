document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('svgContainer');
    const popupOverlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');
    const popupLink = document.getElementById('popup-link');
    let existingPolygons = JSON.parse(localStorage.getItem('polygons')) || [];
    let linksCopy = [];

    // 특정 색상 세트
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33F3'];

    // 링크 배열
    const links = [
        'https://example.com/link1',
        'https://example.com/link2',
        'https://example.com/link3',
        'https://example.com/link4',
        'https://example.com/link5',
        'https://example.com/link6',
        'https://example.com/link7',
        'https://example.com/link8',
        'https://example.com/link9',
        'https://example.com/link10',
        'https://example.com/link11',
        'https://example.com/link12',
        'https://example.com/link13',
        'https://example.com/link14',
        'https://example.com/link15',
        'https://example.com/link16',
        'https://example.com/link17',
        'https://example.com/link18',
        'https://example.com/link19',
        'https://example.com/link20'
    ];

    // 복사본 생성
    linksCopy = [...links];

    // 랜덤 색상 선택기
    function getRandomColor() {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    // 랜덤 좌표 생성기 (화면 내에서 무작위 좌표 생성)
    function getRandomCoordinate(max) {
        return Math.floor(Math.random() * max);
    }

    // 랜덤 다각형 경로 생성기
    function getRandomPolygonPoints(centerX, centerY, numPoints) {
        const points = [];
        const radius = 50; // 폴리곤의 반지름

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) + getRandomCoordinate(30) - 15;
            const y = centerY + radius * Math.sin(angle) + getRandomCoordinate(30) - 15;
            points.push(`${x},${y}`);
        }

        return points.join(' ');
    }

    // 도형의 위치를 조정하여 화면 내에 위치하도록 하는 함수
    function adjustPositionIfNeeded(centerX, centerY) {
        const radius = 100; // 도형의 반지름

        // 도형의 좌상단, 우하단 좌표 계산
        const minX = centerX - radius;
        const minY = centerY - radius;
        const maxX = centerX + radius;
        const maxY = centerY + radius;

        // 화면 내에 위치하도록 조정
        if (minX < 0) centerX -= minX;
        if (minY < 0) centerY -= minY;
        if (maxX > svgContainer.clientWidth) centerX -= (maxX - svgContainer.clientWidth);
        if (maxY > svgContainer.clientHeight) centerY -= (maxY - svgContainer.clientHeight);

        return { centerX, centerY };
    }

    // 도형이 다른 도형과 겹치는지 확인하는 함수
    function isOverlapping(x, y) {
        for (const polygon of existingPolygons) {
            const distance = Math.sqrt((polygon.centerX - x) ** 2 + (polygon.centerY - y) ** 2);
            if (distance < 100) { // 도형 간의 최소 간격은 100 픽셀로 설정
                return true;
            }
        }
        return false;
    }

    // 랜덤 다각형 추가
    function addRandomPolygon() {
        let centerX, centerY;
        let isOverlap = true;

        // 겹치지 않는 위치를 찾을 때까지 반복
        while (isOverlap) {
            centerX = getRandomCoordinate(svgContainer.clientWidth);
            centerY = getRandomCoordinate(svgContainer.clientHeight);
            isOverlap = isOverlapping(centerX, centerY);
        }

        // 도형의 위치 조정
        const adjustedPosition = adjustPositionIfNeeded(centerX, centerY);
        centerX = adjustedPosition.centerX;
        centerY = adjustedPosition.centerY;

        // 도형 정보 저장
        const color = getRandomColor();
        const numPoints = 5 + Math.floor(Math.random() * 5); // 5~9개의 점으로 구성된 폴리곤
        const points = getRandomPolygonPoints(centerX, centerY, numPoints);
        const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        newElement.setAttribute('points', points);
        newElement.style.setProperty('--color', color);
        newElement.setAttribute('data-link', linksCopy.splice(Math.floor(Math.random() * linksCopy.length), 1)[0]);

        // 클릭 이벤트 추가
        newElement.addEventListener('click', (event) => {
            const link = event.target.getAttribute('data-link');
            popupLink.href = link;
            popupLink.textContent = link;
            popupOverlay.style.display = 'block';
            popup.style.display = 'block';
        });

        svgContainer.appendChild(newElement);
    }

    // 페이지 로드 시 랜덤 다각형 추가
    for (let i = 0; i < 20; i++) {
        addRandomPolygon();
    }

    // H1 클릭 시 도형들 다시 랜덤하게 생성
    const h1Element = document.querySelector('h1');
    h1Element.addEventListener('click', () => {
        // 기존 도형들 제거
        svgContainer.innerHTML = '';
        linksCopy = [...links]; // 링크 배열 복원

        // 새로운 도형들 추가
        for (let i = 0; i < 20; i++) {
            addRandomPolygon();
        }

        // 변경된 도형 정보를 로컬 스토리지에 저장
        localStorage.setItem('polygons', JSON.stringify(existingPolygons));
    });

    // 팝업 닫기
    popupClose.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
        popup.style.display = 'none';
    });

    // 팝업 오버레이 클릭 시 닫기
    popupOverlay.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
        popup.style.display = 'none';
    });
});

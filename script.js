document.querySelector('#language').addEventListener('click', function() {
    document.getElementsByTagName('body')[0].classList.toggle('kor');
    document.getElementsByTagName('h1')[0].classList.toggle('kor');
    document.getElementsByTagName('H2')[0].classList.toggle('kor');
    document.getElementsByTagName('ul')[0].classList.toggle('kor');
    document.getElementsByTagName('p')[0].classList.toggle('kor');
});
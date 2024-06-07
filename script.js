document.querySelector('#darkmode').addEventListener('click', function() {
    document.getElementsByTagName('body')[0].classList.toggle('dark');
    document.getElementsByTagName('h1')[0].classList.toggle('dark');
    document.getElementsByTagName('H2')[0].classList.toggle('dark');
    document.getElementsByTagName('ul')[0].classList.toggle('dark');
    document.getElementsByTagName('p')[0].classList.toggle('dark');
});
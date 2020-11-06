// header opacity
window.addEventListener('scroll', function() {
    if (window.innerWidth > 425) {
        if (window.pageYOffset >= 50) {
            document.querySelector('.header').style.background = '#1e1e1e';
        } else {
            document.querySelector('.header').style.background = 'none';
        }
    }
});

// searching func
document.querySelector('#search').addEventListener('input', function() {
    for (i = 0; i < document.querySelector('.rec-list').getElementsByClassName('rec-list__item').length; i++) {
        if (i != 0) {
            item = document.querySelector('.rec-list').getElementsByClassName('rec-list__item')[i];
            txtValue = item.textContent || item.innerText;
            if (txtValue.toUpperCase().indexOf(document.querySelector('#search').value.toUpperCase()) > -1) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    }
});
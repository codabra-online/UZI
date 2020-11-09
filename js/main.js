// data fetching func
window.onload = function() {
    fetch('https://hook.integromat.com/p6yr2nhayn6pjhw3qzb0mexhw0jcl7ub')
    .then((resp) => resp.json())
    .then(function(data) {
        return data.map(function(prtc) {
            let block = document.createElement('div'),
                link = document.createElement('a'),
                name = document.createElement('p'),
                timestamp = document.createElement('p');

            block.className = 'rec-list__item';
            link.setAttribute('href', prtc.webViewLink);
            name.textContent = prtc.name;
            timestamp.textContent = new Date(prtc.modifiedTime).toLocaleString('ru', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            document.querySelector('.rec-list').appendChild(block);
            block.appendChild(link);
            link.appendChild(name);
            block.appendChild(timestamp);
        })
    })
}

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

// turning off the loader
document.addEventListener("DOMNodeInserted", function() { 
    document.querySelector('.header').style.display = 'flex';
    document.querySelector('.loader').style.animation = '.65s ease-in fade';
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = 0;
        document.querySelector('.loader').style.display = 'none';
    }, 650);
});

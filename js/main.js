var clicked = 0;

// refresh delay initializing
var refresh = setInterval(Refresh, (document.title == "Выбор протокола") ? 60000 : 15000);

// webhook urls for both pages
const hooks = [
    "https://hook.integromat.com/5y4awjulioas6l7nl7xnoqn5ot471nx6", 
    "https://hook.integromat.com/fhgddqrvj572ve4kot9rl01mr9fbwl4b"
];

// a bit of "on load cfg"
window.onload = function() {
    document.querySelector(".header").style.background = "none";
    Fetch();
}

// json fetching func
function Fetch() {
    fetch((document.title == "Выбор протокола") ? hooks[0] : hooks[1])
    .then((resp) => resp.json())
    .then(function(data) {
        return data.map(function(prtc) {
            let block = document.createElement("div"),
                link = document.createElement("a"),
                name = document.createElement("p"),
                timestamp = document.createElement("p");

            block.className = "rec-list__item";
            link.setAttribute("href", prtc.webViewLink);
            name.textContent = prtc.name;
            if (document.title == "Выбор протокола") {
                timestamp.textContent = new Date(prtc.modifiedTime).toLocaleString("ru", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            } else {
                timestamp.textContent = new Date(prtc.createdTime).toLocaleString("ru", {
                    hour: "numeric",
                    minute: "numeric",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            }

            document.querySelector(".rec-list").appendChild(block);
            block.appendChild(link);
            link.appendChild(name);
            block.appendChild(timestamp);
        })
    })
    .catch(function() {
        // error message
        for (i = 0; i < document.querySelector(".rec-list").getElementsByClassName("rec-list__item").length; i++) { document.querySelector(".rec-list").getElementsByClassName("rec-list__item")[i].style.display = "none"; }
        document.querySelector(".rec-list").style.display = "flex";
        document.querySelector(".rec-list__message").style.display = "block";
    });
}

function Refresh() {
    clearInterval(refresh); refresh = setInterval(Refresh, (document.title == "Выбор протокола") ? 60000 : 15000);
    for (i = document.querySelector(".rec-list").getElementsByClassName("rec-list__item").length - 1; i != 0; i--) { 
        document.querySelector(".rec-list").getElementsByClassName("rec-list__item")[i].remove();
    }
    Fetch();
}

// searching func
function Search() {
    for (i = 0; i < document.querySelector(".rec-list").getElementsByClassName("rec-list__item").length; i++) {
        if (i > 0) {
            let item = document.querySelector(".rec-list").getElementsByClassName("rec-list__item")[i];
            let txtValue = item.firstChild.textContent || item.firstChild.innerText;
            if (txtValue.toUpperCase().indexOf(document.querySelector(".search").value.toUpperCase()) > -1) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        }
    }
}

// header opacity
window.addEventListener("scroll", function() {
    // this feature turns off on mobile devices
    if (window.innerWidth > 425) {
        if (window.pageYOffset >= 50) {
            document.querySelector(".header").style.background = "#1e1e1e";
        } else {
            document.querySelector(".header").style.background = "none";
        }
    }
});

// searching on input
document.querySelector(".search").addEventListener("input", Search);

// icon rotate on click & refresh
if (document.title == "Архив") {
    document.querySelector(".refresh").addEventListener("click", function() {
        clicked += 1; document.querySelector(".refresh img").style.transform = `rotate(${180 * clicked}deg)`;
        Refresh();
    });
}

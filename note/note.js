let existlogin_string = localStorage.getItem("chat_login")
let existlogin = JSON.parse(existlogin_string);

document.getElementById("welict").innerText = "(You) " + existlogin.name;

var btnsend = document.getElementById("btnsend");
btnsend.onclick = btnsendClicked;
function btnsendClicked() {

    let text = document.getElementById("entertext").value;

    let all_textstorage = [];
    let textstorage_string = localStorage.getItem("all_textstorage" + existlogin.username);
    if (textstorage_string) {
        all_textstorage = JSON.parse(textstorage_string);
    }
    let storage = {
        "text": text
    }

    all_textstorage.push(storage);

    let textstorage_new_string = JSON.stringify(all_textstorage);
    localStorage.setItem("all_textstorage" + existlogin.username, textstorage_new_string);
    location.reload();
    return;
}

notediv();

function notediv() {
    let all_textstorage = [];
    let textstorage_string = localStorage.getItem("all_textstorage" + existlogin.username);
    if (textstorage_string) {
        all_textstorage = JSON.parse(textstorage_string);
    }

    all_textstorage.forEach(element => {
        document.getElementById("whatdiv").innerHTML +=

            `<div class="note">${element.text} </div>`
    }
    );
}



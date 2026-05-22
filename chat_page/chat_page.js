const firebaseConfig = {
    apiKey: "AIzaSyApKknY-D0kGVUMsJN49-EGWMGoud3fkxU",
    authDomain: "jafnotetaker.firebaseapp.com",
    databaseURL: "https://jafnotetaker-default-rtdb.firebaseio.com",
    projectId: "jafnotetaker",
    storageBucket: "jafnotetaker.firebasestorage.app",
    messagingSenderId: "358906213446",
    appId: "1:358906213446:web:41a84366128d299fc88647",
    measurementId: "G-E7LN2ZZWX9"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let chat_login;
db.ref("chat_login").get().then((snapshot) => {
    chat_login = snapshot.val();
});

let chat_username;
db.ref("chat_username").get().then((snapshot) => {
    chat_username = snapshot.val();
    document.getElementById("welict").innerText = "Chat with: " + chat_username;
});


let storage_key = "all_chat";

var btnsend = document.getElementById("btnsend");
btnsend.onclick = btnsendClicked;
function btnsendClicked() {
    let text = document.getElementById("entertext").value;

    let all_textstorage = [];
    //let textstorage_string = localStorage.getItem(storage_key);
    db.ref(storage_key).get().then((snapshot) => {
        let textstorage_string = snapshot.val();
        if (textstorage_string) {
            all_textstorage = JSON.parse(textstorage_string);
        }

        const now = new Date();
        const formatted_date_time = now.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }); // Apr 08, 2026, 02:35 pm

        let storage = {
            "sender_name": chat_login.name,
            "date_time": formatted_date_time,
            "receiver_username": chat_username,
            "sender_username": chat_login.username,
            "message": text
        };

        all_textstorage.push(storage);

        let textstorage_new_string = JSON.stringify(all_textstorage);
        //localStorage.setItem(storage_key, textstorage_new_string);
        db.ref(storage_key).set(textstorage_new_string);
        location.reload();
    });
}

notediv();

function notediv() {
    let all_chatstorage = [];
    //let chatstorage_string = localStorage.getItem(storage_key);
    //db.ref(storage_key).get().then((snapshot) => {  });
    db.ref(storage_key).get().then((snapshot) => {
        let chatstorage_string = snapshot.val();

        if (chatstorage_string) {
            all_chatstorage = JSON.parse(chatstorage_string);
        }

        document.getElementById("whatdiv").innerHTML = '';

        all_chatstorage.forEach(chat => {
            if (chat.sender_username == chat_login.username) {
                document.getElementById("whatdiv").innerHTML +=
                    ` <div class="sender_chat"> 
                <span class="message">${chat.message} </span>
                <span class="datetime">${chat.date_time} </span>
            </div>`
            } else {
                document.getElementById("whatdiv").innerHTML +=
                    `<div class="receiver_chat">
                <span class="sendername">${chat.sender_name} </span>
                <span class="message">${chat.message} </span>
                <span class="datetime">${chat.date_time} </span>
            </div>`
            }
        });
    });
}



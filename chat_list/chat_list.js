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


let existlogin;
db.ref("chat_login").get().then((snapshot) => {
    existlogin = snapshot.val();
    existlogin = JSON.parse(existlogin);

    document.getElementById("welict").innerText =
        "(You) " + existlogin.name;

    LoadAllUsers();
});

function LoadAllUsers() {
    db.ref("chat_registers").get().then((snapshot) => {
        let chat_registers =  snapshot.val() || []; //if database is empty, use [] 
        if (typeof chat_registers === "string") {
            chat_registers = JSON.parse(chat_registers);
        }

        chat_registers.forEach(user => {
            if (user.username != existlogin.username) {
                document.getElementById("whatdiv").innerHTML +=
                    `<div class="note" 
                    onclick="gotoChat('${user.username}');">
                    ${user.name} 
                       </div>`
            }
        });
    });
}


function gotoChat(username) {
    db.ref("chat_username").set(username).then(() => {
        location.href =  "../chat_page/chat_page.html";
    });
}

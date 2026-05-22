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



function btnlogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === '' || password === '') {
        alert("please enter your name or username before you login")
        return;
    }

    db.ref("chat_registers").get().then(snapshot => {
        let all_register_string = snapshot.val();
        if (all_register_string) {
            all_registers = JSON.parse(all_register_string);
        }

        let existlogin = all_registers.find(user => user.username === username && user.password === password)
        if (existlogin) {
            let existlogin_string = JSON.stringify(existlogin);

            db.ref("chat_login").set(existlogin_string)
                .then(() => {
                    alert("Login successful");
                    location.href = "../chat_list/chat_list.html"
                });

        } else {
            alert("Incorrect username or password");
        }
    }).catch((error) => {
        console.log(error);
        alert("Something went wrong");
    });

 
}
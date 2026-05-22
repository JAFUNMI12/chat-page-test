//USING FIREBASE
// Firebase config, init, and database just ONCE
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




function btnregister() {
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (name === '' || username === '' || password === '') {
        alert("please fill all form before you sunmit")
        return;
    }

    let all_registers = [];
    ////LOCAL STORAGE
    //let all_register_string = localStorage.getItem("chat_registers");
    // if (all_register_string) {
    //     all_registers = JSON.parse(all_register_string);
    // }
    ////ONLINE STORAGE
    db.ref("chat_registers").get().then(snapshot => {
        let all_register_string = snapshot.val();
        if (all_register_string) {
            all_registers = JSON.parse(all_register_string);
        }

        //CHECKING AND SAVING NEW RECORD
        let existsuser = all_registers.find(user => username === user.username)
        if (existsuser) {
            alert("username already exists")
            return;
        }

        let user_info = {
            "name": name,
            "username": username,
            "password": password
        }
        all_registers.push(user_info);
        let new_register_string = JSON.stringify(all_registers);

        ////LOCAL STORAGE 
        // localStorage.setItem("chat_registers", new_register_string);
        ////ONLINE STORAGE
        db.ref("chat_registers").set(new_register_string)
            .then(() => {
                alert("register successful");
                location.href = "../login/login.html"
            })
            .catch((error) => {
                alert("Error saving data:", error);
            });
    });
}
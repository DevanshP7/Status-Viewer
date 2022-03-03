// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCzPKRnvV5ckB1XEZeTV54m_9D15GNj6aY",
    authDomain: "status-viewer-143e0.firebaseapp.com",
    databaseURL: "https://status-viewer-143e0-default-rtdb.firebaseio.com",
    projectId: "status-viewer-143e0",
    storageBucket: "status-viewer-143e0.appspot.com",
    messagingSenderId: "182166520838",
    appId: "1:182166520838:web:1d27004ae7310847a12f87"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function add_room(){

    user_name=document.getElementById('user_name_input').value;
    room_name=document.getElementById('room_name_input').value;

    if (user_name == '' && room_name == '') {window.alert('Access Denied! User Input & Room Input Empty!');}

    else if(user_name == '') {window.alert('Access Denied! User Input Empty!');}
    else if(room_name == '') {window.alert('Access Denied! Room Input Empty!');}
    else {

        localStorage.setItem('user_name', user_name);
        localStorage.setItem('room_name', room_name);

        firebase.database().ref("/").child(room_name).update({
            purpose:'adding room name'
        });

        window.location = 'room.html';
    }
}

getData();

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("rooms").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
    
    Room_names = childKey;
    
    console.log(`room name : ${Room_names}`);

    row = `<div class="room_name" id=${Room_names}>${Room_names}</div><hr>`;
    document.getElementById("rooms").innerHTML += row;

        });

    });

}
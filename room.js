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

user_name = localStorage.getItem('user_name');
room_name = localStorage.getItem('room_name');

document.getElementById('user_name_display').innerHTML = `Welcome ${user_name}!`;
document.getElementById('room_name_display').innerHTML = room_name;

function logoout(){

    localStorage.removeItem('user_name');
    localStorage.removeItem('room_name');

    window.location.replace('index.html');
}

function upodate_status(){

    status_font=document.getElementById('status_font').value;
    status_text=document.getElementById('status_input').value;
    status_background=document.getElementById('status_background').value;
    status_colour=document.getElementById('status_color').value;

    firebase.database().ref(room_name).push({
        
        user:user_name,
        color:status_colour,
        font:status_font,
        background:status_background,
        text:status_text

    });

    status_background='blue';
    status_colour='pink';
    status_font='monospace';
    status_text='Hello!';

    document.getElementById('status_font').value='';
    document.getElementById('status_input').value='';
    document.getElementById('status_color').value='';
    document.getElementById('status_background').value='';
        
}

status_background='blue';
status_colour='pink';
status_font='monospace';
status_text='Hello!';

function getData(){firebase.database().ref("/"+room_name).on('value',function(snapshot){document.getElementById("output").innerHTML="";snapshot.forEach(function(childSnapshot){childKey=childSnapshot.key;childData=childSnapshot.val();if(childKey!="purpose"){
    firebase_message_id=childKey;
    message_data=childData;
    console.log(firebase_message_id);
    console.log(message_data);

    actual_color=message_data['color'];
    actual_font=message_data['font'];
    actual_background=message_data['background'];
    actual_text=message_data['text'];
    actual_user=message_data['user'];

    console.log(actual_font);
    console.log(actual_text);
    console.log(actual_background);
    console.log(actual_color);
    console.log(actual_user);

    set_inner_html();
            }  
        });
    }); 
}

getData();

function set_inner_html(){
    document.getElementById('output').innerHTML +=`<div id="contain"><div id="final_status" style="color:${actual_color};background-color:${actual_background};font-family:${actual_font}" class="col-lg 4 col-md 6 col-sm 10 col-xs 12">${actual_text}</div><br><h4 style="font-family:${actual_font};">From ${actual_user}</h4></div>`;
}
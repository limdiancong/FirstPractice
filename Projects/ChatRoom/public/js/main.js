const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const roomUser = document.getElementById('users');


//get user and roomo from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

const socket = io(); // this link to tha tag at chat.html

//join chat room
socket.emit('joinRoom', { username, room });

//get room users 
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);

});

//message from server 
socket.on('message', message => {
  //message is from server.js emmiting 
  console.log(message);
  outputMessage(message);

  //scroll down eveyr new message 
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//messsage submit by user
chatForm.addEventListener('submit', (e) => {
  e.preventDefault(); //because when submit form, it will send to a folder. so this prevent 

  const msg = e.target.elements.msg.value; //take from the from 

  socket.emit('chatMessage', msg); //emiting message to server 

  //clear input 
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
})

//output message to dom 
function outputMessage(message) {
  //create to add on the html 
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);

  //append the div to the html every time 
}

//ADD ROOM nameto dom
function outputRoomName(room) {
  roomName.innerText = room;
}
//add room users to dom
function outputUsers(users) {
  roomUser.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}
`;

}
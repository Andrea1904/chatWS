const socket=io();
let user;
let chatBox= document.getElementById("chatBox")

Swal.fire({
    tittle: "Bienvenido a nuestro chat !! ",
    input: "text",
    text: "Ingresa por favor tu nombre:",
    inputValidator: (value)=>{
        return !value && "Se requiere un nombre para continuar!!"
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value
})

chatBox.addEventListener('keyup',evt=>{
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{user:user,message:chatBox.value});
            chatBox.value="";
        }
    }
})

socket.on('messageLogs',data=>{
    let log = document.getElementById('messageLogs');
    let messages="";
    data.forEach(message => {
        messages=messages+ `${message.user} dice : ${message.message}  </br>`       
    });
    log.innerHTML =messages
})

socket.on('newUserConnected',data=>{
    if(!user) return;
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast:true,
        position: 'top-right'
         })
})

// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lolOffline');
const txMensaje = document.querySelector('#txMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', ()=> {
  //console.log('conectado');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', ()=> {
  //console.log('Desconectado del servidor');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) =>{
  console.log(payload);
})

btnEnviar.addEventListener('click', ()=> {
  const mensaje = txMensaje.value;
  const payload = {
    mensaje,
    id: '1234',
    fecha: new Date().getTime()
  };
  
  socket.emit('enviar-mensaje', payload, (id) => {
    console.log('Desde el server', id);
  });
})
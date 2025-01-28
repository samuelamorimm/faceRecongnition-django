const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const captureButton = document.getElementById('capture-button')
const loginForm = document.getElementById('login-form')
const messageDiv = document.getElementById('message')

let capturedImage = null

navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
  video.srcObject = stream
}).catch((err) => {
  console.log("Erro ao acessar camera")
  messageDiv.innerHTML = "Erro ao acessar camera"
})

captureButton.addEventListener('click', ()=>{
  if (!video.srcObject){
    messageDiv.innerHTML = "Por favor, Habilite sua câmera!"
  }
  const context = canvas.getContext("2d")
  context.drawImage(video, 0,0, canvas.width, canvas.height)
  capturedImage = canvas.toDataURL('image/jpeg')
  messageDiv.innerHTML='Captura Facial realizada com sucesso!'
})

loginForm.onsubmit = async (e) => {
e.preventDefault();

if (!capturedImage) {
  messageDiv.innerHTML = "Por favor, capture uma imagem antes de tentar fazer login.";
  return;
}

const formData = new FormData();
formData.append('username', document.getElementById('username').value);
formData.append('face_image', capturedImage);

try {
  const response = await fetch('/login_face/', {
    method: 'POST',
    body: formData,
  });

  // Verifique se a resposta HTTP não está OK
  if (!response.ok) {
    throw new Error('Erro na requisição ao servidor.');
  }

  // Tente processar os dados retornados
  const data = await response.json();

  // Checar o status retornado pela API
  if (data.status === 'success') {
    messageDiv.innerText = data.message || 'Login realizado com sucesso!';
  } else {
    messageDiv.innerText = data.message || 'Falha no login. Por favor, tente novamente.';
  }
} catch (error) {
  console.error('Erro:', error);
  messageDiv.innerText = 'Ocorreu um erro ao processar seu login. Tente novamente mais tarde.';
}
};
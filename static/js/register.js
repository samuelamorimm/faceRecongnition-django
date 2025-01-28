
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const captureButton = document.getElementById('capture-button')
const registerForm = document.getElementById('register-form')
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

registerForm.onsubmit = async (e) => {
  e.preventDefault()

  if(!capturedImage){
    messageDiv.innerHTML = "Please capture a face"
    return
  }

  const formData = new FormData(registerForm)
  formData.append('face_image', capturedImage)

  try {
    const response = await fetch('/register_face/', {
      method : 'POST',
      body : formData
    });

    if (!response.ok) {
    throw new Error('Erro na requisição ao servidor.');}

    const data = await response.json();

    if (data.status === 'success') {
    messageDiv.innerText = data.message || 'Registro realizado com sucesso!';
  } else {
    messageDiv.innerText = data.message || 'Falha no Registro. Por favor, tente novamente.';
  }
  
  } catch (error) {
  console.error('Erro:', error);
  messageDiv.innerText = 'Ocorreu um erro ao processar seu Registro. Tente novamente mais tarde.';
}


  
  messageDiv.innerText = data.mediaDevices || 'Registro falho'

};

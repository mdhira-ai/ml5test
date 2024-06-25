import { status, train } from "./training"


let btn = document.getElementById('run')


btn.addEventListener('click', () => {

  status.innerHTML = 'starting...'
  setTimeout(() => {
    train(input.value)

  },1000)


})
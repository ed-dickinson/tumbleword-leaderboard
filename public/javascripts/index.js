const password_form = document.querySelector('#password-form')
const score_form = document.querySelector('#post-form')

document.querySelector('#password-button').addEventListener('click', (event) => {
  event.preventDefault()
  let entered_password = document.querySelector('#access-password').value
  if (entered_password = 'jenny') {
    password_form.classList.add('hidden')
    score_form.classList.remove('hidden')
  }
});

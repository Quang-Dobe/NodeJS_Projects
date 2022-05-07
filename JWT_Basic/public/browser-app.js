const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  tokenDOM.classList.remove('text-success')

  e.preventDefault()
  // The thread:
  // When clicking "Submit" button:
  // If we don't provide "username" or "password", in client-side, localStorage will delete the last token (if it exists)
  // If we provide, in sever-side, Json Web Token will code the provided information ("username", not include "password")
  //      and an ID (based on today's day), using default algorithm which sever defined (HS256).
  //      Then, sever sends back response with that token. In client-side, localStorage will save that token
  const username = usernameInputDOM.value
  const password = passwordInputDOM.value

  try {
    const { data } = await axios.post('/api/v1/login', { username, password })

    formAlertDOM.style.display = 'block'
    formAlertDOM . textContent  =  data . msg

    formAlertDOM.classList.add('text-success')
    usernameInputDOM.value = ''
    passwordInputDOM.value = ''

    localStorage.setItem('token', data.token)
    resultDOM . innerHTML  =  ''
    tokenDOM . textContent  =  'token present'
    tokenDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM . textContent  =  error . response . data . msg
    localStorage.removeItem('token')
    resultDOM . innerHTML  =  ''
    tokenDOM . textContent  =  'no token present'
    tokenDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  } ,  2000 )
} )

btnDOM.addEventListener('click', async () => {
  // The thread:
  // When we click "Get Data" button, we will take the token which is saved in "localStorage"
  // If the token is null or not, it always add "Authorization: Bearer <token>"
  // Then, the req will be checked in "auth.js"
  // If the token exists, token is decoded, set "req.user" is an object (contains "id" and "username")
  //      If decoding token step is failed, it returns "unAuthenticatedError" with StatusCodes.UNAUTHORIZED)
  // Else if the token doesn't exist ('null' or 'Bearer null'), it still returns "unAuthenticatedError" with StatusCodes.UNAUTHORIZED)
  // No errors -> Jump to "dashboard", get a random number and show that number to user
  const  token  =  localStorage . getItem ( 'token' )
  try {
    // There is something which is unnecessary here. It's always putting "Authorization" despite token is null or not
    const { data } = await axios.get('/api/v1/dashboard', {
      // This is always done first, then it comes to "route.get('/api/v1/dashboard')" ("auth.js" next and "dashboard" finaly)
      headers: {
        Authorization: `Bearer ${token}`,
      } ,
    } )
    resultDOM.innerHTML = `<h5>${data["Message"]}</h5><p>${data["Secret"]}</p>`

    data["Secret"]
  } catch (error) {
    localStorage.removeItem('token')
    resultDOM.innerHTML = `<p>${error.response.data.Message}</p>`
  }
} )

const checkToken = () => {
  tokenDOM.classList.remove('text-success')

  const  token  =  localStorage . getItem ( 'token' )
  if (token) {
    tokenDOM . textContent  =  'token present'
    tokenDOM.classList.add('text-success')
  }
}
checkToken ( )
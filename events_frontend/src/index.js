const userEndPoint = 'http://localhost:3000/api/v1/users';
const BASEURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey='
const APIKEY = 'tSqmpxsVdaylI75DcdQTKHYNGTGddSG1'
const endPoint = 'http://localhost:3000/api/v1/events';
document.addEventListener('DOMContentLoaded', () => {
  getLoginInfo()
})


function getLoginInfo() {
  let loginButton = document.getElementById('login')
  loginButton.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    // let currentUser = localStorage.setItem('username': username)
    let data = {
      'username': username,
      'email': email
    }
    postUser(data)

  })
}

function postUser(data) {
    fetch(userEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    toggleVisibility('search')
    toggleVisibility('login')
    getUserInput()
    let loginDiv = document.getElementById('login')
    let form = document.getElementById('loginForm')
    form.style.display = "none"
  }

function getUserInput() {
  let form = document.getElementById('searchForm')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let keyword = document.getElementById('keyword').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    // console.log(keyword)
    // console.log(city)
    // console.log(state)
    getSearchData(keyword, city, state)
  })
}

function getSearchData(keyword, city, state) {
  // need to update keyword for mulitple words
  let keywordSearch = `&keyword=${keyword}`
  let citySearch = `&city=${city}`
  let stateSearch =`&stateCode=${state}`
  console.log(BASEURL + APIKEY + citySearch + keywordSearch + stateSearch)
  fetch(BASEURL + APIKEY + keywordSearch + citySearch + stateSearch)
  .then(response => response.json())
  .then(json => {
    clearData()
    json._embedded.events.forEach((event => {
      createEventCard(event)
    }))
  })
  .catch(function(error) {
    alert("There were no results for your search query. Please try again.")
  })
}

function clearData() {
  let ul = document.getElementById('ul')
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild)
  }
}

function createEventCard(event) {
    let div = document.getElementById('searchResults')
    div.style.display = 'block'
    let ul = document.getElementById('ul')
    let li = document.createElement('li')


    let h2 = document.createElement('h2')
    h2.textContent = event.name
    h2.addEventListener('click', () => {
      showMore(event)
      toggleVisibility("searchResults")
    })
    let moreInfo = document.createElement('button')
    moreInfo.textContent = "Click Here for More Info"
    moreInfo.addEventListener('click', () => {
      console.log('fire')
      showMore(event)
      toggleVisibility("searchResults")
    })
    let likeButton = document.createElement('button')
    likeButton.textContent = 'Add to Favorites ❤️'
    likeButton.addEventListener('click', () => {
      saveNewFavorite(event)
    })

    let cityState = document.createElement('p')
    let date = document.createElement('p')
    let venue = document.createElement('p')
    cityState.textContent = `Location: ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`
    venue.textContent = `Venue: ${event._embedded.venues[0].name}`
    date.textContent = `Event Date: ${event.dates.start.localDate}`
    let img = document.createElement('img')
    img.src = event.images[0].url
    img.style.width = '200px'
    img.style.height = '125px'
    li.appendChild(h2)
    li.appendChild(img)
    li.appendChild(cityState)
    li.appendChild(venue)
    li.appendChild(date)
    li.appendChild(moreInfo)
    li.appendChild(likeButton)
    ul.appendChild(li)
    div.appendChild(ul)
}

function showMore(event) {

  toggleVisibility('search')


  let div = document.getElementById('showResults')
  let ul = document.getElementById('showUl')
  let h2 = document.createElement('h2')
  let li = document.createElement('li')
  h2.textContent = event.name
  let cityState = document.createElement('p')
  let date = document.createElement('p')
  let venue = document.createElement('p')
  let url = document.createElement('a')
  let start_date = document.createElement('p')
  let start_time = document.createElement('p')
  let segment = document.createElement('p')
  let genre = document.createElement('p')
  url.href = event.url
  url.textContent = `Click Here to Buy Tickets`
  start_date.textContent = `Date of Event: ${event.dates.start.localDate}`
  start_time.textContent = `Time of Event: ${event.dates.start.localTime}`
  segment.textContent = `Type of Event: ${event.classifications[0].segment.name}`
  genre.textContent = `Genre: ${event.classifications[0].genre.name}`,
  cityState.textContent = `Location: ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`
  venue.textContent = `Venue: ${event._embedded.venues[0].name}`
  date.textContent = event.dates.start.localDate
  let img = document.createElement('img')
  img.src = event.images[0].url
  img.style.width = '200px'
  img.style.height = '125px'
  let backButton = document.createElement('button')
  backButton.textContent = "Go Back"
  backButton.addEventListener('click', () => {
    toggleVisibility('search')
    toggleVisibility('searchResults')
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.firstChild)
    }
  })
  let likeButton = document.createElement('button')
  likeButton.textContent = 'Add to Favorites ❤️'
  likeButton.addEventListener('click', () => {
    saveNewFavorite(event)
  })
  li.appendChild(h2)
  li.appendChild(url)
  li.appendChild(cityState)
  li.appendChild(venue)
  // li.appendChild(date)
  li.appendChild(img)
  li.appendChild(start_date)
  li.appendChild(start_time)
  li.appendChild(segment)
  li.appendChild(genre)
  li.appendChild(likeButton)
  li.appendChild(backButton)
  ul.appendChild(li)
  div.appendChild(ul)

}

function saveNewFavorite(event) {
  let data = {
    'name': event.name,
    'url': event.url,
    'image1': event.images[0].url,
    'image2': event.images[1].url,
    'start_date': event.dates.start.localDate,
    'start_time': event.dates.start.localTime,
    'segment': event.classifications[0].segment.name,
    'genre': event.classifications[0].genre.name,
    'venue': event._embedded.venues[0].name,
    'city': event._embedded.venues[0].city.name,
    'state': event._embedded.venues[0].state.stateCode
  }

  fetch(endPoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(data)
  })
}

function toggleVisibility(id) {
  let e = document.getElementById(id)
  if (e.style.display == 'block') {
    e.style.display = 'none'
  } else {
    e.style.display = "block"
  }
  console.log(e.style.display)
}

function clearCurrent(ul) {
  ul.removeChild(ul.firstChild)
}

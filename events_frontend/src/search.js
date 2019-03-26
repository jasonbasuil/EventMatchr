const TICKET = 'https://app.ticketmaster.com/discovery/v2/events?apikey=M53XHNTJAphx1pxc6MAlTskGgcoXqgXy&city=Seattle&countryCode=US'
document.addEventListener('DOMContentLoaded', getSearchData())

function getSearchData() {
  fetch(TICKET)
  .then(response => response.json())
  .then(json => {
    json._embedded.events.forEach((event => {
      createEventCard(event)
    }))
  })
}

function createEventCard(event) {
  let form = document.getElementById('searchForm')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    // console.log('hey')
    let div = document.getElementById('container')
    let ul = document.getElementById('ul')
    let li = document.createElement('li')
    let h2 = document.createElement('h2')
    h2.textContent = event.name
    let p = document.createElement('p')
    p.textContent = "City Name"
    let img = document.createElement('img')
    img.src = event.images[0].url
    li.appendChild(h2)
    li.appendChild(p)
    li.appendChild(img)
    ul.appendChild(li)
    div.appendChild(ul)
  })
}

// <div>
// <form id="searchForm" action="index.html" method="post">
// <label> Event Search </label>
// <input type="text" id="keyword" placeholder="keyword">
// <input type="text" name="city" placeholder="city">
//    <label for="state">State</label>
//       <select id="state" name="state"><option value="---">---</option><option value="Alabama">Alabama</option><option value="Alaska">Alaska</option><option value="Arizona">Arizona</option><option value="Arkansas">Arkansas</option><option value="California">California</option><option value="Colorado">Colorado</option><option value="Connecticut">Connecticut</option><option value="Delaware">Delaware</option><option value="District of Columbia">District of Columbia</option><option value="Florida">Florida</option><option value="Georgia">Georgia</option><option value="Guam">Guam</option><option value="Hawaii">Hawaii</option><option value="Idaho">Idaho</option><option value="Illinois">Illinois</option><option value="Indiana">Indiana</option><option value="Iowa">Iowa</option><option value="Kansas">Kansas</option><option value="Kentucky">Kentucky</option><option value="Louisiana">Louisiana</option><option value="Maine">Maine</option><option value="Maryland">Maryland</option><option value="Massachusetts">Massachusetts</option><option value="Michigan">Michigan</option><option value="Minnesota">Minnesota</option><option value="Mississippi">Mississippi</option><option value="Missouri">Missouri</option><option value="Montana">Montana</option><option value="Nebraska">Nebraska</option><option value="Nevada">Nevada</option><option value="New Hampshire">New Hampshire</option><option value="New Jersey">New Jersey</option><option value="New Mexico">New Mexico</option><option value="New York">New York</option><option value="North Carolina">North Carolina</option><option value="North Dakota">North Dakota</option><option value="Northern Marianas Islands">Northern Marianas Islands</option><option value="Ohio">Ohio</option><option value="Oklahoma">Oklahoma</option><option value="Oregon">Oregon</option><option value="Pennsylvania">Pennsylvania</option><option value="Puerto Rico">Puerto Rico</option><option value="Rhode Island">Rhode Island</option><option value="South Carolina">South Carolina</option><option value="South Dakota">South Dakota</option><option value="Tennessee">Tennessee</option><option value="Texas">Texas</option><option value="Utah">Utah</option><option value="Vermont">Vermont</option><option value="Virginia">Virginia</option><option value="Virgin Islands">Virgin Islands</option><option value="Washington">Washington</option><option value="West Virginia">West Virginia</option><option value="Wisconsin">Wisconsin</option><option value="Wyoming">Wyoming</option>
//       </select>
//       <input type="submit" name="" value="Search">
// </form>
//   <script type="text/javascript" src="src/search.js"></script>
// </div>

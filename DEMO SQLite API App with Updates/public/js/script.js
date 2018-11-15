function songUpdateHandler() {
  //============================
  let song_id = document.getElementById('song_id_field').value
  let song_title = document.getElementById('song_title_field').value
  let song_composer = document.getElementById('song_composer_field').value
  let song_bookcode = document.getElementById('song_bookcode_field').value
  let song_page = document.getElementById('song_page_field').value
  let song_length = document.getElementById('song_length_field').value
  let song_studentnum = document.getElementById('song_studentnum_field').value

  console.log(`Updating song_id: ${song_id}`)
  let url = `/api/song/${song_id}`
  let song_data = {
    id: song_id,
    title: song_title,
    composer: song_composer,
    bookcode: song_bookcode,
    page: song_page,
    length: song_length,
    studentnum: song_studentnum
  }

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
     {"status": "SUCCESS"}
    */
      console.log(`Status: ${response.status}`)
    }
  }
  //send HTTP POST message with JSON data
  xhr.open('POST', url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(song_data)) //send JSON data to server
}

function songSelectHandler(song_id) {
  // =================================
  let songDetailsDiv = document.getElementById('song_details')
  songDetailsDiv.innerHTML = ''
  let url = `/api/song/${song_id}`

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
      {
      "id": 372,
      "title": "Girl From Ipanema, The",
      "composer": "Jobim Antonio-Carlos",
      "key": "F",
      "bars": "[4/4][A]|:  F^7  |  %  |  G7#11  |  %  |  G-7  |]"
      }
      */
      //build and populate song details text input fields
      songDetailsDiv.innerHTML += `<h3><hr>Song Details</h3>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">ID: <input readonly class="details" type="text"  id="song_id_field" value="${response.id}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">TITLE: <input class="details" type="text" id="song_title_field" value="${response.title}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">COMPOSER: <input class="details" type="text" id="song_composer_field" value="${response.composer}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">BOOKCODE: <input class="details" type="text" id="song_bookcode_field" value="${response.bookcode}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">PAGE: <input class="details" type="text" id="song_page_field" value="${response.page}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">LENGTH: <input class="details" type="text" id="song_length_field" value="${response.length}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">STUDENT NUM: <input class="details" type="text" id="song_studentnum_field" value="${response.studentnum}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div></div>`
      songDetailsDiv.innerHTML += `<button id="song_update" onclick="songUpdateHandler()" >Update</button>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function titleSearchHandler() {
  //===============================

  let key = document.getElementById('key').value.trim()
  document.getElementById('key').value = key //replace with trimmed value
  let url = `/api/songs?key=${key}`
  if (key === '') {
    url = `/api/songs`
  }

  let songDiv = document.getElementById('song_data')
  songDiv.innerHTML = ''
  //clear song details div
  let songDetailsDiv = document.getElementById('song_details')
  songDetailsDiv.innerHTML = ''


  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //response is expected to object like: {songs: [ {id: title:},{id: title:},...]}
      songDiv.innerHTML = songDiv.innerHTML + `<h3><hr>Songs matching: ${key} </h3><ul>`
      for (let song of response.songs) {
        songDiv.innerHTML = songDiv.innerHTML + `<li onclick="songSelectHandler(${song.id})">
<font color="blue">${song.id}:  ${song.title}</font></li>`
      }
      songDiv.innerHTML = songDiv.innerHTML + `</ul>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function bookUpdateHandler() {
  //============================
  let book_bookcode = document.getElementById('book_bookcode_field').value
  let book_title = document.getElementById('book_title_field').value
  let book_format = document.getElementById('book_format_field').value
  let book_filename = document.getElementById('book_filename_field').value
  let book_page_offset = document.getElementById('book_page_offset_field').value
  let book_num_pages = document.getElementById('book_num_pages_field').value
 

  console.log(`Updating book_bookcode: ${book_bookcode}`)
  let url = `/api/book/${book_bookcode}`
  let book_data = {
    bookcode: book_bookcode,
    title: book_title,
    format: book_format,
    filename: book_filename,
    page_offset: book_page_offset,
    num_pages: book_num_pages
  }

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
     {"status": "SUCCESS"}
    */
      console.log(`Status: ${response.status}`)
    }
  }
  //send HTTP POST message with JSON data
  xhr.open('POST', url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(book_data)) //send JSON data to server
}

function bookSelectHandler(bookcode) {
  // =================================
  let bookDetailsDiv = document.getElementById('song_details')
  bookDetailsDiv.innerHTML = ''
  let url = `/api/book/${bookcode}`

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      console.log(response)
      /*response is expected to be object like:
      {
      "id": 372,
      "title": "Girl From Ipanema, The",
      "composer": "Jobim Antonio-Carlos",
      "key": "F",
      "bars": "[4/4][A]|:  F^7  |  %  |  G7#11  |  %  |  G-7  |]"
      }
      */
      //build and populate song details text input fields
      bookDetailsDiv.innerHTML += `<h3><hr>Book Details</h3>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_lable">BOOKCODE: <input readonly class="details" type="text"  id="book_bookcode_field" value="${response.bookcode}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_lable">TITLE: <input class="details" type="text" id="book_title_field" value="${response.title}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_lable">FORMAT: <input class="details" type="text" id="book_format_field" value="${response.format}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_lable">FILENAME: <input class="details" type="text" id="book_filename_field" value="${response.filename}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_lable">PAGE OFFSET: <input class="details" type="text" id="book_page_offset_field" value="${response.page_offset}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div class="details_wrapper">`
      bookDetailsDiv.innerHTML += `<div class="input_lable">NUM PAGES: <input class="details" type="text" id="book_num_pages_field" value="${response.num_pages}"/></div>`
      bookDetailsDiv.innerHTML += `</div>`
      bookDetailsDiv.innerHTML += `<div></div>`
      bookDetailsDiv.innerHTML += `<button id="book_update" onclick="bookUpdateHandler()" >Update</button>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function bookSearchHandler() {
  //===============================

  let key = document.getElementById('key').value.trim()
  document.getElementById('key').value = key //replace with trimmed value
  let url = `/api/books?key=${key}`
  if (key === '') {
    url = `/api/books`
  }

  let bookDiv = document.getElementById('song_data')
  bookDiv.innerHTML = ''
  //clear song details div
  let bookDetailsDiv = document.getElementById('song_details')
  bookDetailsDiv.innerHTML = ''


  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //response is expected to object like: {songs: [ {id: title:},{id: title:},...]}
      bookDiv.innerHTML = bookDiv.innerHTML + `<h3><hr>Books matching: ${key} </h3><ul>`
      for (let book of response.books) {
        bookDiv.innerHTML = bookDiv.innerHTML + `<li onclick="bookSelectHandler('${book.bookcode}')">
<font color="blue">${book.bookcode}:  ${book.title}</font></li>`
      }
      bookDiv.innerHTML = bookDiv.innerHTML + `</ul>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}


//Attach Enter-key Handler for search field
const ENTER = 13 //Enter key character code
document.getElementById("key")
  .addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === ENTER) {
      document.getElementById("search").click()
      document.getElementById("searchbook").click()
    }
  })
  document.getElementById("key")
  .addEventListener("keyup2", function(event) {
    event.preventDefault()
    if (event.keyCode === ENTER) {
      document.getElementById("searchbook").click()
    }
  })
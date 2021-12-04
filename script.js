// form
const form = document.getElementById('form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const priority = document.getElementById('priority')
const category = document.getElementById('category')

// display
const booksWrapper = document.querySelector('.books__wrapper')

// error
const errorElement = document.getElementById('error')

let books = JSON.parse(localStorage.getItem('booksList')) || [];
let tableColumnsName = ['Title', 'Author', 'Priority', 'Category']

const formReset = () => {
  author.value = ''
  title.value = ''
  priority.value = ''
  category.value = ''
}

const addBook = (title, author, priority, category) => {
  console.log(`Book added: ${title}, ${author}, ${priority}, ${category}`)
  const prev = books
  books = ([{
    id: Math.floor(Math.random() * 1234),
    title,
    author,
    priority,
    category,
  }, ...prev])
  console.log(books)
  localStorage.setItem('booksList', JSON.stringify(books))
}

const displayBooks = () => {

  if (books.length > 0) {
    booksWrapper.removeChild(booksWrapper.firstChild)
    const booksTable = document.createElement('table')
    const headerRow = document.createElement('tr')
    booksTable.appendChild(headerRow)

    tableColumnsName.forEach(column => {
      const th = document.createElement('th')
      th.innerHTML = column
      headerRow.appendChild(th)
    })

    booksWrapper.appendChild(booksTable)

    books.forEach(book => {
      // row
      const bookItem = document.createElement('tr')

      // title
      const bookTitle = document.createElement('td')
      bookTitle.innerHTML = book.title
      bookItem.appendChild(bookTitle)

      // author
      const bookAuthor = document.createElement('td')
      bookAuthor.innerHTML = book.author
      bookItem.appendChild(bookAuthor)

      // priority
      const bookPriority = document.createElement('td')
      bookPriority.innerHTML = book.priority
      bookItem.appendChild(bookPriority)

      // category
      const bookCategory = document.createElement('td')
      bookCategory.innerHTML = book.category
      bookItem.appendChild(bookCategory)


      booksTable.appendChild(bookItem)
    })
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()
  errorElement.innerText = ""

  let messages = []

  if (title.value.length < 1) {
    messages.push('Title field must have at least 1 character')
  }
  if (author.value.length < 3) {
    messages.push('Author field must have at least 3 characters')
  }

  if (priority.value === "") {
    messages.push('Priority field cant be empty')
  }
  if (priority.value > 5 || priority.value < 1) {
    messages.push('Priority field value must be between 5 and 1')
  }

  if (category.value === "") {
    messages.push('Category field cant be empty')
  }


  if (messages.length > 0) {
    errorElement.innerText = messages.join(', \r\n')
  } else {

    addBook(title.value, author.value, priority.value, category.value)
    formReset()
    displayBooks()
  }
})

window.onload = displayBooks()
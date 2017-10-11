import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'

import BookShelf from './BookShelf'
import SearchPage from './SearchPage'
import '../styles/App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = BooksAPI.getAll().then(response => {
      this.setState({allBooks : response})
    })
    this.updateShelf = this.updateShelf.bind(this)
  }

  getAllBooks() {
    BooksAPI.getAll().then(response => {
      this.setState({allBooks : response})
    })
  }

  updateShelf(book, shelfValue) {
    const { allBooks } = this.state
    let updatedBooks = Object.assign([], allBooks)

    const bookIndex = allBooks.findIndex((bIndex) => {
      return bIndex.id === book.id
    })
    if(bookIndex < 0) {
      const updatedBook = Object.assign({}, book)
      updatedBook.shelf = shelfValue
      updatedBooks.push(updatedBook)
    } else {
      updatedBooks[bookIndex] = Object.assign({}, updatedBooks[bookIndex])
      updatedBooks[bookIndex].shelf = shelfValue
    }
    
    BooksAPI.update(book, shelfValue).then(
      this.setState({allBooks: updatedBooks})
    )
  }

  render() {
    const { allBooks } = this.state
    if (!allBooks) {
      return null;
    }
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf bookList={allBooks} updateShelf={this.updateShelf}/>
            </div>
            <div className="open-search">
              <Link 
                  to='/search'>
                  Add a book
              </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchPage currentBooks={allBooks} updateShelf={this.updateShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import BookShelf from './BookShelf'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = BooksAPI.getAll().then(response => {
      this.setState({allBooks : response})
    })
    this.updateShelf = this.updateShelf.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
  }

  getAllBooks() {
    BooksAPI.getAll().then(response => {
      this.setState({allBooks : response})
    })
  }

  updateShelf(book, shelfValue) {
    console.log(shelfValue, book.id)
    BooksAPI.update(book, shelfValue).then(response => {
      this.setState({allBooks : response})
    })
  }

  render() {
    const { allBooks } = this.state
    console.log(allBooks,'Here')
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

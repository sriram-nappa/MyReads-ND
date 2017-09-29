import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: true,
      allBooks: []
    }
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then(response => {
      this.setState({allBooks : response})
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf bookList={this.state.allBooks} />
              </div>
            </div>
            <Search />
          </div>
        )} />
        <Route path='/search' render={() => (
          <SearchPage />
        )} />
      </div>
    )
  }
}

export default BooksApp

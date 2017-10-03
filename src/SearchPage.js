import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maxResults: 20,
            bookList: []
        }
        this.searchBooks = this.searchBooks.bind(this)
    }
    searchBooks(e) {
        let {maxResults} = this.state
        let searchIndex = e.target.value
        if (searchIndex.length)
            BooksAPI.search(searchIndex, maxResults)
                .then((response) => {
                    console.log(response)
                    this.setState({bookList: response})
                })
    }

    render() {
        let { bookList } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBooks(e)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <Books shelvedBooks={bookList}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage
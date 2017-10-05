import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookList: []
        }
        this.searchBooks = this.searchBooks.bind(this)
    }

    searchBooks(e) {
        let { maxResults } = this.props
        let searchIndex = e.target.value
        if (searchIndex.length)
            BooksAPI.search(searchIndex, maxResults)
                .then((response) => {
                    this.setState({ bookList: response })
                })
        else
            this.setState({ bookList: [] })
    }

    render() {
        let { bookList } = this.state
        let { updateShelf } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(e) => this.searchBooks(e)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <Books shelvedBooks={bookList} updateShelf={updateShelf}/>
                    </ol>
                </div>
            </div>
        )
    }
}

SearchPage.defaultProps = {
    maxResults : 15
}

export default SearchPage
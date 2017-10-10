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

    componentWillReceiveProps(nextProps) {
        this.setState({
            bookList: nextProps.currentBooks
        })
    }

    searchBooks(e) {
        let { maxResults, currentBooks } = this.props
        let searchIndex = e.target.value
        if(searchIndex === '') {
            return;
        }
        BooksAPI.search(searchIndex, maxResults)
                .then((response) => {
                    if (response && response.length) {
                        const books = response.map((book) => {
                            const searchBook = currentBooks.find((curBook) => 
                                curBook.id === book.id
                            )
                            const bookShelf = searchBook ? searchBook.shelf : 'none'

                            return {
                                id : book.id,
                                authors: book.authors,
                                shelf: bookShelf,
                                title: book.title,
                                imageLinks: {
                                    thumbnail: book.imageLinks ? book.imageLinks.thumbnail : ''
                                }
                            }
                        })
                        this.setState({ bookList: books })
                    }
                })
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
    maxResults : 10
}

export default SearchPage
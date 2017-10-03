import React, { Component } from 'react'
import BookshelfOptions from './BookshelfOptions'

class Books extends Component {
    renderBooks(shelvedBooks) {
        let booksArr = []
        console.log('Bok render', shelvedBooks)
        booksArr = shelvedBooks.map(book => (
            <div className="book" key={book.title}>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <BookshelfOptions/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {
                        book.authors.join(', ')
                    }
                </div>
            </div>
        ))
        return booksArr
    }

    render() {
        let { shelvedBooks } = this.props
        if (shelvedBooks && shelvedBooks.length) {
            console.log('In')
            return (
                <div className="books-wrapper">
                    {this.renderBooks(shelvedBooks)}
                </div>
            )
        }
        else
            return (
                <div> Loading .... </div>
            )
    }
}

export default Books
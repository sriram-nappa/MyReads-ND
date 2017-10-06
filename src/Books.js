import React, { Component } from 'react'
import BookshelfOptions from './BookshelfOptions'


class Books extends Component {

    renderBooks(shelvedBooks) {
        let booksArr = []
        let {updateShelf} = this.props
        booksArr = shelvedBooks.sort((a, b) => {
            return a.title > b.title
        }).map(book => (
            <li key={book.id}>
                <div className="book" key={book.id}>
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail : this.props.noimageURL})` }}></div>
                        <BookshelfOptions currentBook={book} updateShelf={updateShelf}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {
                            book.authors ? book.authors.join(', ') : ''
                        }
                    </div>
                </div>
            </li>
        ))
        return booksArr
    }

    render() {
        let { shelvedBooks } = this.props
        if (shelvedBooks && shelvedBooks.length) {
            console.log('In',shelvedBooks)
            return (
                <ol className="books-grid">                
                    {this.renderBooks(shelvedBooks)}
                </ol>
            )
        }
        else
            return null
    }
}

Books.defaultProps = {
    noimageURL : 'http://via.placeholder.com/128x193?text=No%20Cover'   
}
export default Books
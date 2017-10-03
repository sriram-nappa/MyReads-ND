import React, { Component } from 'react'
import BookshelfOptions from './BookshelfOptions'


class Books extends Component {
    constructor(props) {
        super(props)
    }
    renderBooks(shelvedBooks) {
        let booksArr = []
        booksArr = shelvedBooks.map(book => (
            <li key={book.id}>
                <div className="book" key={book.id}>
                    <div className="book-top">
                        {
                            console.log(book)
                        }
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail : this.props.noimageURL})` }}></div>
                        <BookshelfOptions/>
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
            console.log('In')
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
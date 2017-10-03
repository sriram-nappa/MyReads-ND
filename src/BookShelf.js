import React, { Component } from 'react'
import Books from './Books'
class BookShelf extends Component {

    state = {
        shelvedBooks: {}
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.bookList.length !== nextProps.bookList.length)
            this.filterBookshelf(nextProps.bookList)
    }

    filterBookshelf = (bookList) => {
        let shelvedBooks = {
            'currentlyReading' : [],
            'wantToRead': [],
            'read': []
        }
        bookList.forEach((book) => {
            shelvedBooks[book.shelf].push(book)
        })
        this.setState({shelvedBooks})
    }

    render() {
        let {shelvedBooks} = this.state
        console.log(shelvedBooks)
        return (
            <div className="bookshelf">
                {/* Currently Reading, Want To Read, Read */}
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <Books shelvedBooks={shelvedBooks.currentlyReading}/>
                </div>
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                    <Books shelvedBooks={shelvedBooks.wantToRead}/>
                </div>
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <Books shelvedBooks={shelvedBooks.read}/>
                </div>
            </div>
        )
    }
}

export default BookShelf
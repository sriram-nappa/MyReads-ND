import React, { Component } from 'react'
import Books from './Books'
class BookShelf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelvedBooks: {},
            currentBooks: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    componentWillMount() {
        this.filterBookshelf(this.props.bookList)
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

        this.setState({
                    shelvedBooks : shelvedBooks,
                    currentBooks : bookList     
                })
    }

    render() {
        let {shelvedBooks} = this.state
        let {updateShelf} = this.props
        console.log(shelvedBooks)
        return (
            <div className="bookshelf">
                {/* Currently Reading, Want To Read, Read */}
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <Books shelvedBooks={shelvedBooks.currentlyReading} updateShelf={updateShelf}/>
                </div>
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                    <Books shelvedBooks={shelvedBooks.wantToRead} updateShelf={updateShelf}/>
                </div>
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <Books shelvedBooks={shelvedBooks.read} updateShelf={updateShelf}/>
                </div>
            </div>
        )
    }
}

export default BookShelf
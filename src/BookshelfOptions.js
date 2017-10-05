import React, {Component} from 'react'

class BookshelfOptions extends Component {
    constructor(props) {
        super(props)
        this._updateShelf = this._updateShelf.bind(this)
    }

    _updateShelf(e) {
        let {currentBook, updateShelf} = this.props
        let selectedIndex = e.target.options["selectedIndex"]
        let shelfValue = e.target.options[selectedIndex].value
        updateShelf(currentBook, shelfValue)
    }



    render() {
        const {currentBook} = this.props
        return (
            <div className="book-shelf-changer">
                <select value={ currentBook.shelf ? currentBook.shelf : "none" } onChange={(e)=>this._updateShelf(e)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookshelfOptions
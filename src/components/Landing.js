import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import { getAll, update } from '../BooksAPI';

class Landing extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
    };
    async componentDidMount() {
        let books = await getAll();
        await this.sortShelves(books);
    }
    sortShelves = books => {
        let currentlyReading = books.filter(
            book => book.shelf === 'currentlyReading'
        );
        let wantToRead = books.filter(book => book.shelf === 'wantToRead');
        let read = books.filter(book => book.shelf === 'read');
        let none = books.filter(book => book.shelf === 'none');
        this.setState({
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read,
            none: none
        });
    };
    updateShelf = async (book, shelf) => {
        await update(book, shelf);
        let updatedBooks = await getAll();
        this.sortShelves(updatedBooks);
    };
    render() {
        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                    <div>
                        <Bookshelf
                            bookshelfTitle='Currently Reading'
                            bookshelfType='currentlyReading'
                            books={this.state.currentlyReading}
                            updateShelf={this.updateShelf}
                        />
                        <Bookshelf
                            bookshelfTitle='Want to Read'
                            bookshelfType='wantToRead'
                            books={this.state.wantToRead}
                            updateShelf={this.updateShelf}
                        />
                        <Bookshelf
                            bookshelfTitle='Read'
                            bookshelfType='read'
                            books={this.state.read}
                            updateShelf={this.updateShelf}
                        />
                    </div>
                </div>
                <div className='open-search'>
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}
export default Landing;
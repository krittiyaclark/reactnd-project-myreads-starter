import React from 'react';
import Book from './Book';

const Bookshelf = props => {
    return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>{props.bookshelfTitle}</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {props.books
                        ? props.books.map((book, i) => {
                            return (
                                <li key={i}>
                                    <Book book={book} shelf={book.shelf} updateShelf={props.updateShelf} />
                                </li>
                            );
                        })
                        : ''}
                </ol>
            </div>
        </div>
    );
};
export default Bookshelf;
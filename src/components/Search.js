import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
    state = {
        searchTerm: ''
    };
    handleOnChange = e => {
        this.setState({ searchTerm: e.target.value });
    };
    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link to='/' className='close-search'>
                        Close
          </Link>
                    <div className='search-books-input-wrapper'>
                        {/*
					NOTES: The search from BooksAPI is limited to a particular set of search terms.
					You can find these search terms here:
					https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
 					However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
					you don't find a specific author or title. Every search is limited by search terms.
				*/}
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            onChange={this.handleOnChange}
                        />
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        {this.props.books
                            .filter(
                                book =>
                                    (book.authors.filter(
                                        author => author.indexOf(this.state.searchTerm) >= 0
                                    ).length > 0 ||
                                        book.title
                                            .toLowerCase()
                                            .indexOf(this.state.searchTerm.toLowerCase()) >= 0) &&
                                    this.state.searchTerm !== ''
                            )
                            .map((book, i) => {
                                return (
                                    <li key={i}>
                                        <Book book={book} updateShelf={this.props.updateShelf} />
                                    </li>
                                );
                            })}
                    </ol>
                </div>
            </div>
        );
    }
}
export default Search;
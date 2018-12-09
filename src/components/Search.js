import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
    state = {
        searchTerm: '',
        currentBooks: [],
        searchedBooks: []
    };

    async componentDidMount(){
        // const currentBooks = await BooksAPI.getAll();
        this.setState({
            currentBooks: [],
            searchedBooks: []
        });
    }

    handleOnChange = async e => {
        if(e.target.value === ''){
            return this.setState({ 
                searchTerm: e.target.value,
                searchTerm: '', 
                searchedBooks: [],
                currentBooks: []
            });
        }
        this.setState({ searchTerm: e.target.value });
        const currentBooks = this.state.currentBooks.slice();
        let search = await BooksAPI.search(e.target.value);
        if(!!search && !search.error){
            search.map(searchedBook => {
                return currentBooks.filter(book => book.id === searchedBook.id).map(book => {
                    searchedBook.shelf = book.shelf;
                    return BooksAPI.update(searchedBook, book.shelf);
                })
            })
            this.setState({ searchedBooks: search });
        } else {
            // clear out searched books
            this.setState({ searchedBooks: [] });
        }
    };

    updateShelf = async (book, shelf) => {
        await BooksAPI.update(book, shelf);
        BooksAPI.getAll();
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
                        {!!this.state.searchedBooks ? this.state.searchedBooks.map((book, i) => {
                            return (
                                <li key={i}>
                                    <Book book={book} shelf={book.shelf} updateShelf={this.updateShelf} />
                                </li>
                            );
                        }) : ''}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import Search from './components/Search';
import './App.css';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({
      books: books
    });
  }

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => <Landing books={this.state.books} />}
          />
        <Route
          path='/search'
          render={() => <Search books={this.state.books} />}
          />
      </div>
    );
  }
}

export default BooksApp;

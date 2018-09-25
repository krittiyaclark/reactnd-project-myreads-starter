import React, { Component } from 'react';

class Book extends Component {
    state = {
        option: this.props.shelf
    };

    handleSelectChange = async e => {
        const updatedOption = e.target.value;
        this.props.updateShelf(this.props.book, updatedOption);
        this.setState({ option: updatedOption });
    };
    render() {
        return (
            <div className='book'>
                <div className='book-top'>
                    <div
                        className='book-cover'
                        style={
                            !!this.props.book.imageLinks ?
                            {
                                width: 128,
                                height: 188,
                                backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
                            } : {
                                width: 128,
                                height: 188,
                                backgroundColor: 'grey'
                            }
                        }
                        />
                    <div className='book-shelf-changer'>
                        <select
                            value={this.props.shelf || 'none'}
                            onChange={this.handleSelectChange}
                        >
                            <option disabled>
                                Move to...
              </option>
                            <option value='currentlyReading'>Currently Reading</option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                        </select>
                    </div>
                </div>
                <div className='book-title'>{this.props.book.title}</div>
                <div className='book-authors'>
                    {this.props.book.authors ? this.props.book.authors.map((author, i) => {
                        return <div key={i}>{author}</div>;
                    }) : ''}
                </div>
            </div>
        );
    }
}
export default Book;
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {get} from './BooksAPI';

/** Class Representa o componente Book. */
class Book extends Component{

  state = {
    book : this.props.book
  };

  static propTypes = {
    book: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  componentDidMount(){
    get(this.props.id)
      .then(book => this.setState({book:book}))
      .catch(response => {
        console.error(response);
        this.setState({book:null})
      });
  }

  render() {

    const {onChangeShelf} = this.props;
    const {book} = this.state;
    const {title = "", authors = [], shelf = "none", imageLinks: cover} = book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{width: 128, height: 192, backgroundImage: `url(${cover?cover.smallThumbnail:''})`}}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(event) => {
              onChangeShelf(book, event.target.value);
            }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          <ol className="authors-list">
            {authors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Book;
import React, {Component} from 'react'
import PropTypes from 'prop-types';

/** Class Representa o componente Book. */
class Book extends Component{

  static propTypes = {
    book : PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render(){

    const {book, onChangeShelf} = this.props;
    const {title, authors, shelf, imageLinks:cover} = book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{width: 128, height: 192, backgroundImage: `url(${cover.smallThumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select defaultValue={shelf} onChange={(event) => {
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
    )
  }
}

export default Book;
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

  static renderTitle(title) {
    return <div className="book-title">{title}</div>
  };

  static renderCover(cover) {
    return <div className="book-cover" style={{width: 128, height: 192, backgroundImage: `url(${cover})`}}/>;
  };

  static renderAuthors(authors) {
    return (
      <div className="book-authors">
        <ol className="authors-list">
          {authors.map((author, index) => (
            <li key={index}>{author}</li>
          ))}
        </ol>
      </div>
    );
  }

  static renderShelf(shelf, onChange) {
    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={event=>onChange(event.target.value)}>
          <option value="moveTo" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }

  render() {

    const {onChangeShelf} = this.props;
    const {book} = this.state;
    const {title = "", authors = [], shelf = "none", imageLinks: cover} = book;

    return (
      <div className="book">
        <div className="book-top">
          {Book.renderCover(cover?cover.smallThumbnail:'')}
          {Book.renderShelf(shelf, shelf => onChangeShelf(book, shelf))}
        </div>
        {Book.renderTitle(title)}
        {Book.renderAuthors(authors)}
      </div>
    );
  }
}

export default Book;
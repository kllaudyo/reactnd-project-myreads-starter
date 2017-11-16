import React from 'react'
import PropTypes from 'prop-types';

const BookTitle = ({title}) =>
  <div className="book-title">{title}</div>;

const BookCover = ({cover}) =>
  <div className="book-cover" style={{width: 128, height: 192, backgroundImage: `url(${cover})`}}/>;

const BookAuthors = ({authors}) =>
  <div className="book-authors">
    <ol className="authors-list">
      {authors.map((author, index) => (
        <li key={index}>{author}</li>
      ))}
    </ol>
  </div>;

const BookShelf = ({shelf, onChange}) =>
  <div className="book-shelf-changer">
    <select value={shelf} onChange={event=>onChange(event.target.value)}>
      <option value="moveTo" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>;

const Book = ({id, title, authors = [], shelf, cover, onChangeShelf}) => {
  return (
    <div className="book">
      <div className="book-top">
        <BookCover cover={cover} />
        <BookShelf shelf={shelf} onChange={(shelf)=>onChangeShelf(id, shelf)} />
      </div>
      <BookTitle title={title} />
      <BookAuthors authors={authors} />
    </div>
  )
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  authors: PropTypes.array,
  shelf: PropTypes.string,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
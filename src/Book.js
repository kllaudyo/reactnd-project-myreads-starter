import React from 'react'

/**
 * Esta função de callback chamada `onChangeShelf` é usada para alterar a estante atual do livro
 * @callback onChangeShelf
 * @param {string} id - atributo identificador único do livro a ser alterado
 * @param {string} shelf - estante ao qual o livro será atribuído
 */

/**
 * @description Representa o componente Book
 * @param {Object} props - Os atributos do componente
 * @param {Object} props.book - O objeto book que descreve um livro
 * @param {onChangeShelf} props.onChangeShelf - O callback que trata estante do livro
 * @returns {Object}
 */
function Book(props){

  const {book, onChangeShelf} = props;
  const {title, authors, shelf, imageLinks:cover} = book;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${cover.smallThumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={shelf} onChange={(event) => {
            onChangeShelf(book.id, event.target.value);
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
          {authors.map( (author,index) => (
            <li key={index}>{author}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Book;
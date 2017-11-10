import React from 'react'

/**
 * @description Representa o componente Book
 * @param {Object} props - Os atributos do componente
 * @param {string} props.title - O atributo titulo do livro
 * @param {string[]} props.authors - O atributo autores do livro
 * @param {string} props.cover - O atributo capa do livro
 * @returns {Object}
 */
function Book(props){
  // TODO: marcar option correspondente ao estado atual do book
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${props.cover})` }}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">
        <ol className="authors-list">
          {props.authors.map( (author,index) => (
            <li key={index}>{author}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Book;
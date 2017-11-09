import React from 'react'

/**
 * @description Representa o componente Book
 * @param {string} title - O titulo do livro
 * @param {string} author - O autor do livro
 * @param {string} cover - A capa do livro
 * @returns {JSX} componente
 */
function Book(props){
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
      <div className="book-authors">{props.author}</div>
    </div>
  )
}

export default Book;
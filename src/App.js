import React from 'react'
import {Route, Link} from 'react-router-dom'
import Book from './Book'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    shelfBooks: []
  };

  /**
  * @description Método para alterar a estante do livro
  * @param {Object} book - O objeto json book
  * @param {string} shelf - O atributo estante destino do livro
  */
  changeShelf = (book, shelf) => {
    const id = book.id;
    const books = this.state.shelfBooks.filter(book => book.id !== id);

    book.shelf = shelf;
    books.push(book);

    BooksAPI.update(book, shelf).then(response => {
      this.setState({shelfBooks: books});
    });
  };

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({shelfBooks:books})
    })
  }

  render() {

    return (
      <div className="app">

        <Route path="/search" render={() => (
          <Search onChangeShelf={this.changeShelf}/>
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.shelfBooks.filter( book => ( book.shelf === 'currentlyReading') ).map( book => (
                        <li key={book.id}>
                          <Book book={book} id={book.id} onChangeShelf={this.changeShelf} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.shelfBooks.filter( book => ( book.shelf === 'wantToRead') ).map( book => (
                        <li key={book.id}>
                          <Book book={book} id={book.id} onChangeShelf={this.changeShelf} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.shelfBooks.filter( book => ( book.shelf === 'read') ).map( book => (
                        <li key={book.id}>
                          <Book book={book} id={book.id} onChangeShelf={this.changeShelf} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Search a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp

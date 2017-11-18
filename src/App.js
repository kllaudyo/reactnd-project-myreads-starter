import React from 'react'
import {Route, Link} from 'react-router-dom'
import Book from './Book'
import Search from './Search'
import {get, getAll, update} from "./BooksAPI"
import './App.css'

class BooksApp extends React.Component {

  constructor(){
    super();
    this.state = {
      books: []
    };

    this.setShelf = this.setShelf.bind(this);
    this.getShelf = this.getShelf.bind(this);
    this.updateAPI = this.updateAPI.bind(this);
  }

  updateAPI(book, books){
    update(book, book.shelf)
      .then(response=> this.setState({books}))
      .catch(error => console.log(error));
  }

  setShelf(id, shelf) {
    const books = this.state.books.filter(book => book.id !== id);
    get(id).then(book=>{
      book.shelf = shelf;
      books.push(book);
      this.updateAPI(book, books);
    });
  }

  getShelf(id) {
    const books = this.state.books.filter(book => book.id === id);
    return books.length > 0 ? books[0].shelf:"none";
  }

  componentDidMount() {
    getAll().then(books => {
      this.setState({books})
    })
  }

  render() {

    return (
      <div className="app">

        <Route path="/search" render={() => (
          <Search onChangeShelf={this.setShelf} getShelf={this.getShelf} />
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
                      {this.state.books.filter( book => ( book.shelf === 'currentlyReading') ).map( book => (
                        <li key={book.id}>
                          <Book id={book.id}
                                title={book.title}
                                authors={book.authors}
                                cover={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                onChangeShelf={this.setShelf}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter( book => ( book.shelf === 'wantToRead') ).map( book => (
                        <li key={book.id}>
                          <Book id={book.id}
                                title={book.title}
                                authors={book.authors}
                                cover={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                onChangeShelf={this.setShelf}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter( book => ( book.shelf === 'read') ).map( book => (
                        <li key={book.id}>
                          <Book id={book.id}
                                title={book.title}
                                authors={book.authors}
                                cover={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                onChangeShelf={this.setShelf}
                          />
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

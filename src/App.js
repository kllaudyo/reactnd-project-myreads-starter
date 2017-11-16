import React from 'react'
import {Route, Link} from 'react-router-dom'
import Book from './Book'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  constructor(){
    super();
    this.state = {
      shelfBooks: []
    };
    this.updateShelf = this.updateShelf.bind(this);
    this.getShelf = this.getShelf.bind(this);
  }

  updateShelf(id, shelf) {
    const shelfBooks = this.state.shelfBooks.map(book => {
      if(book.id === id){
        book.shelf = shelf
      }
      return book;
    });
    BooksAPI.update({id},shelf)
      .then(response => this.setState({shelfBooks}))
      .catch(error => console.log(error));
  }

  getShelf(id) {
    const books = this.state.shelfBooks.filter(book => book.id === id);
    return books.length > 0 ? books[0].shelf:"none";
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({shelfBooks:books})
    })
  }

  render() {

    return (
      <div className="app">

        <Route path="/search" render={() => (
          <Search onChangeShelf={this.updateShelf} getShelf={this.getShelf} />
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
                          <Book id={book.id}
                                title={book.title}
                                authors={book.authors}
                                cover={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                onChangeShelf={this.updateShelf}
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
                      {this.state.shelfBooks.filter( book => ( book.shelf === 'wantToRead') ).map( book => (
                        <li key={book.id}>
                          <Book id={book.id}
                                title={book.title}
                                authors={book.authors}
                                cover={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                onChangeShelf={this.updateShelf}
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
                      {this.state.shelfBooks.filter( book => ( book.shelf === 'read') ).map( book => (
                        <li key={book.id}>
                          <Book id={book.id}
                                title={book.title}
                                authors={book.authors}
                                cover={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                onChangeShelf={this.updateShelf}
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

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Debounce} from 'react-throttle'
import PropTypes from 'prop-types'
import Book from './Book'
import {search} from "./BooksAPI"

/** Class Representa o componente Search. */
class Search extends Component{

  constructor(){
    super();
    this.state = {
      books : []
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
  }

  updateQuery(query) {
    query = query.trim();
    if(query.length > 0){
      search(query, 10)
        .then(books => {
          if(Array.isArray(books)) {
            this.setState({books: books})
          } else {
            this.clearQuery()
          }
        }).catch(() => this.clearQuery());
    }else{
      this.clearQuery();
    }
  }

  clearQuery() {
    this.setState({books:[]})
  }

  static renderBar(onChangeQuery) {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">
          <Debounce time="400" handler="onChange">
            <input type="text" placeholder="Search by title or author" onChange={event => onChangeQuery(event.target.value)} />
          </Debounce>
        </div>
      </div>
    );
  }

  static renderResult(books, getShelf, onChangeShelf) {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map(book => (
              <li key={book.id}>
                <Book id={book.id}
                      title={book.title}
                      authors={book.authors?book.authors:[]}
                      cover={book.imageLinks.smallThumbnail}
                      shelf={getShelf(book.id)}
                      onChangeShelf={onChangeShelf}
                />
              </li>
            )
          )}
        </ol>
      </div>
    );
  }

  render(){
    const {onChangeShelf, getShelf} = this.props;
    return (
      <div className="search-books">
        {Search.renderBar(this.updateQuery)}
        {Search.renderResult(this.state.books, getShelf, onChangeShelf)}
      </div>
    )
  }

}

Search.propTypes = {
  onChangeShelf : PropTypes.func.isRequired,
  getShelf: PropTypes.func.isRequired
};

export default Search;
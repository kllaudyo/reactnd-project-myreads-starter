import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import {search} from "./BooksAPI"

/** Class Representa o componente Search. */
class Search extends Component{

  constructor(){
    super();
    this.timming_id = null;
  }

  static propTypes = {
    onChangeShelf : PropTypes.func.isRequired
  };

  state = {
    books : [],
  };

  updateQuery = (query) => {
    query = query.trim();

    this.clearTimming();

    if(query.length > 0){
      this.timming_id = setTimeout(()=>{
        search(query, 10)
          .then(books => {
            if(Array.isArray(books)) {
              this.setState({books: books})
            } else {
              this.clearQuery()
            }
          }).catch(() => this.clearQuery())
      }, 300)
    }else{
      this.clearQuery();
    }
  };

  clearQuery = () => {
    this.setState({books:[]})
  };

  clearTimming = () => {
    if(this.timming_id !== null)
      clearTimeout(this.timming_id)
  };

  render(){

    const {onChangeShelf} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={event => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.books.map(book => (
              <li key={book.id}>
                <Book book={book} id={book.id} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Search;
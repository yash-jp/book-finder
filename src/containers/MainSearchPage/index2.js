import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

class MainSearcgPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookName:'',
    };
  }

  onBookNameChange = (e) => {
    this.setState({bookName: e.target.value})
  };

  onFindButtonClick = async () => {
    // TODO make API call to find book from title
    // console.log(this.props);

    const apiData = await fetch(`https://openlibrary.org/search.json?q=the+great+gatsby`)
      .then(response => response.json())
      .then(data => data);
    // console.log(apiData);

    this.props.successAPICall(apiData);
    if(apiData.docs.length) {
      this.props.history.push("/secondListingPage");
    }
  };

  render(){
    return(
      <div>
        <div>
        <h1>Application Name: {this.props.author}</h1>
      </div>
      
      <div>
        <input type='text' name='bookName' value={this.state.bookName} onChange={this.onBookNameChange} />
      </div>

      <div>
        <button type='button' onClick = {this.onFindButtonClick}>Find Book</button>
      </div>
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    author: state.author,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    successAPICall: (data) => dispatch({ type: 'SUCCESS_GET_BOOKS_CALL', payload: data})
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainSearcgPage));
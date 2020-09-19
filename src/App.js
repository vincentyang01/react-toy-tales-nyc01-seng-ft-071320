import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => {
      this.setState(() => ({ toys: data }))
    })
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  submitHandler = (obj) => {
    console.log("Hit the submitHandler!!!!!!!!!!!!!!!!", obj)
    const options = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
    body: JSON.stringify(obj)
    }
    fetch("http://localhost:3000/toys", options)
    .then(res => res.json())
    .then( res => {
      console.log("What is the response??", res)
      this.setState({ toys: [obj, ...this.state.toys]})
    })
  }

  donateButton = (props) => {
    console.log("Donation button to delete", props)
    const options = {
      "method": "DELETE",
    }
    fetch("http://localhost:3000/toys/" + props.id, options)
    .then(res => res.json())
    .then(res => {
      let newArr = this.state.toys.filter(el => el.id !== props.id)
      this.setState(() => ({ toys: newArr }))
    })
  }

  likeButton = (props) => {
    console.log("Like button to increment", props)
    const options = {
      "method": "PATCH",
      "headers": {
        "content-type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify({ likes: props.likes + 1 })
    }
    fetch("http://localhost:3000/toys/" + props.id, options)
    .then(res => res.json())
    .then(res => {
      let newArray = [...this.state.toys]
      let foundToy = newArray.find(el => el.id == props.id)
      foundToy.likes = foundToy.likes + 1
      this.setState({ toys: newArray })
  })}

  render(){
    console.log("After setting the state render: ", this.state.toys)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.submitHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} clickHandler={this.donateButton} likeHandler={this.likeButton}/>
      </>
    );
  }

}

export default App;

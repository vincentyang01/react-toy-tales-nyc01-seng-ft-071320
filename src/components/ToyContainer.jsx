import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  console.log("Inside ToyContainer", props)
  let eachToy = () => {
    return props.toys.map(toy => <ToyCard key={toy.id} toy={toy} clickHandler={props.clickHandler} likeHandler={props.likeHandler}/>)
  }

  return(
    <div id="toy-collection">
      {eachToy()}
    </div>
  );
}

export default ToyContainer;

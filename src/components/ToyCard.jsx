import React, { Component } from 'react';

const ToyCard = (props) => {

    console.log("Reached ToyCard: ", props)
    
    return (
      <div className="card">
        <h2>{props.toy.name}</h2>
        <img src={props.toy.image} alt={props.toy.name} className="toy-avatar" />
        <p>{props.toy.likes} Likes </p>
        <button className="like-btn" onClick={() => props.likeHandler(props.toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => props.clickHandler(props.toy)}>Donate to GoodWill</button>
      </div>
    );

}

export default ToyCard;

import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profilePng from "../../Images/Profile.png"

const ReviewCard = ({review}) => {
    const options = {
        edit:false,
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        isHalf:true
      };
  return (
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard

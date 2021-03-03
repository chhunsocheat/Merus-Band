import React, { useState } from 'react'
import { Icon, Comment, Form, Header, Rating } from 'semantic-ui-react'
import { useParams } from "react-router-dom"
import faker from "faker"
import ReviewMessage from "./RewiewMessage"
import { useCallback } from 'react'
import { useEffect } from 'react'
import moment from "moment"
import axios from "axios"
const Reviews = () => {
  const { username } = useParams()
  const [allReviews, setAllReviews] = useState([])
  const [allMockReviews, setAllMockReviews] = useState([])
  const addReview = useCallback((obj) => {
    const array = []
    array.push(obj)
    setAllMockReviews(array)
    //(allReviews);
  }, [allReviews])
  /**
   * function to load all the reviews
   */
  const loadReviews= async ()=>{
    const allReviews = await axios.get(`http://localhost:3001/reviews/getreviews/${username}`)

    return allReviews;
  }
  useEffect(()=>{
    loadReviews().then(res=>{
      setAllReviews(res.data)
    })
  },[])
  return (
    <Comment.Group>
      <Header className="mt-5" as='h3' dividing>
        Reviews
    </Header>
      {[3, 4, 5].map(el => {
        return (
          <Comment>
            <Comment.people src={faker.image.people()} />
            <Comment.Content>
              <Comment.Author as='a'><span>{faker.name.firstName()}</span> <span>{faker.name.lastName()}</span></Comment.Author>
              <Comment.Metadata>
                <Icon style={{ color: "gold" }} name="star" />
                <span>{el}</span>
              </Comment.Metadata>
              <Comment.Text>
                <p>{faker.lorem.sentence()}</p>
              </Comment.Text>
              <Comment.Metadata>
                <div>two days ago</div>
              </Comment.Metadata>
            </Comment.Content>

          </Comment>
        )
      })}
      {allReviews.map(el => {
        return (
          <Comment>
            <Comment.people src={el.userImg} />
            <Comment.Content>
              <Comment.Author as='a'><span>{el.reviewByUsername}</span> </Comment.Author>
              <Comment.Metadata>
                <Icon style={{ color: "gold" }} name="star" />
                <span>{el.reviewRating}</span>
              </Comment.Metadata>
              <Comment.Text>
                <p>{el.reviewMessage}</p>
              </Comment.Text>
              <Comment.Metadata>
                <div>{moment(el.date).fromNow()}</div>
              </Comment.Metadata>
            </Comment.Content>

          </Comment>
        )
      })}



      {/* Review Text Area */}
      <ReviewMessage addReview={addReview} />
    </Comment.Group>
  )
}
export default React.memo(Reviews);

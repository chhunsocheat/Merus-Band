import React, { useState } from 'react'
import { Button, Popup, Form, Header, Rating } from 'semantic-ui-react'
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
const ReviewMessage = ({ addReview }) => {
  const loginState = useSelector((state) => {
    return state.loginState;
  });
  const loginBandState = useSelector((state) => {
    return state.loginBandState;
  });
  const { username } = useParams()
  const user = useSelector((state) => {
    return state.user;
  })

  const [rating, setRating] = useState(4);
  const [reviewMessage, setReviewMessage] = useState("")
  /**
   * function to post the review message and rating to the server.
   */

  async function postReview() {

    const reviewRes = await axios.post("http://localhost:3001/reviews/addreview", {
      reviewMessage,
      reviewRating: rating,
      reviewByUsername: user.username,
      reviewToUsername: username,
      userImg: user.userImg
    })
    //forcing the window to reload after the post is success
    window.location.reload();
  }
  /**
   * function to handle the rating scheme
   * @param {*} e 
   * @param {*} param1 
   */
  function handleRate(e, { rating, maxRating }) {
    setRating(rating);
  }
  //rating messages to show to the client for reviewing
  const reviewsQuote = ["Bad", "Fair", "Good", "Very Good", "Excellent!"]
  return (

    <Form reply>
      <Header className="mt-5" as='h3' dividing>
        Write your own reviews!
        <Header.Subheader className="mt-2" as='h3' >
          Your review about <span style={{ fontWeight: "700" }}>{username}</span>
        </Header.Subheader>
      </Header>

      <Rating
        icon="star"
        maxRating={5}
        defaultRating={rating}
        onRate={handleRate}
        clearable
      />
      <p style={{ margin: "5px 0px" }}>{reviewsQuote[rating - 1]}</p>
      <Form.TextArea placeholder='Tell us more' onChange={(e) => {
        setReviewMessage(e.target.value)
      }}

      />
      {loginState || loginBandState === true ?
        <Button className="mb-5" onClick={postReview} content='Add Review' labelPosition='left' icon='edit' primary />
        :
        <Popup
          content='You need to sign in first'
          on='click'
          pinned
          trigger={
            <Button className="mb-5" content='Add Review' labelPosition='left' icon='edit' primary />
          }
        />
      }
    </Form>
  )
}
export default React.memo(ReviewMessage);

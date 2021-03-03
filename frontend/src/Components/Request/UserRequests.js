import React, { useState } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import PendingRequestUser from "./PendingRequestUser";
import AcceptedRequestUser from "./AcceptedRequestUser";
const UserRequests = () => {

  const [pendingReqs, setpendingReqs] = useState([])
  const [acceptedReqs, setAcceptedReqs] = useState([])
  const [requestState, setRequestState] = useState(true)
  const user = useSelector((state) => {
    return state.user
  })
  /**
 * Load band detail
 * @returns {Object}
 */
  async function loadBand() {
    const pendingUserRequests = await axios.post(
      `http://localhost:3001/requests/getuserpendingrequests`, {
      username: user.username
    }
    );
    const acceptedUserRequests = await axios.post(
      `http://localhost:3001/requests/getuseracceptedrequests`, {
      username: user.username
    }
    );
    return {
      pendingUserRequests: pendingUserRequests.data,
      acceptedUserRequests: acceptedUserRequests.data
    };
  }

  useEffect(() => {
    loadBand().then(res => {
      setpendingReqs(res.pendingUserRequests);
      setAcceptedReqs(res.acceptedUserRequests)
    });
  }, []);
  /**
 * Function that will render the pending request
 */
  const PendingRequests = () => {
    return (
      <div className="bandReqContainer">
        {pendingReqs.map(req => (<PendingRequestUser reqInfo={req} />))}

      </div>
    )
  }
  /**
 * Function that will render the accepted request
 */
  const AcceptedRequests = () => {
    return (
      <div className="bandReqContainer">
        {acceptedReqs.map(req => (<AcceptedRequestUser reqInfo={req} />))}

      </div>
    )
  }
  return (
    <div>
      {requestState ? (<Button onClick={() => {
        setRequestState(state => !state)
      }}>See Accepted Requests</Button>) : (<Button onClick={() => {
        setRequestState(state => !state)
      }}>See Pending Requests</Button>)}


      {requestState ? <h1>Pending Requests</h1> : <h1>Accepted Requests</h1>}
      <div className="bandReqContainer" style={{ marginTop: "30px" }}>

        {requestState ? <PendingRequests /> : <AcceptedRequests />}

      </div>
    </div>
  );
};
export default React.memo(UserRequests);

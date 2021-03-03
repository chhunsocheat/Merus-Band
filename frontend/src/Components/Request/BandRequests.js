import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import PendingRequestBand from "./PendingRequestBand";
import AcceptedRequestBand from "./AcceptedRequestBand";
import { Button } from "semantic-ui-react"
import {useHistory} from "react-router-dom"
const BandRequests = () => {
  const history = useHistory()
  const [pendingReqs, setpendingReqs] = useState([])
  const [acceptedReqs, setAcceptedReqs] = useState([])
  const [requestState, setRequestState] = useState(true)

  const band = useSelector((state) => {
    return state.band
  })
  /**
   * Load band detail
   * @returns {Object}
   */
  async function loadBand() {
    const pendingBandRequests = await axios.post(
      `http://localhost:3001/requests/getbandpendingrequests`, {
      bandname: band.username
    }
    );
    const acceptedBandRequests = await axios.post(
      `http://localhost:3001/requests/getbandacceptedrequests`, {
      bandname: band.username
    }
    );
    return {
      pendingBandRequests: pendingBandRequests.data,
      acceptedBandRequests: acceptedBandRequests.data
    };
  }
/**
 * Function that will render the pending request
 */
  const PendingRequests = () => {
    return (
      <div className="bandReqContainer">
        {pendingReqs.length === 0 ? (
          <div>
            <h3>You have no pending requests!</h3>
            <Button onClick={()=>history.push(`/explore`)} color="green">Explore Page</Button>
          </div>
        ) : <></>}
        {pendingReqs.map(req => (<PendingRequestBand reqInfo={req} />))}

      </div>
    )
  }
  /**
 * Function that will render the accepted request
 */
  const AcceptedRequests = () => {
    return (
      <div className="bandReqContainer">
        {acceptedReqs.length === 0 ? (
          <div>
            <h3>You haven't accepted any request!</h3>
            <Button onClick={()=>history.push(`/explore`)} color="green">Explore Page</Button>
          </div>
        ) : <></>}
        {acceptedReqs.map(req => (<AcceptedRequestBand reqInfo={req} />))}

      </div>
    )
  }
  useEffect(() => {
    loadBand().then(res => {
      setpendingReqs(res.pendingBandRequests);
      setAcceptedReqs(res.acceptedBandRequests)
    });
  }, []);
  return (
    <div className="mt-5 mb-5">
      <div className="mb-5">
        {requestState ? (<Button onClick={() => {
          setRequestState(state => !state)
        }}>See Accepted Requests</Button>) : (<Button onClick={() => {
          setRequestState(state => !state)
        }}>See Pending Requests</Button>)}
      </div>

      {requestState ? <h1>Pending Requests</h1> : <h1>Accepted Requests</h1>}
      <div className="bandReqContainer" style={{ marginTop: "30px" }}>

        {requestState ? <PendingRequests /> : <AcceptedRequests />}

      </div>
    </div>
  );
};
export default React.memo(BandRequests);

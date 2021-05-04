import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal({modalState}) {
    
    const history = useHistory();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(modalState);

  const handleLoginAgain = () => {
    history.push(`/signin`);
    // setOpen(modalState);
  };

  const handleClose = () => {
    setOpen(modalState);
  };
useEffect(()=>{
    setOpen(modalState);

},[modalState])
  const body = (
      
    <div style={modalStyle} className={classes.paper}>

      <h2 id="simple-modal-title">Your Session has expired!</h2>
      <p id="simple-modal-description">
       Please Sign in Again.
      </p>
      <SimpleModal />
         <Button onClick={handleLoginAgain} primary>Sign in</Button>
    </div>
  );


  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
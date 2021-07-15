import React from 'react';
import { Grid } from '@material-ui/core';
import { Favorite, ChatBubble } from '@material-ui/icons';
import PropTypes from 'prop-types';

export const UserImage = (props) => {
  
    const handleOpen = () =>{
      props.onOpenPost(props.id)
    }

    return <div className="user-image">
      <div className="photo-wrapper">
        <img alt="user-img" src={props.img} />
        <Grid className="photo-info" onClick={handleOpen} container alignItems="center" alignContent="center">
            <Grid container item alignItems="center" direction="row" justify="center"  alignContent="center">
              <Favorite/> <em className="post-info"> {props.likes} </em> 
              <ChatBubble/>  <em className="post-info"> {props.comments} </em> 
            </Grid>
        </Grid>           
      </div>
    </div>  
}

UserImage.propTypes = {
  img: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired
};

export default UserImage;



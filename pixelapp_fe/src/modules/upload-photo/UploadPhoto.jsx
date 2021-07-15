import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { AddAPhoto, Close } from '@material-ui/icons';

import PropTypes from 'prop-types';

import SavePost from './components/save-post/SavePost';
import PhotoEditor from './components/photo-editor/PhotoEditor'

export class UploadPhoto extends Component{
  constructor(props){
    super(props);
    this.state = {
      photo: null,
      photoIsDisplayed: false,
      fileSize: '',
      saveOpen: false,
    }
    this.canvasRef = React.createRef();
    this.dropAreaRef = React.createRef();
    this.addRef = React.createRef();
  }

  componentDidUpdate() {
    if(this.state.photo && !this.state.photoIsDisplayed){
      this.uploadToCanvas(this.state.photo);
    }
  }
  
  render() {
    if(!this.state.photo){
      return <div className="photo-upload">
        <div className="empty-photo" 
          ref={this.dropAreaRef} 
          onDragEnter={this.startDrag} 
          onDragLeave={this.endDrag}
          onDrop={this.dropHandler} 
          onDragOver={this.dragOverHandler}
        >
          <div className="add-photo-div" ref={this.addRef}> 
            <label htmlFor="file-input"><AddAPhoto/></label>
            <input className="file-input" name="file-input" id="file-input" type="file"  accept="image/*" onChange={this.fileChangedHandler}/>
          </div>
        </div>
      </div>
    } else {
      return <div className="photo-upload">
        <div className="post-creator">
          <div className="photo">
            <div className="photo-panel">
              <div className="panel-fix">
                <div className="fix">
                  <Close/>
                </div>
              </div>
              <label htmlFor="file-input"><AddAPhoto/></label> 
              <input className="file-input" name="file-input" id="file-input" accept="image/*" type="file" onChange={this.fileChangedHandler}/>
              <label > 
              <PhotoEditor 
                  photo={this.state.photo} 
                  returnPhoto = {this.getModifiedImage}
                  width = { this.canvasRef.current ? this.canvasRef.current.clientWidth : 0}
                  height = { this.canvasRef.current ? this.canvasRef.current.clientHeight : 0}
              />
              </label>
            </div>

            <div>
              <div className="photo-title">
                <div className="title">
                  <p>{this.state.fileSize}</p>
                  <Close className="close-photo-btn" onClick={this.closePhotoUpload}/>
                </div>
              </div>
              <div className="canvas-cont">
                <canvas className="canvas" ref={this.canvasRef} onDrop={this.dropHandler} onDragOver={this.dragOverHandler} />
              </div>
            </div>
          </div>
        </div>   

        <Button className="next-btn btn-upload bg-green" onClick={this.openSaveModal} variant="contained" color="primary">Next</Button>  

        {this.state.saveOpen ? 
        <SavePost 
          user={this.props.user}
          photo={this.canvasRef}
          onCloseSaveModal={this.closeSaveModal}
        /> : null} 
      </div>
      
    }
  }

  fileChangedHandler = (e) => {
    if(e.target.files[0]){
      this.getDataURL(e.target.files[0]); 
    }  
  } 

  getDataURL = (file) => {
    const reader = new FileReader();
    const fileSize = `${(file.size / 1000000).toFixed(2)} MB`;
    reader.onload =  (e) =>  {
      this.setState({ 
        photo: e.target.result, 
        photoIsDisplayed: false, 
        fileSize
      });
    };
    reader.readAsDataURL(file);
  }
  
  dropHandler = (e) => {
    e.preventDefault();
    const imageType = /image.*/;

    if(e.dataTransfer.files[0]){
      if (e.dataTransfer.files[0].type.match(imageType)) {
        this.getDataURL(e.dataTransfer.files[0])
      }
    }
  } 
  
  dragOverHandler = (e) => {
    e.preventDefault();
  }

  startDrag = () => {
    this.dropAreaRef.current.className = 'empty-photo drop';
    this.addRef.current.className = 'hidden-btn';
  }

  endDrag = () => {
    this.dropAreaRef.current.className = 'empty-photo';
    this.addRef.current.className = '';
  }

  closePhotoUpload = () => {
    this.setState({ photo: null, photoIsDisplayed: false })
  }

  openSaveModal = () => {
    this.setState({ saveOpen: true });
  }

  closeSaveModal = () => {
    this.setState({ saveOpen: false });
  }

  uploadToCanvas = (image) => {
      const canvas =  this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        this.setState({ photoIsDisplayed: true });
      }
      img.src = image;
  }

  getModifiedImage = (image) => {
    this.uploadToCanvas(image);  
    this.setState({ photo: image});
  }
}

UploadPhoto.propTypes = {
  user: PropTypes.object.isRequired
};

export default UploadPhoto;

import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.modal = props.modal;
    this.closeModal = props.closeModal;
    this.history = props.history;
    this.state = {imagesLoaded: false};
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.ensureModalOff = this.ensureModalOff.bind(this);
  }

  ensureModalOff() {
    if (this.modal) {
      this.closeModal();
      this.history.push('/signup');
    } else {
      this.history.push('/signup');
    }
  }

  handleImageLoaded() {
    this.setState({imagesLoaded: true});
  }

  render() {
    return (
      <div className='homepage-container'>
        <h2 className='homepage-header'>IOU - UOME.</h2>
        <div className='homepage-body'><strong>Share</strong> bills and IOUs. <strong>Make sure</strong> everyone gets paid back.</div>

        <div className='img-container'>
          <img id='a' src={ window.mainLogo1 } onLoad={this.handleImageLoaded}/>
          <img id='d' src={ window.mainLogo2 } onLoad={this.handleImageLoaded}/>
        </div>
        <button onClick={this.ensureModalOff} className='homepage-get-started-button'>Get started now<div className='button-small-font'>(it's free!)</div></button>
      </div>
    );
  }
}


export default withRouter(HomePage);

import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../modal';
import {ensureModalOff} from './home_page';
import { withRouter } from 'react-router-dom';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState(s => ({ dropdownOpen: !s.dropdownOpen }));
  }

  closeDropdown() {
    this.setState({ dropdownOpen: false });
  }

  render() {
    const { currentUser, modal, logout, openModal, closeModal, history } = this.props;
    if (!currentUser) {
      return (
        <ul className="login-signup">
          <li className="login-button-li">
            <button className='login-button' onClick={() => modalSwitch(modal, openModal, closeModal, 'login')}>Log in</button>
            <Modal/>
          </li>
          <li className="or">or</li>
          <li><button onClick={() => ensureModalOff(closeModal, modal, history)} className='signup-button'><Link to="/signup">Sign up</Link></button></li>
        </ul>
      );
    }

    return (
      <hgroup className="header-group">
        <div className="user-button-div">
          <button className="user-dropdown-button" onClick={this.toggleDropdown}>
            <img className='user-dropdown-img' src='/50-31b0bb2f5aec77f11d60a1dc3fa14c23a958fed79261b32e94a73e9c27473ebb.png'/>
            <span>{currentUser.name}</span>
            <div className='caret'>▼</div>
          </button>
          {this.state.dropdownOpen && (
            <div className='user-dropdown-modal-div'>
              <ul className='user-dropdown-modal'>
                <Link to='/'><li>&nbsp;&nbsp;&nbsp;Dashboard</li></Link>
                <li><button onClick={logout}>&nbsp;&nbsp;&nbsp;Logout</button></li>
              </ul>
              <div id="popover-arrow"></div>
            </div>
          )}
        </div>
      </hgroup>
    );
  }
}

function modalSwitch(modal, openModal, closeModal, whichModal) {
  if (modal) {
    return closeModal();
  } else {
    return openModal(whichModal);
  }
}

export default withRouter(Welcome);

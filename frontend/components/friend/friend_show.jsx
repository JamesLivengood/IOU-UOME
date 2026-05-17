import React from 'react';
import CreateBillModalContainer from '../dashboard/create_bill_modal_container';
import AllFriendsContainer from '../dashboard/all_friends_container';
import FriendHistory from './friend_history';

class FriendShow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      other_user:
      this.props.currentUser.friends.filter(friend => {
        if (friend.id == this.props.match.params.id) {return friend;}
      })[0],
      balance: this.props.currentUser.friend_and_balance_array.filter(info => {
        if (info.id == this.props.match.params.id) {return info;}
      })[0].balance,
      friendHistory: [],
    };
    this.friendExists = this.friendExists.bind(this);
    this.FriendBalance = this.FriendBalance.bind(this);
    this.openModalFilledIn = this.openModalFilledIn.bind(this);
  }

  friendExists() {
    if (!this.props.currentUser.friends.map(friend => friend.id).includes(parseInt(this.props.match.params.id))) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    this.props.closeModal();
    if (this.friendExists()){
      return this.props.fetchFriendHistory(this.props.match.params.id);
    }
  }


  FriendBalance() {
    let whoOwes = 'You are all settled up';
    let color = 'grey';
    let number = '';
    if (this.state.balance > 0) {
      whoOwes = `${this.state.other_user.name} owes you`;
      color = 'green';
      number = '$' + this.state.balance.toFixed(2);
    } else if (this.state.balance < 0) {
      whoOwes = `You owe ${this.state.other_user.name}`;
      color = 'orange';
      number = '$' + this.state.balance.toFixed(2).slice(1);
    }
    return (
      <div id={`${color}`}>
        <div className='friend-who-owes'>{whoOwes}</div>
        <div className='friend-balance-number'>{number}</div>
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.friendExists() && newProps.match.params.id !== this.props.match.params.id){
      return this.props.fetchFriendHistory(newProps.match.params.id);
    }
    this.setState({
      other_user: newProps.currentUser.friends.filter(friend => {
      if (friend.id == newProps.match.params.id) {return friend;}
    })[0],
      balance: newProps.currentUser.friend_and_balance_array.filter(info => {
        if (info.id == newProps.match.params.id) {return info;}
      })[0].balance,
      friendHistory: newProps.friendHistory
    });
  }

  openModalFilledIn() {
    this.props.otherBillUser(this.state.other_user);
    this.props.openModal('createBill');
  }

            // <AllFriendsContainer selectedFriendId={this.props.match.params.id}/>
  render() {
    if (!this.friendExists()) {
      return (
        <div className='friend-not-found'>Friend not found!</div>
      );
    } else {
    return(
          <div className="center-column">
            <div className="friend-column-header">
              <div className="center-column-header-top">
                <h2 className='friend-show-title'><img
                  className='dashboard-list-icon'
                  src='/50-31b0bb2f5aec77f11d60a1dc3fa14c23a958fed79261b32e94a73e9c27473ebb.png'
                  />
                  <div>{this.state.other_user.name}</div>
                </h2>
                <div className='top-dash-buttons'>
                  <button className='signup-button' onClick={this.openModalFilledIn}>Add a bill</button>
                </div>
              </div>
              <div className='friendship-history'>
                <FriendHistory fetchBill={this.props.fetchBill} openModal={this.props.openModal} friendHistory={this.state.friendHistory} currentUser={this.props.currentUser} otherUser={this.state.other_user}/>
              </div>

            </div>
          </div>
    );}
  }

}

export default FriendShow;

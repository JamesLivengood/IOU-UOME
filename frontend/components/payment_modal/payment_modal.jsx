import React from 'react';

class PaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
      payingUser: this.props.currentUser,
      receivingUser: this.props.otherUser,
      paymentAmount: '',
    };
    this.PopUp = this.PopUp.bind(this);
    this.flipPopUp = this.flipPopUp.bind(this);
    this.setPaidUser = this.setPaidUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({receivingUser: newProps.otherUser});
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit() {
    const payment = {
      bill_id: this.props.bill.id,
      paying_user_id: this.state.payingUser.id,
      submitting_user_id: this.props.currentUser.id,
      payment_amount: this.state.paymentAmount,
      };

    this.props.createPayment(payment).then(()=>this.props.fetchFriendHistory(this.props.otherUser.id));

    this.props.closeModal();
  }

  PopUp() {
    if (this.state.popUp) {
      return(
        <div className='payment-pop-up'>
          <h3>Choose Payer</h3>
          <ul>
            <li onClick={()=>this.setPaidUser('me')}><img src='/100-4c516cdaad9fa42b890727b03e49634a199eaba880df708835105dfa42fac74b.png'/>
              {this.props.currentUser.name}
            </li>
            <li onClick={()=>this.setPaidUser('other')}><img src='/100-4c516cdaad9fa42b890727b03e49634a199eaba880df708835105dfa42fac74b.png'/>
              {this.props.otherUser.name}
            </li>
          </ul>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

  setPaidUser(str) {
    if (str === 'me') {
      this.setState({payingUser: this.props.currentUser, receivingUser: this.props.otherUser});
    } else if (str === 'other') {
      this.setState({payingUser: this.props.otherUser, receivingUser: this.props.currentUser});
    }
    this.flipPopUp();
  }

  flipPopUp() {
    return (this.state.popUp ? this.setState({popUp:false}) : this.setState({popUp:true}));
  }

  render() {
    return(
      <div className='payment-modal-outer-div'>
        <div className='payment-modal-div'>

          <div className='payment-modal-header'><div>Make payment</div></div>

          <div className='payment-form-pics'>
            <img className='payment-icon' src='/100-4c516cdaad9fa42b890727b03e49634a199eaba880df708835105dfa42fac74b.png'/>
            <img className='payment-arrow' src='/settle-up-arrow-83553d33b6848bbdfa3499d7e217748aab1f75ff2073ec5ac67cba5246e12459.png'/>
            <img className='payment-icon' src='/100-4c516cdaad9fa42b890727b03e49634a199eaba880df708835105dfa42fac74b.png'/>
          </div>

          <div className='payment-modal-who-pay-who'>
            <button onClick={this.flipPopUp}>{this.state.payingUser.name}</button>
            <div> paid </div>
            <button >{this.state.receivingUser.name}</button>
          </div>

          <form className='payment-modal-form' onSubmit={this.props.createPayment}>
            <label>$
              <input placeholder='0.00' type='text' name='paymentAmount' value={this.state.paymentAmount} onChange={this.handleChange}>
              </input>
            </label>
            <button></button>
          </form>

          <div className='payment-button-holder'>
            <div className='cancel-or-save-buttons-div'>
              <button className="create-bill-cancel-button" onClick={this.props.closeModal}>Cancel</button>
              <button className="create-bill-save-button" onClick={this.handleSubmit}>Save</button>
            </div>
          </div>
        </div>
        <this.PopUp/>
      </div>
    );
  }

}

export default PaymentModal;

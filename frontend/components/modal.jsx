import React from 'react';
import { connect } from 'react-redux';
import LoginFormContainer from './session/login_form_container';
import UserDropdown from './welcome/user_welcome_bar_dropdown';
import { closeModal } from '../actions/modal_actions';
import CreateBillModalContainer from './dashboard/create_bill_modal_container';
import DashboardList from './dashboard/dashboard_list';
import DashboardChart from './dashboard/dashboard_chart';
import AddFriendModalContainer from './dashboard/add_friend_modal_container';
import PaymentModalContainer from './payment_modal/payment_modal_container';

function Modal({modal, closeModal, logout, owedBills, owedToBills, owedToBillsInfo, owedBillsInfo}) {
  //
  if (!modal) {
    return null;
  }
  let component;
  let backgroundOffClick;
  let backgroundColor;
  switch (modal) {
    case 'userDropdown':
      component = <UserDropdown logout={logout} />;
      backgroundOffClick = true;
      backgroundColor = 'modal-background';
    break;
    case 'login':
      component = <LoginFormContainer />;
      backgroundOffClick = false;
      backgroundColor = 'modal-background';
    break;
    case 'createBill':
      component = <CreateBillModalContainer />;
      backgroundOffClick = true;
      backgroundColor = 'grey-modal-background';
    break;
    case 'dashboardList':
      component = <DashboardList owedBills={owedBills} owedtoBills={owedToBills} owedToBillsInfo={owedToBillsInfo} owedBillsInfo={owedBillsInfo}/>;
      backgroundOffClick = false;
      backgroundColor = 'modal-background';
    break;
    case 'dashboardChart':
      component = <DashboardChart />;
      backgroundOffClick = false;
      backgroundColor = 'modal-background';
    break;
    case 'addFriend':
      component = <AddFriendModalContainer />;
      backgroundOffClick = true;
      backgroundColor = 'grey-modal-background';
    break;
    case 'paymentModal':
      component = <PaymentModalContainer />;
      backgroundOffClick = true;
      backgroundColor = 'grey-modal-background';
    break;
    default:
      return null;
  }
  if (backgroundOffClick){
    return (
      <div className={backgroundColor} onClick={closeModal}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          { component }
        </div>
      </div>
    );} else {
      return (
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            { component }
          </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

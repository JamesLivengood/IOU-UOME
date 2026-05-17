import React from 'react';

const DashboardList = ({owedBills, owedToBills, owedBillsInfo, owedToBillsInfo, openModal, fetchBill}) => {
  //  


  return(

        <div className='dashboard-list-box'>
          <ul className='orange-dashboard-list'>
            {owedBills.map((bill, idx) => {
              //  
              if (!(owedBillsInfo[idx].balance.toFixed(2) == 0.00)) {
              return (
                <li key={idx}><DashboardListItem bill={bill} info={owedBillsInfo[idx]} owed={true} openModal={openModal} fetchBill={fetchBill} /></li> );
              }})}
          </ul>
          <ul className='green-dashboard-list'>
            {owedToBills.map((bill, idx) => {
              if (!(owedToBillsInfo[idx].balance.toFixed(2) == 0.00)) {
              return (
              <li key={idx}><DashboardListItem bill={bill} info={owedToBillsInfo[idx]} owed={false} openModal={openModal} fetchBill={fetchBill} /></li> );
              }})}
          </ul>
        </div>

  );
};

const DashboardListItem = ({bill, info, owed, openModal, fetchBill}) => {
  //  
  const oweOrOwed = owed ? 'you owe' : 'owes you' ;

  const openModalAndFetch = (id) => {
    fetchBill(id);
    return openModal('paymentModal');
  }

  return (
    <button onClick={()=>openModalAndFetch(bill.id)}>
      <div className='dashboard-list-item-div'>
        <img className='dashboard-list-icon' src='/50-31b0bb2f5aec77f11d60a1dc3fa14c23a958fed79261b32e94a73e9c27473ebb.png'></img>
        <div className='dashboard-list-info'>
          <div className='dashboard-list-name'>{info.name}</div>
          <div className='dashboard-list-amount'>{oweOrOwed} <span className='bold-balance'>${Math.abs(info.balance).toFixed(2)}</span></div>
        </div>
      </div>
    </button>
  );
};
// const DashboardList

export default DashboardList;

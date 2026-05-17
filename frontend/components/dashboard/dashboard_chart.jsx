import React from 'react';
import { Link } from 'react-router-dom';

const DashboardChart = ({highestFriendBalance, friendAndBalanceArray}) => {
  //
  return(
      <div className='dashboard-chart-box'>
        <ul className='orange-dashboard-chart'>
          <OrangeMap highestFriendBalance={highestFriendBalance} friendAndBalanceArray={friendAndBalanceArray}/>
        </ul>
        <img className='chart-main-pic' src='/person.png'></img>
        <ul className='green-dashboard-chart'>
          <GreenMap highestFriendBalance={highestFriendBalance} friendAndBalanceArray={friendAndBalanceArray}/>
        </ul>
      </div>
  );
};

const OrangeMap = ({highestFriendBalance, friendAndBalanceArray}) => {
  return (
    friendAndBalanceArray.reverse().map((friendItem, idx) => {
        if (friendItem.balance.toFixed(1) < 0.0) {
          //
          return (<li key={idx}>
                    <DashboardChartItem owed={true} balance={friendItem.balance} name={friendItem.name} id={friendItem.id} highestFriendBalance={highestFriendBalance}/>
                  </li>);
        }
    })
  );
};

const GreenMap = ({highestFriendBalance, friendAndBalanceArray}) => {
  return (
    friendAndBalanceArray.reverse().map((friendItem, idx) => {
        if (friendItem.balance.toFixed(1) > 0.0) {
          return (<li key={idx}>
                    <DashboardChartItem owed={true} balance={friendItem.balance} name={friendItem.name} id={friendItem.id} highestFriendBalance={highestFriendBalance}/>
                  </li>);
        }
    })
  );
};

const DashboardChartItem = ({owed, balance, name, id, highestFriendBalance}) => {
  // const oweOrOwed = owed ? 'you owe' : 'owes you' ;
  //
  const width = Math.abs(((balance / highestFriendBalance) * 210)).toString();
  const size = Math.sqrt(Math.abs(((balance / highestFriendBalance) * 225))).toString();

  if (width > 80) {
    return (
        <Link to={`/friend/${id}`}>
          <div className='dashboard-chart-item-div' style={{width:`${width}px`, fontSize:`${size}px`}}>
            <nav className='dashboard-chart-name' >{name}</nav>
            <div className='dashboard-chart-amount'>${balance.toFixed(2)}</div>
          </div>
        </Link>
    ); } else {
      let thisWidth;
      if (width < 10) {
        thisWidth = 10;
      } else {
        thisWidth = width;
      }
      return (
        <Link to={`/friend/${id}`}>
          <div className='dashboard-chart-item-div' style={{width:`${thisWidth}px`, fontSize:`12px`}}>
            <nav className='dashboard-chart-name' >...</nav>
          </div>
          <div className='filler-name'>{name}</div>
        </Link>);
    }
};

export default DashboardChart;

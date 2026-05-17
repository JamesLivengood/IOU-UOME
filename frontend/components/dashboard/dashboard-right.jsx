import React from 'react';

class DashboardRight extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let idx = 0;
    const liArr = [];
    while (idx < 10) {
      let li;
      if (this.props.currentUser.recent_activity[idx]) {
        if (!(this.props.currentUser.recent_activity[idx].bill_id)) {
          let bill = this.props.currentUser.recent_activity[idx];
          li = <li>New Bill: ${bill.amount_originally_owed}</li>
        } else {
          li = <li>payment made</li>
        }
      }
      liArr.push(li);
      idx++;
    }
    this.props.currentUser.recent_activity
    return(
      <ul className='dashboard-right-ul'>
        {liArr}
      </ul>
    );
  }

}

export default DashboardRight;

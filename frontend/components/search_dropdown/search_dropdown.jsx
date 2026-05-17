import React from 'react';
import { Link } from 'react-router-dom';

class SearchDropdown extends React.Component {

  constructor(props) {
    super(props);
    //  
  }

  componentWillReceiveProps({userResults}) {
    //  
    if (this.props.userResults.length === 0 && userResults.length > 0) {
      window.addEventListener('click', this.props.clearSearch, {once: true} );
    } else if (userResults.length > 0 === 0 ) {
      return this.props.clearSearch();
    }
  }

  render() {
    const userResults = this.props.userResults.map((user, idx) => (
      <button className='dropdown-button'
        onClick={()=>this.props.dropdownAction({
            user1_id: this.props.currentUser.id,
            user2_id: user.id})}
        key={ idx }>
        <li className='dropdown-item'>
          <img src='/50-31b0bb2f5aec77f11d60a1dc3fa14c23a958fed79261b32e94a73e9c27473ebb.png'/>
          <div>{user.name}</div>
          </li>
    </button>
    ));

    const hidden = (this.props.userResults.length === 0) ? '-hidden' : '';

    return (
      <ul className={ `search-dropdown${hidden}` }>
        { userResults }
      </ul>
    );
  }
}

export default SearchDropdown;

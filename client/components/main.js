import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {bindActionCreators} from 'redux';
import { Sidebar,Icon, Segment,Menu} from 'semantic-ui-react';
import {changeSearch, changeOrder} from '../store/products'
import NavBar from './NavBar'
import CartBarContainer from './CartBarContainer'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.handleSidebar = this.handleSidebar.bind(this)
  }
  handleSidebar(){
    this.setState({visible: !this.state.visible})
  }
  createNotification(){
    return NotificationManager.success('Success message', 'Title here');
  }
  render() {
    const {cart,children, handleClick, isLoggedIn, changeOrder, changeSearch,logout,user} = this.props
    return (
      <div>
        <NavBar cart={cart} user={user} logout={logout} toggleCart={this.handleSidebar} changeOrder={changeOrder} changeSearch={changeSearch} loggedIn={isLoggedIn}/>
        <Sidebar.Pushable as={"div"}>
            <Sidebar
              as={Segment} className="sideBarSegment" animation='overlay' width='wide' direction='right' visible={cart.length && this.state.visible} icon='labeled' vertical
            >
              <CartBarContainer/>
            </Sidebar>
            <Sidebar.Pusher>
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    );
  }

}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.currentUser.id,
    user: state.user.currentUser,
    cart: state.lineItems
  }
}

function mapDispatch(dispatch){
  return bindActionCreators({logout,changeSearch,changeOrder},dispatch)
}
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

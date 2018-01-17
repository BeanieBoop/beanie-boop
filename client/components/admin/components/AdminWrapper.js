import React from 'react';
import {Segment} from 'semantic-ui-react';
import {Route, Switch, Router} from 'react-router-dom'
import AdminNav from './AdminNav'
import AdminUsers from './AdminUsers'
import AdminProducts from './AdminProducts'
import AdminOrders from './AdminOrders'

const AdminWrapper = ({categories,users, makeAdminThunk,products,putProduct,putOrder,orders}) => (
	<div>
		<AdminNav categories={categories}/>
			<Switch>
				<Route path="/admin/users" render={()=><AdminUsers makeAdmin={makeAdminThunk} users={users}/>} />
				<Route path="/admin/products" render={()=><AdminProducts putProduct={putProduct} products={products}/>} />
				<Route path="/admin/orders" render={()=><AdminOrders putOrder={putOrder} orders={orders} products={products}/>}  />
			</Switch>
	</div>
);


const styles={
	segment: {
		height: 'calc(100vh - 140px)',
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: '30px',
		marginRight: '30px',
		marginTop: '10px'
	}
}
export default AdminWrapper;

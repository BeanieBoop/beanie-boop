import React from 'react';
import {withRouter,NavLink} from 'react-router-dom'
import {TiArrowUnsorted} from 'react-icons/lib/ti';
import {Icon,Input,Dropdown} from 'semantic-ui-react';
const FilterNav = ({match,categories, category ,changeCategory,changeOrder}) => (
	<div style={container}>
		<div style={categoryContainer}>
			<NavLink to='/' style={match.params.catId ? catTab : activeTab} >All</NavLink>
			{categories.map(cat => <NavLink key={cat.id}  style={catTab} activeStyle={activeTab}  to={`/category/${cat.id}`}>{cat.name}</NavLink>)}
		</div>
		<div style={sort}>
			<Icon style={{color: "rgba(0,0,0,.4)"}} name="sliders"/>
			<span style={sortText}>sort by:</span>
			<Dropdown onChange={(event,data)=>changeOrder(data.value)} className="sortInput" input={{style:{border: '2px solid #ccc'}}} placeholder='State' selection options={options} />
		</div>

	</div>
);

const options = [
  { key: 'descDate', icon: 'sort descending', text: 'Date Added', value: 'descDate' },
	{ key: 'ascDate', icon: 'sort ascending', text: 'Date Added', value: 'ascDate' },
	{ key: 'descName', icon: 'sort descending', text: 'Name', value: 'descName' },
	{ key: 'ascName', icon: 'sort ascending', text: 'Name', value: 'ascName' },
	{ key: 'descPrice', icon: 'sort descending', text: 'Price', value: 'descPrice' },
	{ key: 'ascPrice', icon: 'sort ascending', text: 'Price', value: 'ascPrice' },
]
const styles={
	container: {
		height: "50px",
		display: 'flex',
		justifyContent: "space-between",
		alignItems: 'center',
		paddingLeft: "30px",
		background: 'white',
		boxShadow: "0 0 6px -3px rgba(0, 0, 0, 1)"
	},
	categoryContainer: {
		display: 'flex',
	},
	activeTab:{
		color: '#ff4d4d',
		fontSize: '16px',
		marginLeft: "10px",
		marginRight: "10px",
		width: "120px",
		textAlign: 'center',
		paddingBottom: "10px",
		marginTop: '15px',
		borderBottom: '4px solid #ff4d4d'
	},
	catTab: {
		fontSize: '16px',
		color: "rgba(0,0,0,.4)",
		marginLeft: "10px",
		marginRight: "10px",
		width: "120px",
		textAlign: 'center',
		paddingBottom: "10px",
		marginTop: '15px',
		borderBottom: '4px solid white'
	},
	sort: {
		marginRight: "30px"
	},
	sortText: {
		marginRight: "30px",
		fontSize: '16px',
		color: "rgba(0,0,0,.4)"
	}

}

const {container,catTab,activeTab, categoryContainer,sort, sortText} = styles

export default withRouter(FilterNav);

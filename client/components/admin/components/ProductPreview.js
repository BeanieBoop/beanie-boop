import React from 'react';
import {Icon, Table, Button,Segment,Accordion,Image,List} from 'semantic-ui-react';

const ProductReview = ({order}) => (
	<div>
		{order.lineitems.map(lineItem => {
			return (
				<div key={lineItem.id}>
					<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<Image style={{width: "40px",height: "40px",margin: '10px'}} src={lineItem.product.imgUrl}/>
								<div style={{marginLeft: "5px"}}>
									<h5 >{lineItem.product.name}</h5>
								</div>
						</div>

						<div style={{display: 'flex',width: "100px", justifyContent: 'flex-end'}}>
							<div style={{width: "20px"}}>{lineItem.quantity}</div>
							<div style={{width: "20px"}}>@</div>
							<div style={{width: "60px"}}>{`$ ${lineItem.unitPrice/100}`}</div>
						</div>
					</div>
					<hr/>
				</div>
			)
		})}
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<div>
				<h3> Total: </h3>
			</div>
			<div>
				<h3 style={{color: "rgb(255, 77, 77)"}}>$ {order.lineitems.reduce((total, lineitem)=> total + (lineitem.quantity * (lineitem.unitPrice/100)),0)} </h3>
			</div>
		</div>
	</div>
);

export default ProductReview;

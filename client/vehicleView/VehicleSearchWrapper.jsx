import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import VehicleForm from './InventoryForm.jsx';
import VehicleSingle from './InventorySingle.jsx';





export default class VehicleSearchWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		
		this.state = {
			
			subscription: {
				inventorySearch: Meteor.subscribe("queryInventory", "")
			}
		}
	}

	//uncomment to empty the queried item subscriptions
	componentWillUnmount() {
		//this.state.subscription.inventorySearch.stop();
	}


	updateState(event) {
		event.preventDefault();
		this.setState({
			
			subscription: {
				inventorySearch: Meteor.subscribe("queryInventory", this.refs.query.value.trim())
				}
			})
		this.updateSesh(event);
	}

	updateSesh(event) {
		event.preventDefault();
		Session.set('query', this.refs.query.value.trim());
		this.forceUpdate();
	}


	inventoryItems() {
		
		return Inventory.find({inventoryItemName: Session.get('query')}).fetch();
	}
	

	render() {
		
		return(
			<div>
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Search Inventory Items</h1>
				</div>
				<div className="panel-body">
				<form 
				className="form-horizontal" 
				onSubmit={this.updateState.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="searchTerm">Search Term:
					</label>
					<div className="col-sm-10">
					<input 
						type="text"
						id="searchTerm"
						ref="query"
						placeholder="Search Term"
						className="form-control"
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
				</div>
				
				<h4>Search Results</h4>
				<table className="table">
					<thead>
						<tr>
							<td>Item Id</td>
							<td>Item Name</td>
							<td>Item Quantity</td>
						</tr>
					</thead>
					<tbody>
					{this.inventoryItems().map( (inventoryItems) => {
						return <InventorySingle key={inventoryItems._id} inventoryItem={inventoryItems} />
					})}
					</tbody>
				</table>
				</div>
			</div>

		)
	}
}
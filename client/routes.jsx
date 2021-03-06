import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import Reporting from './Reporting.jsx';
import InventoryInputWrapper from './inventoryView/InventoryInputWrapper.jsx';
import InventorySearchWrapper from './inventoryView/InventorySearchWrapper.jsx';
import InventoryDetail from './inventoryView/InventoryDetail.jsx';

import JobInputWrapper from './jobView/JobInputWrapper.jsx';

import HomePage from './HomePage.jsx';



FlowRouter.route('/', {
	action() {
		mount(MainLayout, {
			content: (<HomePage />),
		})
	}
})

FlowRouter.route('/inventoryInput', {
	action() {
		mount(MainLayout, {
			content: (<InventoryInputWrapper />),
		})
	}
})

FlowRouter.route('/inventorySearch', {
	action() {
		mount(MainLayout, {
			content: (<InventorySearchWrapper />),
		})
	}
})

FlowRouter.route('/inventory/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<InventoryDetail id={params.id} />),
		})
	}
})

FlowRouter.route('/reporting', {
	action() {
		mount(MainLayout, {
			content: (<JobInputWrapper />),
		})
	}
})


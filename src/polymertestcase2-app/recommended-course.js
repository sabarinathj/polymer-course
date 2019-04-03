import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "@polymer/polymer/lib/elements/dom-repeat.js";
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sorter';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@polymer/paper-button/paper-button.js';

export class recommendedCourse extends PolymerElement{
	constructor(){
		super();
	}
	connectedCallback(){
		super.connectedCallback();
		if(sessionStorage.length > 0){
			sessionStorage.getItem("userData");
		}
		/*let sessionData = '<%= Session["userData"] %>';
		if(sessionData.value != null && sessionData.value != ''){

		} else{
			document.querySelector("polymertraining-app").set('route.path', '/login');
		}*/
	}
	ready(){
		super.ready();
		
		
		console.log("ready call back triggered", document);
		let ajaxCall = this.$.ajax;
		ajaxCall.url = "http://localhost:3000/course/rest/getAllCourse";
		
	}
	static get properties() {
		
	}
	_handleResponse(event){
		console.log("test");
		console.log(event.detail.response);
		//console.log(event.target.lastresponse);
		this.data = event.detail.response;
		//_handleBuystatus(this.data.status);

	}
	_handleBuystatus(status){
		console.log("enter status");
		return status === "New";
	}
	buyPet(event){
		//console.log("butpet", this);
		console.log("butpet event", event.model.item.id, JSON.parse(sessionStorage.userData).data.userName);
		let ajaxBuyPetCall = this.$.ajax;
		ajaxBuyPetCall.method = "POST";
		ajaxBuyPetCall.url = "http://10.117.214.180:3001/pets/rest/buyPet";
		ajaxBuyPetCall.body = {"id": event.model.item.id, "userName": JSON.parse(sessionStorage.userData).data.userName};
		ajaxBuyPetCall.generateRequest(); 
		ajaxBuyPetCall.onResponse = "_handleBuyPets";
		
		
	}
	_handleBuyPets(status){
		this.data = event.detail.response;
		console.log("response data: ",this.data)
		if(this.data.status === "success"){
			alert("pet purchased successfully")
			document.querySelector("polymertraining-app").set('route.path', '/my-pets');
		}	
	}
	
	static get template(){
		
		return html `
			
			<p>This shows all Available pets</p>
			<iron-ajax 
			id="ajax" 
			auto 
			handle-as="json"
			on-response="_handleResponse"
			debounce-duration="300"
			content-type="application/json"
			></iron-ajax>
			
			<vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort  items={{data}}>
				<vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
				<vaadin-grid-sort-column width="5em" path="id"></vaadin-grid-sort-column>
				<vaadin-grid-sort-column width="5em" path="name"></vaadin-grid-sort-column>
				
				<vaadin-grid-sort-column width="5em" path="age"></vaadin-grid-sort-column>
				<vaadin-grid-sort-column width="5em" path="place"></vaadin-grid-sort-column>
				<vaadin-grid-column width="5em">
					<template>
						<template is="dom-if" if="[[_handleBuystatus(item.status)]]">
							<paper-button raised  on-click="buyPet">
								{{item.status}}	
							</paper-button>
						</template>
						<template is="dom-if" if=[[!_handleBuystatus(item.status)]]>
							{{item.status}}
						</template>
					</template>
					
				</vaadin-grid-column>	
			</vaadin-grid>
		`
	}

}

customElements.define('recommended-course',recommendedCourse);
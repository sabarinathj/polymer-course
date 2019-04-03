import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "@polymer/polymer/lib/elements/dom-repeat.js";
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sorter';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@vaadin/vaadin-crud/vaadin-crud.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';

import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {PaperDialogBehavior} from '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';

export class myCourse extends PolymerElement{
	constructor(){
		super();
	}
	ready(){
		super.ready();
		console.log("in ready state")
		sessionStorage.getItem("userData");
		//console.log("ready call back triggered", document);
		let ajaxMyCourses = this.$.ajax;
		ajaxMyCourses.method = "POST";
		ajaxMyCourses.url = "http://localhost:3000/course/rest/myEnrolledCourses";
		ajaxMyCourses.body = {"emailId": JSON.parse(sessionStorage.userData)};
		
		//ajaxMyPetCall.onResponse = "_handleResponse";
		ajaxMyCourses.generateRequest(); 
	}
	_handleResponse(event){
		console.log("test");
		console.log(event.detail.response);
		//console.log(event.target.lastresponse);
		this.data = event.detail.response;
		
		for(let i = 0; i< event.detail.response.length; i++){
			this.exclude.push(event.detail.response[i].ID);
		}
		//console.log("cache data",this.$.grid.clearCache());	
		//console.log(event.detail.response.Course_id);
		//this.exclude = event.detail.response.Course_id;
		//_handleBuystatus(this.data.status);

	}
	_openDialog(event){
		this.$.updateCourseDialog.open();
		console.log(event.model.__data.item);
		this.ID = event.model.__data.item.ID;
		this.courseName = event.model.__data.item.COURSE_NAME;
		this.status = event.model.__data.item.STATUS;
		this.teachothers = event.model.__data.item.TEACHOTHERS;
		this.comments = event.model.__data.item.COMMENTS;
		//this.updatedata = event.detail.response;
		//updateCourseDialog.toggle();
	}
	_updateCourseDetails(event){
		console.log("updated details of course: ",event);
		if(this.$.updateCourseDetails.validate()) {
            console.log("entered values are",this.id,this.status,this.teachothers, this.comments);
            let ajaxCall = this.$.ajaxRequest;
           // ajaxCall.url = "http://localhost:3000/users/rest/login";
            //ajaxCall.body = {"userName": this.userName, "password": this.passWord};
			//ajaxCall.generateRequest(); 
			this.$.updateCourseDialog.open();
        }
	}

	modalAlertDlg(){
		this.$.modalAlertId.open();
	}
	_checkCrud(){
		let crudData = document.querySelector('vaadin-crud').items;
		console.log("cruditems: ",crudData )
	}
	static get properties() {
		return {
			exclude:{
				type: Array,
				value: []
			},
			ID:{
				type: Number
			},
			courseName:{
				type: String
			},

		}
	}
	
	static get template(){
		
		return html `
			<style>
				p{
					color: --primary-color;
				}
				#updateCourseDialog{
					width: 70%;
				}
			</style>
			<p>This show Courses I Enrolled</p>
			<iron-ajax 
			auto
			id="ajax" 
			handle-as="json"
			on-response="_handleResponse"
			debounce-duration="300"
			content-type="application/json"
			></iron-ajax>

			<!--<vaadin-crud id="grid" items={{data}} on-click="_checkCrud">
				<vaadin-grid slot="grid">
					<vaadin-grid-column path="ID" header="Course ID"></vaadin-grid-column>
					<vaadin-grid-column path="COURSE_NAME" header="course Name"></vaadin-grid-column>
				</vaadin-grid>
			</vaadin-crud>-->
			
			<vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort  items={{data}}>
				<vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
				<vaadin-grid-sort-column width="5em" path="COURSE_ID" header="Course ID"></vaadin-grid-sort-column>
				<vaadin-grid-sort-column width="5em" path="COURSE_NAME" header="course Name"></vaadin-grid-sort-column>
				
				<vaadin-grid-column width="5em" header="course Name">
					<template>
						<paper-button raised   on-click="_openDialog">Update</paper-button>
						<!--<paper-button raised   onclick="modalAlert.toggle()">Update</paper-button>-->
						
					</template>
				</vaadin-grid-column>
			</vaadin-grid>
			
			<paper-dialog id="updateCourseDialog">
				<h2>Update Course Details</h2>
				
				<paper-dialog-scrollable>
					
						<iron-form id="updateCourseDetails">
							<form>
								<paper-input label="Course ID" required value=[[ID]] auto-validate error-message="Cannot be Empty" disabled></paper-input>
								<paper-input label="Course Name" required value=[[courseName]] disabled></paper-input>
								<div>
								<paper-dropdown-menu label="Current Status">
									<paper-listbox slot="dropdown-content" selected={{status}}>
										<paper-item>Not Yet Started</paper-item>
										<paper-item>In Progress</paper-item>
										<paper-item>Completed</paper-item>
									</paper-listbox>
								</paper-dropdown-menu>
								</div>
								<label id="teach">Teach Others:</label>
								<paper-radio-group  aria-labelledby="teach" selected={{teachothers}}>
									<paper-radio-button name="yes">Yes</paper-radio-button>
									<paper-radio-button name="no">No</paper-radio-button>
								</paper-radio-group>
								<paper-input label="Comments" required value={{comments}} class="d-inline-block" auto-validate error-message="Must enter comments"></paper-input>
								<br/>
								<div class="buttons pull-right">
									<paper-button dialog-dismiss>Cancel</paper-button> 
									 <paper-button raised on-click="_updateCourseDetails">Update</paper-button>
								</div>
								<br/>	 
							</form>
						</iron-form>
						<!--<paper-button raised on-click="modalAlertDlg">More Details</paper-button>
						<paper-dialog id="modalAlertId" modal role="alertdialog">
							This shows more details
							<div class="buttons">
								<paper-button dialog-confirm autofocus>OK</paper-button>
							</div>
						<paper-dialog>-->
					
					
				</paper-dialog-scrollable>
				
			</paper-dialog>
		`
	}
}

customElements.define('my-course',myCourse);
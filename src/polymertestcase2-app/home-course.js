import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "@polymer/polymer/lib/elements/dom-repeat.js";
import '@vaadin/vaadin-grid/vaadin-grid.js';
//import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
//import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
//import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle.js';
//import '@vaadin/vaadin-accordion/vaadin-accordion.js';
//import '@vaadin/vaadin-crud/vaadin-crud.js';
import '@polymer/paper-button/paper-button.js';

class homeCourse extends PolymerElement{
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
		this.requestType = 'allcourses';
		ajaxCall.generateRequest(); 
	}
	static get properties() {
		return{

		}	
	}
	_handleResponse(event, requestType){
		console.log("current ajax type", this.requestType);
		console.log("test");
		switch(this.requestType){
			case "allcourses":
				console.log(event.detail.response);
				this.data = event.detail.response;
				break;
			case "enrolledcourses":
				console.log("enrolled course info ",event.detail.response);	
				//console.log("current table data", event.model.__data.item);
				//let currentRow = event.model.__data.item;
				//currentRow.isDisabled =true;
				//document.querySelector('polymertestcase2-app').set('route.path','/my-course');
				window.history.pushState({}, null, '/my-course');
				//window.dispatchEvent(new CustomEvent('location-changed'));

				break;
		}
		

	}
	enrollCourse(event){
		console.log("this course id",this);
		console.log("this event is",event.model.__data.item.courseId);
		let sessionUser = JSON.parse(sessionStorage.getItem("userData"));
		if(sessionStorage.length == 0){
			document.querySelector('polymertestcase2-app').set('route.path','/login');	
		}else{
			let enrollCourseajax = this.$.ajax;
			enrollCourseajax.method = "POST";
			enrollCourseajax.url = "http://localhost:3000/course/rest/enroleUser";
			enrollCourseajax.body = {"courseid": event.model.__data.item.courseId, "courseName": event.model.__data.item.courseName, "emailId": sessionUser}
			enrollCourseajax.generateRequest(); 
			this.requestType = 'enrolledcourses';
			//enrollCourseajax.onResponse = '_afterEnroll';
		}
		console.log("session user data is: ", sessionUser);
		
	}
	_afterEnroll(event){
		console.log("enrolled course info ",event.detail.response);	
		this.isDisabled =true;
		document.querySelector('polymertestcase2-app').set('route.path','/my-course');
	}
	isUiCourse(searchData){
		searchData = 'hello';
		return function(item){
			return item.courseName.indexOf(searchData) > -1
		}
	}
	bySort(event){
		return function(){
			return event.model.__data.item.courseName.sort();
		}
			
		/*if(event.model.__data.item.courseName.sort()){
			return 1;
		}else{
			return -1;
		}*/	
	}
	static get template(){
		
		return html `
			<section  class="container mt-3">
				<p>This shows all Courses Page</p>
				<iron-ajax 
				id="ajax" 
				handle-as="json"
				on-response="_handleResponse"
				debounce-duration="300"
				content-type="application/json"
				></iron-ajax>
				
				<!--<vaadin-crud items={{data}}>
				</vaadin-crud>-->
				<!--<table>
				<dom-repeat items="{{data}}" filter="byName">
					<
				</dom-repeat>
				</table>-->
				

				
				<vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort  items={{data}}>
					<template class="row-details">
						<div class="details">
							<dom-repeat items="{{item.title}}">
								{{item.courseTitle}} -- {{item.courseTitleId}}
							</dom-repeat>
						</div>
					</template>
					<vaadin-grid-sort-column  path="courseName" header="courseName"></vaadin-grid-sort-column>
					<vaadin-grid-sort-column  path="courseId" header="courseId"></vaadin-grid-sort-column>
					<vaadin-grid-column width="100px">
						<template class="header">Details</template>
						<template>
							<vaadin-checkbox aria-label$="Show Details for [[item.courseName]]" checked="{{detailsOpened}}">Show Details</vaadin-checkbox>
						</template>
					</vaadin-grid-column>	
					
				</vaadin-grid>
			</section>
			
		`
	}
	
	

}

customElements.define('home-course',homeCourse);
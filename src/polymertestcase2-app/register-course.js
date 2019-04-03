import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { sharedStyles } from './shared-styles.js';

class registerCourse extends PolymerElement{
	onReady(){
		debugger;
		console.log(document.querySelector('polymertraining-app'));
	}
	static get properties() {
		return{
            userName:{
                type: String
            },
            passWord:{
                type: String
			},
			contact:{
				type: Number
			},
			address:{
				type: String
			}
        }
    }
    regsiterUser(event){
        console.log(this);

        if(this.$.registerform.validate()) {
			console.log("entered values are",this.name, this.sapID, this.emailId, this.primarySkill);
			let skills = this.primarySkill;
			let skillsSplit = skills.split(',');
			console.log(skillsSplit);
			let skillsArray = [];
			for (let i=0; i< skillsSplit.length;i++){
				skillsArray.push(skillsSplit[i]);
			}
			console.log(skillsArray);
            let ajaxCall = this.$.ajaxRequest;
            ajaxCall.url = "http://localhost:3000/users/rest/registerUser";
            ajaxCall.body = {"name": this.name,"sapId": this.sapId, "emailId": this.emailId, "primarySkill": skillsArray, "band": this.band, "password": this.passWord, "contact": this.contact, "address": this.address};
            ajaxCall.generateRequest(); 
        }
        

    }
    handleResponse(event){
        this.data = event.detail.response;
		console.log("response data: ",this.data)
		if(this.data.status === "success"){
			document.querySelector("polymertestcase2-app").set('route.path', '/login');
		}
	}
	
	static get template(){
		
		return html `
		${sharedStyles}
			<section class="col-12 offset-md-4 col-sm-4 mt-4 border p-2 rounded">
				<h2>This is Registration screen</h2>
				<iron-form id="registerform">
					<form>
						<paper-input label="Name" required value={{name}} auto-validate error-message="Cannot be Empty"></paper-input>
						<paper-input label="SapID" required value={{sapId}} auto-validate error-message="Cannot be Empty"></paper-input>
						<paper-input label="Email ID" required value={{emailId}} type="email" auto-validate error-message="Cannot be Empty or Email format incorrect"></paper-input>
						<paper-input label="primary Skill" required value={{primarySkill}} auto-validate error-message="Must add one primary skill"></paper-input>
						<paper-input label="Band" required value={{band}} auto-validate error-message="Enter your Band"></paper-input>
						<paper-input label="Password" type="password" required value={{passWord}} auto-validate error-message="Cannot be Empty"></paper-input>
						<paper-button raised on-click="regsiterUser">Register</paper-button>
					</form>
				</iron-form>
			</section>
            <iron-ajax
                id="ajaxRequest"
                method="post"
                handle-as="json"
                on-response="handleResponse"
				debounce-duration="300"
				content-type="application/json">
			</iron-ajax>
			
		`
	}
}

customElements.define('register-course',registerCourse);
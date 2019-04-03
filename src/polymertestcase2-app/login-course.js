import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import { sharedStyles } from './shared-styles.js';

class loginCourse extends PolymerElement{
    constructor(){
        super();
    }
    ready(){
        super.ready();
        if(sessionStorage.length > 0){
            document.querySelector('polymertestcase2-app').set('route.path','/courses');
        }
    }
	static get properties() {
		return{
            userName:{
                type: String
            },
            passWord:{
                type: String
            }
        }
    }
    loginForm(event){
        console.log(this);

        if(this.$.loginform.validate()) {
            console.log("entered values are",this.userName, this.passWord);
            let ajaxCall = this.$.ajaxRequest;
            ajaxCall.url = "http://localhost:3000/users/rest/login";
            ajaxCall.body = {"userName": this.userName, "password": this.passWord};
            ajaxCall.generateRequest(); 
        }
        

    }
    handleResponse(event){
        this.data = event.detail.response;
        console.log("response data: ",this.data);
        if(this.data.message === "Valid User"){
            sessionStorage.setItem("userData",JSON.stringify(this.userName));

            this.dispatchEvent(new CustomEvent('loggedInuser', {bubbles: true, composed: true, detail:{'sessionUser':this.userName}}));

            //this.dispatchEvent(new CustomEvent('dataUpdate' , {bubbles: true, composed: true, detail: {'name':'Sabri'}}));
            document.querySelector("polymertestcase2-app").set('route.path', '/courses');
        }
    }
    static get observers(){
        return ['_checkLogin(status)'];
    }
    _checkLogin(status){
        //return status === "success";
        console.log("checking login status");
        if(this.data.status === "Valid User"){
			return true;
		}
       // document.querySelector("polymertraining-app").set('route.path', '/home-app');
       
		
	}
	static get template(){
		
        return html `
        ${sharedStyles}
            <section class="col-12 offset-md-4 col-sm-4 mt-4 border p-2 rounded">
                <h2>This is login screen</h2>
                <iron-form id="loginform">
                    <form>
                        <paper-input label="userName" id="userName" required value={{userName}} auto-validate error-message="Cannot be Empty"></paper-input>
                        <paper-input label="Password" id="passWord" type="password" required value={{passWord}} auto-validate error-message="Cannot be Empty"></paper-input>
                        <paper-button raised id="loginBtn" on-click="loginForm">Login</paper-button>
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

customElements.define('login-course',loginCourse);
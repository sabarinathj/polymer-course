import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import { sharedStyles } from './shared-styles.js';

class addCourse extends PolymerElement{
    constructor(){
        super();
    }
    ready(){
        super.ready();
    }
    static get properties(){
        return{
            topicsList:{
                type: Array,
                value:[]
            }      
        }
        
    }
    arrayOfTopics(){

    }
    addTopicToArray(event){
        console.log(event);
        console.log("topics function triggered");
        let topics = this.__data.topic;
        let topicSplit = topics.split(',');
        console.log(topicSplit);
        let topicsArray = [];
        for (let i=0; i< topicSplit.length;i++){
            topicsArray.push({"topicName":topicSplit[i]});
        }
        console.log(topicsArray);
        this.topicsList = topicsArray;
    }
    clearTopic(event){
        console.log("list of topics",this.topicsList);
        console.log(event.model.index);
        //this.splice('topicsList', event.model.index, 1);
        console.log(this);
        
        /*
        let thisTopic = this.topicsList.indexOf(event.model.__data.item.topicName);
        
        let thisTopic = this.topicsList.findIndex((e) => {
            for(let i = 0; i< this.topicsList.length; i++){
                if(this.topicsList[i].topicName.value == event.model.__data.item.topicName){
                    return index;
                }        
            }   
        });
        if (thisTopic > -1) {
            this.topicsList.splice(index, 1);
            debugger;
            console.log(this.topicsList);
        }
        */
    }
    static get template(){
        return html `
        ${sharedStyles}
            <section class="col-12 offset-md-4 col-sm-4 mt-4 border p-2 rounded">
                <h2>This is for Adding New Course</h2>
                <iron-form id="registerform">
                    <form>
                        <paper-input label="Course Name" required value={{courseName}} auto-validate error-message="Cannot be Empty"></paper-input>
                        <paper-input label="Course ID" required value={{courseTitle}} auto-validate error-message="Cannot be Empty"></paper-input>
                        <paper-input label="Course Link" required value={{link}} type="email" auto-validate error-message="Cannot be Empty or Email format incorrect"></paper-input>
                        <paper-input label="Topics(separated by commas)" required value={{topic}} class="d-inline-block" auto-validate error-message="Must add one primary skill"></paper-input><paper-button raised  class="d-inline-block" on-click="addTopicToArray">Add</paper-button>
                        <div>
                        <dom-repeat items=[[topicsList]]>
                            <template>
                                <span>{{item.topicName}} <iron-icon icon="icons:clear" on-click="clearTopic"></iron-icon></span>
                            </template>
                        </dom-repeat>
                        </div>
                        <br/><paper-button raised on-click="regsiterUser">Register</paper-button>
                    </form>
                </iron-form>
            </section>
            <iron-ajax
                id="ajaxRequest"
                method="post"
                handle-as="json"
                on-response="_handleResponse"
                debounce-duration="300"
                content-type="application/json">
            </iron-ajax>
        `
    }
}
customElements.define('add-course', addCourse);
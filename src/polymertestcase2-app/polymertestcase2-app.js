import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import { sharedStyles } from './shared-styles.js';
/**
 * @customElement
 * @polymer
 */
class Polymertestcase2App extends PolymerElement {
  constructor(){
		super();
	}
	connectedCallback(){
		super.connectedCallback();
    sessionStorage.getItem("userData");
    if(sessionStorage.length > 0){
      this.isLoggedin = true;
    }
    
    this.addEventListener('loggedInuser', (e) => {
      console.log(e.detail);
      this.isLoggedin = true;
    });
  }
  static get properties() {
    return {
      useCaseName: {
        type: String,
        value: 'Sabarinath Courses'
      },
      page:{
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      isLoggedin: {
        type: Boolean,
        value: false,
        observer: '_checkUser'
      }
    };
  }
  _checkUser(){
    if(sessionStorage.length == 0)
    { 
      return false
    }else{
      return true
    }
  }
  _pageChanged( newPage, oldPage){
    console.log("old Page", oldPage);
    console.log("new page", newPage);
    switch(newPage){
      case 'login':
        import('./login-course.js');
        break;
      case 'register':
        import('./register-course.js');
        break;
      case 'courses':
        import('./home-course'); 
        break; 
      case 'my-course':
        import('./my-course.js');
        break;
      case 'recommended-course':
        import('./recommended-course.js'); 
        break; 
      case 'add-course':
        import('./add-course.js'); 
        break;   
      default:
        this.page =  'courses'; 
    }
  }
  static get observers(){
    return ['_routeChanged(routeData.page)'];
  }
  _routeChanged(page){
    console.log(this);
    this.page = (page || ('courses'))
  }
  clearSession(){
    sessionStorage.clear();
    if(sessionStorage.length == 0)
      this.isLoggedin = false;
    document.querySelector('polymertestcase2-app').setAttribute('route.path', '/login');
  }
  static get template() {
    return html`
    ${sharedStyles}
      <style>
        :host {
          display: block;
        }
      </style>
      
      <app-drawer-layout>
        <app-header-layout>
          <app-header id="header" effects="waterfall">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <app-location route="{{route}}"></app-location>
              <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>              
              
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                {{isLoggedin}}
                  <template is="dom-if" if=[[!isLoggedin]]>
                    <li class="nav-item">
                      <a class="nav-link" href="/login">Login</a>
                    </li class="nav-item">
                    <li class="nav-item"> 
                      <a class="nav-link" href="/register">Register</a> 
                    </li>
                  </template>
                  <li class="nav-item"> 
                    <a class="nav-link" href="/courses">courses</a> 
                  </li>
                  <template is="dom-if" if=[[isLoggedin]]>
                    <li class="nav-item"> 
                      <a class="nav-link" href="/my-course">My Courses</a> 
                    </li>
                    <li class="nav-item"> 
                      <a class="nav-link" href="/recommended-courses">Recommended Courses</a> 
                    </li>
                    <li class="nav-item"> 
                      <a class="nav-link" href="/add-course">Add Course</a> 
                    </li>
                    <li class="nav-item"> 
                      <paper-button raised on-click="clearSession">LogOut</paper-button>
                    </li>
                  </template>
                  
                </ul>
                <a class="navbar-brand  float-right" href="#">[[useCaseName]]!</a>
              </div>
            </nav>
          </app-header>
        </app-header-layout>
        <app-drawer id="drawer">
          
        </app-drawer>
        <main class="main-content">
        
            <iron-pages selected="[[page]]" attr-for-selected="name" selected-attribute="visible" fallback-selection="404">
              <login-course name="login"></login-course>
              <register-course name="register"></register-course>
              <home-course name="courses"></home-course>
              <my-course name="my-course"></my-course>
              <recommended-course name="recommended-course"></recommended-course>
              <add-course name="add-course"></add-course>
            </iron-pages>
            
          </main>
         
      </app-drawer-layout>  

    `;
  }
}

window.customElements.define('polymertestcase2-app', Polymertestcase2App);

import Vue from 'vue'
import Vuex from 'vuex'
//import axios from './axios-auth'
import axios from 'axios'
//ok

Vue.use(Vuex)

//export default new Vuex.Store({
export default new Vuex.Store({
	state: {
		xxx:888,
		dashboardMenu:"mmm",
		currentMessage:"",
		signedInUserId:0,
		status:0,
		serverhost:"szte.mathreference.org/api",
		//serverhost:"localhost:3000",
		//autoPlayStepS:99,
		pageContent:"",
		n:1,
		lastInsertedId:0,
		asyncCallCounter:0,
		storeCounter: 444,
		signedIn:false,
		signedInEmail: "-",
		signedInMessage:"",
		idToken: null,
		userId: null,
		user: null,
		signup:null,
		saveStatus:null, saveStatusText:null,
		steps:[],
		records:[],
		exampleCartRecords:[],
		ownGroups:[],
		exampleCart:[0]


	},
	mutations: {
		authUser (state, userData) {
			state.idToken = userData.token
			state.userId = userData.userId
		},
		storeUser (state, user) {
			state.user = user
		},
		clearAuthData (state) {
			state.idToken = null
			state.userId = null
		}
	},
	actions: {
		dashboardMenu () {
			let menu=`
			[ <a  href='#' @click='alert("xxx")'>xPéldák</a>]
			[ <a  href='#' @click='goToAdminPage('adminexamplerepository',1)'>xPéldák</a>]
			[ <a  href='#' @click='goToAdminPage('admingrouplist',1)'>Saját csoportok</a>]
			[ <a  href='#' @click='goToAdminPage('admineventlist',1)'>Saját események</a>]
			[ <a  href='#' @click='goToAdminPage('adminexamplecart',1)'>Példakosár</a>]
			`;
			this.state.dashboardMenu=menu;
		},


		// EVENT  
		examplecart ({commit, state, dispatch}, formData) {
			let link=`http://${this.state.serverhost}/examplecart`;
			axios.post(link, {
				exampleCart: state.exampleCart,
			}).then(function (response) { 
				//state.lastInsertedId=response.data.id; 
				//state.asyncCallCounter++; 
				//console.log(response.data);

				let records=[];
				const data = response.data;
				for (let key in data) { 
					const record = data[key]; 
					records.push(record);
				}

				state.exampleCartRecords=records; 
				//console.log(records);

			})
				.catch(function (error) { console.log(error); });
			state.asyncCallCounter++; 
		},

		addexamplecart ({commit, state, dispatch}, formData) {
			console.log("example cart store.js");
			console.log("store example cart: "+formData.exampleCart);

			let link=`http://${this.state.serverhost}/addexamplecart`;
			axios.post(link, {
				idControler: formData.idControler,
				exampleCart: formData.exampleCart,
			}).then(function (response) { 
				//state.lastInsertedId=response.data.id; 
				state.asyncCallCounter++; 
			})
				.catch(function (error) { console.log(error); });
			state.asyncCallCounter++; 
		},

		eventadd ({commit, state, dispatch}, formData) {
			console.log("event");

			let link=`http://${this.state.serverhost}/eventadd`;
			axios.post(link, {
				id: formData.id,
				eventName: formData.eventName, 
				description: formData.description, 
				idGroup: formData.idGroup, 
				idOwner: formData.idOwner, 
				startTime: formData.startTime, 
				endTime: formData.endTime 
			}).then(function (response) { 
				//state.lastInsertedId=response.data.id; 
				state.asyncCallCounter++; 
			})
				.catch(function (error) { console.log(error); });
			state.asyncCallCounter++; 
		},
		// /EVENT  
		// GROUP  
		// group list 
		// add new group member
		groupmemberadd ({commit, state, dispatch}, formData) {

			let link=`http://${this.state.serverhost}/groupmemberadd`;
			axios.post(link, {
				id: formData.id,
				email: formData.email, 
			}).then(function (response) { 
				state.lastInsertedId=response.data.id; 
				state.asyncCallCounter++; 
				console.log(state.asyncCallCounter);
				console.log("message: "+response.data.message);
				state.currentMessage=response.data.message; 
			})
				.catch(function (error) { console.log(error); });
		},

		// add new group
		groupadd ({commit, state, dispatch}, formData) {

			console.log("group");
			let link=`http://${this.state.serverhost}/groupadd`;
			axios.post(link, {
				id: formData.id,
				groupName: formData.groupName, 
				description: formData.description, 
				idOwner: formData.idOwner, 

			}).then(function (response) { 
				state.lastInsertedId=response.data.id; 
				state.asyncCallCounter++; 
			})
				.catch(function (error) { console.log(error); });
		},
		// /GROUP  

		// EXAPMLE  
		// example text
		exampletextadd ({commit, state, dispatch}, formData) {
			console.log("otto");

			console.log("id: "+formData.id);
			console.log("pageData: "+formData.pageContent);

			let link=`http://${this.state.serverhost}/exampletextadd`;
			axios.post(link, {
				id: formData.id,
				pageContent: formData.pageContent, 
			}).then(function (response) { 

				console.log("Last inserted id: "+response.data.id);
				state.lastInsertedId=response.data.id; 
				state.asyncCallCounter++; 
				console.log("store.js asyncCallCounter: "+state.asyncCallCounter);
			})
				.catch(function (error) { console.log(error); });
			state.pageContent=formData.pageContent;
		},
		// example text


		// example step
		examplestepadd ({commit, state, dispatch}, formData) {

			console.log( "Form Submeted: store.js Form Data ");

			console.log(formData);
			console.log("nl: "+formData.nl);

			let link=`http://${this.state.serverhost}/examplestepadd`;
			axios.post(link, {
				//axios.post('http://localhost:3000/examplestepadd', {
				id: formData.id,
				id_controler: formData.id_controler,
				sortOrder: formData.sortOrder,
				help: formData.help,
				nl: formData.nl,
				examplestep: formData.examplestep, 
			})
				.then(function (response) {

					state.saveStatus =response.status; 
					state.saveStatusText =response.statusText; 

					console.log("Async Post Call Finished");
					state.asyncCallCounter++; 

				})
				.catch(function (error) {
					console.log(error);
				});

			console.log("Post Call Finished");
		},
		// /EXAPMLE  

		// USERS
		// Sign In 
		signin ({commit, state, dispatch}, formData) {
			let link=`http://${this.state.serverhost}/signin`;
			axios.post(link, {
				email: formData.email,
				password: formData.password, 
			})
				.then(function (res) {
					console.log(res.data.token);
					const now = new Date();
					//const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
					// 60 percig érvényes
					const expirationDate = new Date(now.getTime() + 3600);
					state.idToken=res.data.token;
					if (res.data.token=="") { state.signedIn=false; state.signedInEmail="";}
					else {state.asyncCallCounter++; state.signedIn=true;state.signedUserId=res.data.id; state.signedInEmail=res.data.email;state.status=res.data.status;}

				})
				.catch(function (error) {
					console.log(error);
				});
		},

		// Sign Up 
		signup ({commit, state, dispatch}, formData) {
			let link=`http://${this.state.serverhost}/signup`;
			axios.post(link, {
				email: formData.email,
				password: formData.password, 
				status: formData.status, 
			})
				.then(function (response) {
					console.log("signup message: "+response.data.message);
					state.currentMessage=response.data.message;
					state.asyncCallCounter++; 
				})
				.catch(function (error) {
					console.log(error);
				});

		},
		// /USERS
	},
	getters: {
		//assynCallCounter() { return state.asyncCallCounter },
		user (state) { return state.user },
		isAuthenticated (state) { return state.idToken !== null },
		//		getN: state => () => state.n
		getN: state =>() => state.n,
		getAsyncCallCounter: state =>() => state.asyncCallCounter,
		getAsyncCallCounterET: state =>() => state.asyncCallCounterET,
		getPageContent: state =>() => state.pageContent,
		getSignedIn: state =>() => state.signedIn,
		getSignedInEmail: state =>() => state.signedInEmail,
		getExampleCart: state =>() => state.exampleCart,
		//		getN (state) { return state.n}
		//		getN(state) { //return state.n },

	}
});


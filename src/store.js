import Vue from 'vue'
import Vuex from 'vuex'
//import axios from './axios-auth'
import globalAxios from 'axios'
import axios from 'axios'
import router from './router'


Vue.use(Vuex)

//export default new Vuex.Store({
export default new Vuex.Store({
	state: {
		serverhost:"www.knxplaza.com/api",
		//serverhost:"localhost:3000",
		//autoPlayStepS:99,
		pageContent:"",
		n:1,
		asyncCallCounter:0,
		asyncCallCounterET:0,
		storeCounter: 444,
		idToken: null,
		userId: null,
		user: null,
		signup:null,
		saveStatus:null, saveStatusText:null,
		steps:[]

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
		otto () {
			alert("otto");
		},

		// EXAPMLE  
		// example text
		exampletextadd ({commit, state, dispatch}, formData) {
			console.log("otto");

			console.log("id: "+formData.id);
			console.log("pageData: "+formData.pageContent);

			let link=`http://${this.state.serverhost}/exampletextadd`;
			axios.post(link, {
			//axios.post('http://localhost:3000/exampletextadd', {
				id: formData.id,
				pageContent: formData.pageContent, 
			})
				.then(function (response) { console.log("Response: "+response); })
				.catch(function (error) { console.log(error); });
				state.asyncCallCounterET++; 
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

					console.log("itt vagyok");
					state.saveStatus =response.status; 
					state.saveStatusText =response.statusText; 

					console.log("Async Post Call Finished");
					state.asyncCallCounter++; 
					//	console.log("Async Post status");
					//console.log(status);

					//console.log("Store");
					//console.log(response);
					console.log("Store status: "+response.status);
					//		console.log("Response: "+response);
					//console.log("Store");
					//console.log(state);
					state.idToken++; 

				})
				.catch(function (error) {
					console.log(error);
				});

			console.log("Post Call Finished");
		},
		// /EXAPMLE  

		// USERS
		signup ({commit, dispatch}, formData) {
			console.log(formData);
			let link=`http://${this.state.serverhost}/useradd`;
			axios.post(link, {
			//axios.post('http://localhost:3000/useradd', {
				email: formData.email,
				password: formData.password, 
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});

		},
		// /USERS
		signupTest ({commit, dispatch}, formData) {
			console.log(formData)

			let link=`http://${this.state.serverhost}/getformula/1/9999`;
			axios.get(link).then(
			//axios.get('http://localhost:3000/getformula/1/9999').then(
				response => {
					const data = response.data;
					console.log(data)
				})
		},
		/*
	 setLogoutTimer ({commit}, expirationTime) {
		setTimeout(() => {
		  commit('clearAuthData')
		}, expirationTime * 1000)
	 },
	 signup ({commit, dispatch}, authData) {
		axios.post('/signupNewUser?key=AIzaSyCXlVPPWknVGhfc60mt7Jkv0Xzrho7_mwc', {
		  email: authData.email,
		  password: authData.password,
		  returnSecureToken: true
		})
		  .then(res => {
			 console.log(res)
			 commit('authUser', {
				token: res.data.idToken,
				userId: res.data.localId
			 })
			 const now = new Date()
			 const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
			 localStorage.setItem('token', res.data.idToken)
			 localStorage.setItem('userId', res.data.localId)
			 localStorage.setItem('expirationDate', expirationDate)
			 dispatch('storeUser', authData)
			 dispatch('setLogoutTimer', res.data.expiresIn)
		  })
		  .catch(error => console.log(error))
	 },
	 login ({commit, dispatch}, authData) {
		axios.post('/verifyPassword?key=AIzaSyCXlVPPWknVGhfc60mt7Jkv0Xzrho7_mwc', {
		  email: authData.email,
		  password: authData.password,
		  returnSecureToken: true
		})
		  .then(res => {
			 console.log(res)
			 const now = new Date()
			 const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
			 localStorage.setItem('token', res.data.idToken)
			 localStorage.setItem('userId', res.data.localId)
			 localStorage.setItem('expirationDate', expirationDate)
			 commit('authUser', {
				token: res.data.idToken,
				userId: res.data.localId
			 })
			 dispatch('setLogoutTimer', res.data.expiresIn)
		  })
		  .catch(error => console.log(error))
	 },
	 tryAutoLogin ({commit}) {
		const token = localStorage.getItem('token')
		if (!token) {
		  return
		}
		const expirationDate = localStorage.getItem('expirationDate')
		const now = new Date()
		if (now >= expirationDate) {
		  return
		}
		const userId = localStorage.getItem('userId')
		commit('authUser', {
		  token: token,
		  userId: userId
		})
	 },
	 logout ({commit}) {
		commit('clearAuthData')
		localStorage.removeItem('expirationDate')
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		router.replace('/signin')
	 },
	 storeUser ({commit, state}, userData) {
		if (!state.idToken) {
		  return
		}
		globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
		  .then(res => console.log(res))
		  .catch(error => console.log(error))
	 },
	 fetchUser ({commit, state}) {
		if (!state.idToken) {
		  return
		}
		globalAxios.get('/users.json' + '?auth=' + state.idToken)
		  .then(res => {
			 console.log(res)
			 const data = res.data
			 const users = []
			 for (let key in data) {
				const user = data[key]
				user.id = key
				users.push(user)
			 }
			 console.log(users)
			 commit('storeUser', users[0])
		  })
		  .catch(error => console.log(error))
	 }
		*/
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
		//		getN (state) { return state.n}
		//		getN(state) { //return state.n },

	}
});


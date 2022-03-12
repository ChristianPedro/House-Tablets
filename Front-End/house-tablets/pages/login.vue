<template>
   <div class="page">
	   <div class="loginForm">
	   		<div class="loginHeader">
				<h2 class="loginText">Login</h2>
				<hr>
			</div>
			<div class="inputContainer">
				<!-- <label>Username</label> -->
				<input id="username" placeholder="Username" type="username">
			</div>
			<div class="inputContainer">
				<!-- <label>Password</label> -->
				<input id="password" placeholder="Password" type="password">
			</div>
			<div class="inputContainer">
		   		<button class="loginButton" @click="authenticate">Login</button>
			</div>
	   </div>
   </div>
</template>

<script>
export default {
   name: 'LoginComp',
   props: {
      source: String,
   },
   data: () => ({
      
      username: "",
      token: ""
      
   }),
   mounted() {
      this.username = this.$store.getters.getUsername
   },
   // computed: mapState({
   //    username: state => state.username,
   //    token: state => state.token
   // }),
   methods: {
      authenticate: () =>  {
         try {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let authenticated;
            fetch("http://localhost:3000/auth/login", {
               method: 'POST',
               mode: 'cors',
               headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
               },
               body: JSON.stringify({ username: username, password: password})
            }).then( response => {
               if (response.status >200){
                  console.log("auth failed, please provide proper credentials")
                  authenticated = false
                  localStorage.removeItem("token")
               }
               if (response.status == 200){
                  authenticated =  true
               }
               return response.json()
            }).then( data => {
               if (authenticated){
                  // console.log(this.username)
                  console.log(username)
                  console.log(data.token)
                  // console.log(this.username)
                  // console.log($store.state.username)
                  // this.setUsername(username);
                  // this.setToken(data.token);
                  // this.username = username;
                  // this.token = data.token;
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("user", username);
                  $nuxt.$router.push('/dashboard')
               }
            })   
         } catch (error) {
            console.log("unexpected error error")

         }
      },


   },
};


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Roboto:wght@300&display=swap');
body{
	margin: 0px;
	padding: 0px;
	border: 0px;
}
.page{
	width: 100%;
	height: 100%;
	min-width: calc(100vw - 16px);
	min-height: calc(100vh - 16px);
	display: flex;
	justify-content: center;
	align-content: center;
	
}
.loginForm{
	border: 0px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	align-self: center;
	justify-self: center;
	width: 50%;
	max-width: 350px;
	height: 100%;
	background-color: white;
	box-shadow: -2px 2px 5px lightgrey, 2px -2px 5px lightgrey;
	/* padding: 2% 5% 2% 5%; */
}
.loginForm > div {
	display: flex;
	align-content: flex-start;
	justify-content: center;
	flex-direction: column;
}
.loginHeader{
	width: 100%;
	height: 100%;
}
.loginText{
	position: relative;
	font-family: 'Roboto', sans-serif;
	align-self: center;
	font-size: 2em;
	line-height: 2em;
	margin: 0px;
}

input{
	border: 0px;
	border-bottom: 2px lightgrey solid;
	padding: 2%;
	font-size: 1em;
	line-height: 1em;
	margin-top: 2%;
	margin-bottom: 2%;
	width: 80%;
	margin: auto;
}
hr{
	width: 100%;
	color: lightgray;
}
.loginButton{
	border: 0px;
	border-radius: 50px;
	width: 80%;
	height: auto;
	padding: 0.6em 2em;
	font-size: 1em;
	line-height: 1em;
	margin: 8% auto 8% auto;
	background-color: #3181d1;
}
.inputContainer{
	width: 100%;
	height: auto;
}
</style>


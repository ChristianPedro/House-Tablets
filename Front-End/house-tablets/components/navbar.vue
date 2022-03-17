<template>
	<div class="navContainer">
		<div class="leftNav">
			<nuxt-link to="/dashboard" class="imgContainer"><img src="../assets/Logo.png" style="height:30px"></nuxt-link>
		</div>
		<div class="rightNav">
			<!-- <p class="text">Hello, {{user}}!</p> -->
			<p class="text"><nuxt-link to="/" v-on:click="signout">Sign out</nuxt-link></p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'NavBar',
	props: {
		user: ""
	},
	methods: {
		signout(){
			localStorage.clear()
		}
	},
}
</script>
<style scoped>
body{
	margin: 0px;
	padding: 0px;
	border: 0px;
}
.navContainer{
	width: 100%;
	height: 50px;
	display: flex;
	align-content: center;
	justify-content: space-between;
	background-color: #24252A; 
	border: 0px;
	border-radius: 8px;
}

.text{
	color: white;
	font-size: 1em;
}
.text > a{
	color: white;
	font-size: 1em;
	margin: auto;
}
.leftNav{
	margin-left: 20px;
	display: flex;
	align-content: center;
	justify-content: center;
}
.rightNav{
	margin-right: 20px;
	display: flex;
	align-content: center;
	justify-content: center;
}
.imgContainer{
	display: flex;
	align-content: center;
	justify-content: center;
}
img{
	align-self: center;
	justify-self: center;
}
</style>
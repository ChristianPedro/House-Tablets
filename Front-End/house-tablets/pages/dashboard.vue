<template>
	<div class="page">
		<navbar :user="username"/>
		<div class="mainContent">
			<div class="grid-container">
				
					<nuxt-link to="/Roster" class="grid-item">
					<img src="../assets/Roster.png">
					<p class="linktext">Roster</p>
					</nuxt-link>
				
					<nuxt-link to="/Details" class="grid-item">
					<img src="../assets/Details.png">
					<p class="linktext">Details</p>
					</nuxt-link>
				
					<nuxt-link to="/Stations" class="grid-item">
					<img src="../assets/Stations.png">
					<p class="linktext">Stations</p>
					</nuxt-link>
				
			</div>
		</div>
	</div>
</template>

<script>

import RosterImage from '../assets/Roster.png'
import StationsImage from '../assets/Stations.png'
import DetailsImage from '../assets/Details.png'
import navbar from '~~/components/navbar.vue'
export default {
  components: { navbar },
//   components: { NavBar },
	name: 'DashboardView',
	data: ()=> ({
		alignments: [
			'start',
		],
		username: `${localStorage.getItem("user")}`,
		dashboardItems: [
			{
				title: "Roster",
				image: RosterImage,
				link: `/roster`
			},
			{
				title: "Stations",
				image: StationsImage,
				link: `/stations`
			},
			{
				title: "Details",
				image: DetailsImage,
				link: `/details`
			}
		],
	}),
	methods: {
		
	},
	
	
}
</script>

<style scoped>
html{
	margin: 0px;
	margin: 0px;
	padding: 0px;
	border: 0px;
}
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
	justify-content: flex-start;
	align-content: center;
	flex-direction: column;
	
}
.cell{
	display: flex;
	align-items:center;
	justify-items: center;
}
.cell > div {
	display: flex;
	align-items: center;
	justify-items: center;
	flex-direction: column;
}

.mainContent{
	width: 100%;
	height: 100%;
	min-height: calc(100vh - 66px);
	background: lightgrey;
	border-radius: 15px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  /* background-color: #2196F3; */
  padding: 10px;
  gap: 15px 15px;
}
.grid-item {
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  border-radius: 10px;
  padding: 20px;
  font-size: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.grid-item > img{
	justify-self: center;
	align-self: center;
	width: 70%;
	height: auto;
	border-radius: 15px;
}
.linktext{
	color: #24252A;
	text-decoration: underline;
	margin: 0px;
}
.linktext:hover{
	text-decoration: underline;
}
</style>
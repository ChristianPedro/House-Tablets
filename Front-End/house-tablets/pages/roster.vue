<template>
	<div class="page">
		<navbar/>
		<div class="mainContent">
            <table class="RosterTable">
                <thead>
                    <tr><th>Name</th><th>Nickname</th><th>Position</th><th>Year</th><th>Pledge Class</th></tr>
                </thead>
	            <tbody id="tableBody">
                    <tr><td>Name</td><td>Nickname</td><td>Position</td><td>Year</td><td>Pledge Class</td></tr>
                </tbody>
            </table>
            <button @click="clearTable">clear</button>
		</div>
	</div>
</template>

<script>


import navbar from '~~/components/navbar.vue'
export default {
  components: { navbar },
	name: 'DashboardView',
	data: () => ({
      
      username: "",
      token: ""
      
   }),
    methods: {
        fetchRosterData:  ()=>{
            fetch(`http://localhost:3000/search?genre=${genreSent}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200){
                messageBlock.textContent = "Success"
                goodToGo = true
            }
            else {
                messageBlock.textContent = "Bad request"
            }
            return response.json()
        }).then( data => {
            if (data.rows.length == 0){
                messageBlock.textContent = "No books found"
            }
            if (goodToGo){
                fillTable(data)
            }
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    },
        //Clear table
    clearTable: ()=> {
        // for (let index = 1; index < table.children.length; index++) {
        //     table.removeChild(table.children[index])
        // }
        let table = document.getElementById("tableBody")
        console.log(table.children.length)
        console.log(table.children[0])
        for (let index = table.children.length > 0; index--;) {
            table.removeChild(table.children[index])
            index = table.children.length
            
        }
        // table = document.getElementById("table").children[0]
        // while (table.lastElementChild) {
        //     if (table.lastElementChild.id == "stay"){
        //         break;
        //     } else {
        //         table.removeChild(table.lastElementChild);
        //     }
        // }

    },   
    fillTable: (response) => {
	console.log("running")
	response.rows.forEach(element => {
		let currentRow = document.createElement('tr')
		
		let title = document.createElement('td')
		let genre = document.createElement('td')
		let quality = document.createElement('td')
		title.textContent = element.title
		genre.textContent = element.genre
		quality.textContent = (element.quality == true ? 'Yes' : 'No')
		currentRow.append(title)
		currentRow.append(genre)
		currentRow.append(quality)
		
		table.append(currentRow)
	});
}
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
.linktext{
	color: #24252A;
	text-decoration: underline;
	margin: 0px;
}
.linktext:hover{
	text-decoration: underline;
}


.RosterTable{
    width: 100%;
    height: 100%;
}
table, th, td {
  border: 1px solid;
  margin: 0;
  border-spacing: 0px;
}
</style>
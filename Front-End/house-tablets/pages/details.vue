<template>
	<div class="page">
		<navbar :user="username" />
		<div class="mainContent">
            <h1>Details</h1>
            <div class="topBar">
                <input type="text" id="search" placeholder="Search for value to highlight" v-on:keyup="highlight">
                <div class="tableButtons">
                    <button @click="fetchRosterData">Refresh</button>
                    <button @click="clearTable">Clear Table</button>
                </div>
            </div>
            <div class="tableContainer">
                <div id="messageblock">{{messageBlock}}</div>
                <table class="RosterTable">
                    <thead>
                        <tr><th>Detail</th><th>Pair 1</th><th>Pair 2</th><th>Completed</th></tr>
                    </thead>
                    <tbody id="tableBody">
                        <tr><td>Press refresh to load data</td></tr>
                    </tbody>
                </table>
            </div>
		</div>
	</div>
</template>

<script>


import navbar from '~~/components/navbar.vue'
export default {
  components: { navbar },
	name: 'DashboardView',
	data: () => ({
      
      username: ``,
      token: ""
      
   }),
    methods: {
        fillTable(response){
            let table = document.getElementById("tableBody")
            console.log("running")
            console.log(response)
			let details = ["Mop first floor","Mop second floor","Mop third floor", "Clean Bathrooms", "Sweep first floor", "Sweep Second floor"]
			let detailsIndex = 0
            response.forEach(element => {
                let currentRow = document.createElement('tr')
                
                let name = document.createElement('td')
                let detail = document.createElement('td')
                let name2 = document.createElement('td')
                let completed = document.createElement('td')
                name.textContent = (element.pair1 ? element.pair1 : "N/A")
                name2.textContent = (element.pair2 ? element.pair2 : "N/A")
                detail.textContent = details[detailsIndex]
                completed.textContent = "NO"
                name.style.border = '1px solid black'
                name2.style.border = '1px solid black'
                detail.style.border = '1px solid black'
                completed.style.border = '1px solid black'


                currentRow.append(detail)
                currentRow.append(name)
                currentRow.append(name2)
                currentRow.append(completed)
                
                table.append(currentRow)
				detailsIndex++
                });
        },
        fetchRosterData(){
			this.clearTable()
            console.log(document.cookie.split("=")[1])
            let messageBlock = document.getElementById('messageblock');
            let goodToGo = false;
            fetch(`http://localhost:3000/private/details`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-auth': document.cookie.split("=")[1]
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
            console.log(data)
            if (data.length == 0){
                messageBlock.textContent = "No members found"
            }
            if (goodToGo){
                this.fillTable(data)
            }
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    },
        //Clear table
    clearTable() {
        let table = document.getElementById("tableBody")
        console.log(table.children.length)
        console.log(table.children[0])
        for (let index = table.children.length > 0; index--;) {
            table.removeChild(table.children[index])
            index = table.children.length
            
        }

    },
    highlight() {
        let table = document.getElementById("tableBody")
        let value = document.getElementById("search").value;
        let highlightMe = false;
        
        for (let index = 0; index < table.children.length; index++) {
            let row = table.children[index];
            console.log(row)
            console.log("^^")
            row.style.backgroundColor = "lightgrey"
            for (let innerIndex = 0; innerIndex < row.children.length; innerIndex++) {
                let cell = row.children[innerIndex].textContent
                console.log(cell)
                if (cell.includes(value) && value != ""){
                    row.style.backgroundColor = "lightyellow"
                }
                
            }
        }
    }   
    },
    fetch() {
        console.log("fetch worked")
        this.fetchRosterData();
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
    max-height: calc(100vh - 66px);
	background: lightgrey;
	border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
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
    max-height: 100%;
    overflow-y: scroll;
    
}
table, th, td {
  border: 1px solid;
  margin: 0;
  border-spacing: 0px;
}
.addedcells{
    border: 1px solid black;
    margin: 0;
    border-spacing: 0px; 
}
.tableContainer{
    position: relative;
    width: 95%;
    max-height: 95%;
    overflow-y: auto;
}
tbody{
    position: relative;
    width: 100%;
}
.tableButtons{
    width: 95%;
    height: auto;
    display: flex;
    justify-content: flex-end;
}
.topBar{
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin: 1%;
}
.topBar > input{
    width: 30%;
    border-radius: 10px;
    padding-left: 10px;
    border: none;
}
</style>
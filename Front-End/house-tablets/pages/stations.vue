<template>
	<div class="page">
		<navbar :user="username" />
		<div class="mainContent">
            <h1>Details</h1>
            <div class="tableButtons">
                <button @click="fetchRosterData">Refresh</button>
                <button @click="clearTable">Clear Table</button>
            </div>
            <div class="tableContainer">
                <div id="messageblock">{{messageBlock}}</div>
                <table class="RosterTable">
                    <thead>
                        <tr><th>Station</th><th>Pair 1</th><th>Pair 2</th><th>Time</th><th>Trade</th><th>Willing to trade?</th></tr>
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
			let details = ["Front Door","Front Stairs","Back Stairs", "Porch", "Floater"]
            let times = ["10:30pm","11pm","11:30pm", "12am", "12:30am"]
			let detailsIndex = 0
            response.forEach(element => {
                let currentRow = document.createElement('tr')
                
                let station = document.createElement('td')
                let name = document.createElement('td')
                let name2 = document.createElement('td')
                let time = document.createElement('td')
                let trade = document.createElement('td')
                let WillingToTrade = document.createElement('td')
                station.textContent = details[detailsIndex]
                name.textContent = (element.pair1 ? element.pair1 : "N/A")
                name2.textContent = (element.pair2 ? element.pair2 : "N/A")
                time.textContent = times[detailsIndex]
                trade.textContent = "NOT ALLOWED"
                WillingToTrade.textContent = "N/A"
                name.style.border = '1px solid black'
                name2.style.border = '1px solid black'
                station.style.border = '1px solid black'
                time.style.border = '1px solid black'
                trade.style.border = '1px solid black'
                WillingToTrade.style.border = '1px solid black'


                currentRow.append(station)
                currentRow.append(name)
                currentRow.append(name2)
                currentRow.append(time)
                currentRow.append(trade)
                currentRow.append(WillingToTrade)
                

                table.append(currentRow)
				detailsIndex++
                });
        },
        fetchRosterData(){
			this.clearTable()
            let messageBlock = document.getElementById('messageblock');
            let goodToGo = false;
            fetch(`http://localhost:3000/private/stations`, {
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
    },
    // mounted() {
    //     console.log("fetch worked")
    //     this.fetchRosterData();
    // },
    
	
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
</style>
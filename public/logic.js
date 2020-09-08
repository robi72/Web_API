


    async function getAllMembers() {
        const collectedUsers = await fetch('/members')
        const members = await collectedUsers.json()
        console.log(members)
    
        // Printa ut alla användare ifrån collectedUsers
        console.log(collectedUsers)

        document.getElementById('members').innerHTML = []

        for (let member of members) {
            
            let x = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${member.name}</h5>
    
                            <div>Street: ${member.street}</div>
                            <div>City: ${member.city}</div>
                            <div>Mobile: ${member.mobile}</div>
    
                           
                            <hr>
                        </div>
                    </div>
                </div>
            `
    
            document.getElementById('members').innerHTML = document.getElementById('members').innerHTML + x;
        }
    }




        
    

function getOneMember(name) {
    console.log("Show selected member", name)
    makeRequest("/members/" + name, "get")
}
function addNewMember() {
    console.log("Add member")

   let body = {
        "name": "Sanna Andersson",
        "street": "Mölndalsvägen 13",
        "city": "Göteborg",
        "mobile": "0707444444"
    } 
    makeRequest("/members", "post", JSON.stringify(body))
}
function updateMember(name) {
    console.log("Update member", name)

    let body = {
        "name": "Sanna Andersson",
        "street": "Göteborgsvägen 56",
        "city": "Mölndal",
        "mobile": "0707444444"
    }

    makeRequest("/members/" + name, "put", JSON.stringify(body))
}
function removeMember(name) {
    console.log("Delete member ", name)

    makeRequest("/members/" + name, "delete")
}

async function makeRequest(url, reqMethod, body) {
    
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: reqMethod,
        body: body,
    })

    console.log(response)

    const data = await response.json()
    return data

    console.log(data)
}
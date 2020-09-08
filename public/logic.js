


    async function getAllMembers() {
        const collectedUsers = await fetch('/members')
        const members = await collectedUsers.json()
        console.log(members)
    
        // Printa ut alla användare ifrån collectedUsers
        console.log(collectedUsers)

        for (let member of members) {
            const x = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${member.name}</h5>
    
                            <div>Street: ${member.street}</div>
                            <div>City: ${member.city}</div>
                            <div>Phone: ${member.phone}</div>
    
                           
    
                            <button type="button" class="glyphicon glyphicon-trash"></button>
                            <button types="button" class="glyphicon glyphicon-pencil" data-toggle="modal"
                                data-target="#editBookModal" onClick="setEditModal(${member.name})">
                            </button>
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
        "phone": "044444444"
    } 
    makeRequest("/members", "post", JSON.stringify(body))
}
function updateMember(name) {
    console.log("Update member", name)

    let body = {
        "name": "Sanna Andersson",
        "street": "Göteborgsvägen 56",
        "city": "Mölndal",
        "phone": "044444444"
    }

    makeRequest("/members/" + name, "put", JSON.stringify(body))
}
function removeMember(name) {
    console.log("Delete medlem ", name)

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
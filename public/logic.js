

function getAllMembers() {
    console.log("Alla members")
    makeRequest("/members", "get")
}
function getOneMember(name) {
    console.log("Show selected member", name)
    makeRequest("/members/" + name, "get")
}
function addNewMember() {
    console.log("Add member")
    
    let body = {
        "name": "Sanna Andersson",
        "city": "Göteborg",
        "phone": "044-444444"
    }

    makeRequest("/members", "post", JSON.stringify(body))
}
function updateMember(name) {
    console.log("Update member", name)

    let body = {
        "name": "Sanna Andersson",
        "city": "Mölndal",
        "phone": "044-444444"
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
        body: body
    })

    console.log(response)

    const data = await response.json()

    console.log(data)
}
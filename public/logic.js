

function getAllMembers() {
    console.log("Alla medlemmar")
    makeRequest("/members", "get")
}
function getOneMember(name) {
    console.log("Visa en medlem", name)
    makeRequest("/members/" + name, "get")
}
function addNewMember() {
    console.log("Lägg till medlem")
    
    let body = {
        "name": "Sanna Andersson",
        "city": "Göteborg",
        "phone": "044-444444"
    }

    makeRequest("/members", "post", JSON.stringify(body))
}
function updateMember(name) {
    console.log("Update medlem nr.", name)

    let body = {
        "name": "Sanna Andersson",
        "city": "Mölndal",
        "phone": "044-444444"
    }

    makeRequest("/members/" + name, "put", JSON.stringify(body))
}
function removeMember(name) {
    console.log("Ta bort medlem ", name)

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
const express = require('express')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

let members = [
    {
        name: "Anna Svensson",
        city: "Oskarshamn",
        phone:"011-111111"
    }, 
    {
        name: "Stefan Johansson",
        city: "Halmstad",
        phone: "022-222222"
    }, 
    {
        name: "Oskar Jacobsson",
        city: "Borås",
        phone: "033-333333"
    }, 
    
]

app.get("/members", (req, res) => {
    res.json(members)
})

app.get("/members/:name", (req, res) => {
    const paramName = req.params.name
    const foundMember = members.find((member) => member.name == paramName)

    if(foundMember) {
        res.json(foundMember)
    } else {
        res.status(404).json({status: "Member not found..."})
    }
})

app.post("/members", (req,res) => {
    members.push(req.body)
    res.json({status: "New member created"})
})

app.put("/members/:name", [checkIfMemberExists], (req, res) => {
    members[req.foundMemberIndex] = req.body
    res.json({status: "Member updated"})
})

app.delete("/members/:name", [checkIfMemberExists], (req, res) => {
    members.splice(req.foundMemberIndex, 1)
    res.json({status: "Member deleted"})
})

function checkIfMemberExists (req, res, next) {
    const paramName = req.params.name
    let foundMemberIndex = members.findIndex((member) => member.name == paramName)

    if(foundMemberIndex == -1) {
        res.status(404).json({status: "Member not found..."})
    } else {
        req.foundMemberIndex = foundMemberIndex
        next()
    }
        
}

app.listen(3000, 'localhost', () => {
    console.log('Server is running')
})

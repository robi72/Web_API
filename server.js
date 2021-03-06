const express = require('express')
const app = express()
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
app.use(express.static('public'))

let members = [
    {   
        name: "Anna Svensson",
        street: "Ekvägen 8",
        city: "Oskarshamn",
        mobile: "0707111111"
    }, 
    {   
        name: "Stefan Johansson",
        street: "Bokvägen 1",
        city: "Halmstad",
        mobile: "0707222222"
    },     
    {   
        name: "Oscar Jacobsson",
        street: "Aspvägen 6",
        city: "Borås",
        mobile: "0707333333"
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

app.post('/member', (req, res) => {
    const member = req.body;

    console.log(member);
    members.push(member);

    res.redirect('./');
});
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

const express = require('express')
const member = express.Router()
const memberlist = require('./db/memberlist')
const bodyp = require('body-parser')

member.use(bodyp.json())
member.use(bodyp.urlencoded({ extended : true}))


member.get('/', (req, res) => 
{
    if(memberlist)
    {
        res.send(memberlist) 
    }
    else
    {
        res.status(404).send({msg : "Empty List"})
    }

   
})

member.get('/:id', (req, res) => 
{
 const found = memberlist.some(member =>  member.id === parseInt(req.params.id));
 if(found){
     res.send(memberlist.filter(member =>  member.id === parseInt(req.params.id)))
 }
 else
 {
     res.status(404).send({msg: `${req.params.id} is not found in employee list`})
 }
})


member.post('/add', (req, res) => 
{

 const member = req.body

  if(member.id && member.name && member.email && member.phone  && member.active)
  {
      memberlist.push(member)
      return res.send(memberlist)
  }
  else
  {
      res.status(400).send({msg: `member cannot save`})
  }
})


member.put('/:id', (req, res) => 
 {

  const updatemember= req.body
  const found = memberlist.some(member =>  member.id === parseInt(req.params.id));

   if(!found)
   {
     
       return res.status(400).send({msg: `member not found`})
   }   
   if(member.id && member.name && member.email && member.phone  && member.active)
   {
    memberlist.push(member)
       return res.send(memberlist)
   }

   else
   {
    memberlist.forEach(member =>{
        if(member.id === parseInt(req.params.id))
        {
            member.name = updatemember.name ? updatemember.name : member.name,
            member.address = updatemember.email ? updatemember.email : member.email,
            member.phone = updatemember.phone ? updatemember.phone : member.phone,
            member.active = updatemember.active ? updatemember.active : member.active
            return res.send(memberlist);

        }
    })
   } 

   res.status(400).send({msg: `employeeList cannot update`})



})


member.delete('/:id', (req, res) => 
{
    const found = memberlist.some(member =>  member.id === parseInt(req.params.id))

  if(found)
  {
    res.send(memberlist.filter(member =>  member.id !== parseInt(req.params.id)))

  }
  else
  {
      res.status(400).send({msg: `employee cannot delete`})
  }
})


module.exports = member
const { request } = require('express');
const Userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content Cannot be empty"});
        return;
    }
    
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user into database
    user
        .save(user)
        .then(data=>{
            // res.send(data);
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured while creating operation"
            });
        });

}






//retrieve and return
exports.find = (req,res)=>{
    
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}





//Update a new identify user
exports.update =(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data Cannot be emplty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})

        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot update user with ${id} may be not found`})
            }else{
                res.send(data);
            }

        })
        .catch(err =>{
            res.status(500).send({message: "Error update user information"});
        })

}





//delete
exports.delete = (req,res)=>{

    const id = req.params.id; 
    Userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: `Cannot delete with ID ${id} maybe id is wrong`});
            }else{
                res.send({message: "Users deleted Successfully"});
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Cannot delete with the id of "+ id});
        })
}



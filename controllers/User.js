const User = require('../models/User')

const bcrypt = require("bcrypt")

exports.signup = (req , res , next) =>{ 
    bcrypt.hash(req.body.password , 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        })
        user.save()
        .then(() => res.staus(200).json({message : 'utilisateur créé'}))
        .catch(error => res.staus(400).json({error}))
    })
    .catch(error => res.staus(500).json({error}))

}
exports.login = (req , res , next) =>{
    User.findOne({email : req.body.email})
    .then(user =>{
        if(user === null){
            res.staus(401).json({message : "perte d'identifiant / ou mot de passe incorrect"})
        }else{
            bcrypt.compare(req.body.password , user.password)
            .then( valid => {
                if(!valid){
                    res.status(401).json({message : "perte d'identifiant / ou mot de passe incorrect"})
                }else{
                    res.status(200).json({
                        userId : user._id,
                        token : 'TOKEN'
                    })
                }
            })
            .catch(error => res.staus(500).json({error}))

        }

    })
    .catch(error => res.staus(500).json({error}))
}
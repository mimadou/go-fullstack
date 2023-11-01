const Thing = require('../models/Thing')

exports.createThing = (req , res, next)=>{
    
    const thingObjet = JSON.parse(req.body.thing);
    delete thingObjet._id ;
    delete thingObjet._userId;

    const thing = new Thing ({
        ...thingObjet,
        _userId : req.auth._userId,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
    .then(()=> res.status(201).json({message:"objet enregistré"}))
    .catch(error =>res.status(400).json({error}))
};

exports.modifyThing = (req, res, next) => {
   const thingObject = req.file ? {
       ...JSON.parse(req.body.thing),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
 
   delete thingObject._userId;
   Thing.findOne({_id: req.params.id})
       .then((thing) => {
           if (thing.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           } else {
               Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'Objet modifié!'}))
               .catch(error => res.status(401).json({ error }));
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
};

exports.deleteThing = (req , res , next) =>{
    Thing.deleteOne({ _id : req.params.id})
    .then(() => res.status(200).json({message : 'objet supprimé'}))
    .catch(error => req.status(400).json({error}))
};

exports.getOneThing = ( req , res , next) => {
    Thing.findOne({_id : req.params.id})
    .then(thing=>res.status(200).json(thing))
    .catch(error => res.status(400).json({error}))
};

exports.getAllThing = (req , res, next)=>{
    Thing.find()
    .then(things=> res.status(200).json(things))
    .catch(error =>res.status(400).json({error}))
 }
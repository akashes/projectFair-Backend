const Projects = require('../Models/projectSchema');

//add project logic

exports.addUserProject=async(req,res)=>{

    // res.status(200).json('inside add Project api')

    // get user id
    const userId=req.payload

    // get addProject details
    const{title,language,github,link,overview}=req.body
    console.log(title,language,github,link,overview);

    // project image
    projectImage = req.file.filename
    console.log(projectImage);

  
    try{
    const existingProject = await Projects.findOne({github})
    if(existingProject){
        res.status(401).json({message:"Project already exists"})
        console.log('project already exists');
    }else{
        const newProject = new Projects({title,language,github,link,overview,projectImage,userId})
        await newProject.save()
        res.status(200).json(newProject)

    }

    }
    catch(err){
        res.status(404).json({message:err.message})
    }

}


exports.getUserProject=async(req,res)=>{
    //get user id
    const userId = req.payload

    //api fetching
    try{
        //get project information of particular user
        const userProject = await Projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)


    }
    catch(err){
        res.status(401).json(err.message)


    }

 
}

exports.getAllProjects=async(req,res)=>{
    try{
        const allProjects = await Projects.find()
        res.status(200).json(allProjects)
        
    }catch(err){
        res.status(401).json(err.message)
    }
}

exports.getHomeProjects=async(req,res)=>{
    try{
        const homeProject = await Projects.find().limit(3)
        res.status(200).json(homeProject)

    }catch(err){
        res.status(401).json(err.messagge)
    }
}
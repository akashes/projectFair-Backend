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
        console.log('existing project');
        res.status(401).json({message:"Project already exists"})
        console.log('project already exists');
    }else{
        const newProject = new Projects({title,language,github,link,overview,projectImage,userId})
        await newProject.save()
        res.status(200).json(newProject)
        console.log('project added successfully');

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
    const searchKey = req.query.search
    console.log(searchKey);
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const allProjects = await Projects.find(query)
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

exports.editProject=async(req,res)=>{
    console.log('inside edit project');
    const {title,language,github,link,overview,projectImage}=req.body

    const uploadImage = req.file?req.file.filename:projectImage   // updated image or the image which already existed
    const userId = req.payload
    const projectId=req.params.id

    console.log("haha projectId is ",projectId);

  

    try{

        const updateProject = await Projects.findByIdAndUpdate({_id:projectId},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})
        //new true is used to return the modified document rather than the original one

        //saving updated projectdetails
        await updateProject.save()

        res.status(200).json(updateProject)

    }
    catch(err){
        res.status(401).json(err)
    }
}

//CLASS 
// exports.deleteProject=async(req,res)=>{
//     console.log('inside deleteproject');
//     const {pid} = req.params
//     try{
//         const deleteData = await Projects.findByIdAndDelete({_id:pid})
//         res.status(200).json({"message":"project deleted successfully","data":deleteData})
//     }catch(err){
//         res.status(401).json(err)
//     }
   
// }
exports.deleteProject=async(req,res)=>{
    console.log('inside delete project');

    const {github}=req.body
    console.log('github is ',github);
    try{
        const existingProject = await Projects.findOne({github})
        if(existingProject){
        const result =     await Projects.deleteOne({github:github})
            res.status(200).json(result)
        }else{
            res.status(401).json('cant find project in the db')
        }
    }catch(err){
        res.status(500).json(err)
    }
}


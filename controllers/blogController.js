import Blog from '../db/models/Blog.js'

export default async function getAllBlogs(req, res, next){
    try{
        const blogs = await Blog.find()

        res.status(200).json({
            success: true,
            data: blogs
        })
    }catch(err){
        next(err)
    }
}
export default async function getSingleBlog(req, res, next){
    const id = req.params.id

    try{
       const blog = await Blog.findOne({_id: id})

       if(!blog){
        const error = new Error("Blog not found")
        error.statusCode = 404
        throw error
       }
       res.status(200).json({
            success: true,
            data: blog
        })
 
    }catch(err){
         next(err)
    }
}
export default async function createBlog(req, res, next){
    const { title, content } = req.body

    try{
       const blog = await Blog.create({
        title,
        content
       })

       res.status(201).json({
            success: true,
            data: blog
        })
 
    }catch(err){
         next(err)
    }

}
export default async function updateBlog(req, res, next){
        const { title, content } = req.body
        try{
            await Blog.findByIdAndUpdate(req.params.id, {
                title,
                content
            }); 
            res.status(201).json({
                success: true,
                data: blog
            })
        }catch(err){
            next(err)
        }
}
export default async function deleteBlog(req, res, next){
     try{
        const id = req.params.id
        const blog = await Blog.findById(id)
        if(!blog){
            const error = new Error("Blog not found!")
            error.statusCode = 404
            throw error
        }
        await Blog.findByIdAndDelete(id)
        return res.status(200).json({
            success:true,
            message: "appointment cancelled successfully"
        })
    }catch(err){
        console.error(err);
        next(err)
    }
}
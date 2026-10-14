import express from "express"
import { getAllBlogs, getSingleBlog, createBlog, updateBlog, deleteBlog } from '../controllers/bookController.js'
import authCheck from "../middleware/authCheck.js"
import { adminCheck } from "../middleware/adminCheck.js"
const router = express.Router()



router.get('/', authCheck, getAllBlogs)
router.post('/', authCheck, createBlog)
router.get('/:id', getSingleBlog)
router.put('/:id', authCheck, updateBlog)
router.delete('/:id', authCheck, deleteBlog)


export default router
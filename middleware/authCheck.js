export default function authCheck(req, res, next){
    if(!req.session.userId){
        res.json({msg: "unauthenticated"})
    }
}

const router = require('express').Router();
const { Post } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const post = { name: "", content: "" }
    res.render("editpost", { post, newPost: true, loggedIn: req.session.loggedIn });
})

router.post('/'), isAuth, async (req, res) => {
    try {
        const createPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(createPost);
    } catch (err) {
        res.status(400).json(err);
    }
}
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData){
            res.status(404).json({message: 'post' + req.params.id + 'does not exist'});
        } else{
            res.status(200).json(postData)
        }
       
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)

module.exports = router;
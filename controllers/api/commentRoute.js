const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

// post a comment
router.post('/', isAuth, async (req, res) => {
try {
    const createComment = await Comment.create({
        ...req.body, user_id: req.session.user_id,
    });
    console.log(createComment)
    res.status(200).json(createComment);
} catch (err) {
    res.status(400).json(err)
}
})
/// delete a comment
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData){
            res.status(404).json({ message: 'Comment does not exist'})
            return;
        }
        else{
            res.status(200).json(commentData)
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
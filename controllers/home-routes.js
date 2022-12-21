const { Post, User, Comment } = require('../models');
const router = require('express').Router();
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                User
            ]
        })
        const posts = postData.map((post)=>post.get({
            plain: true
        }))
        res.render('homepage', {posts})
    } catch(err) {
        res.status(500).json(err)
    }
    
    // Post.findAll({
    //     attributes: [
    //         'id',
    //         'title',
    //         'content',
    //         'created_at'
    //     ],
    //     include: [{
    //         model: Comment,
    //         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    //         include: {
    //             model: User,
    //             attributes: ['username']
    //         }
    //     },
    //     {
    //         model: User,
    //         attributes: ['username']
    //     }
    //     ]
    // })
    // .then(dbPostData => {
    //     const posts = dbPostData.map(post => post.get({ plain: true }));
    //     res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id,{
            include: [
                User, 
                {
                    model:Comment, 
                    include: [User]
                }
            ]
        })
        if(postData){
            const post=postData.get({plain: true})
            res.render('single-post', {post})
        } else{
            res.status(404).end()
        }
    } catch(err){
        res.status(500).json(err)
    }
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id',
//             'content',
//             'title',
//             'created_at'
//         ],
//         include: [{
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//                 model: User,
//                 attributes: ['username']
//             }
//         },
//         {
//             model: User,
//             attributes: ['username']
//         }
//         ]
//     })
// .then(dbPostData => {
//     if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//     }
//     const post = dbPostData.get({ plain: true });
//     console.log(post);
//     res.render('single-post', { post, loggedIn: req.session.loggedIn });
// })

// .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
// });
});

// router.get('/posts-comments', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id',
//             'content',
//             'title',
//             'created_at'
//         ],
//         include: [{
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//                 model: User,
//                 attributes: ['username']
//             }
//         }]
//     })

// .then(dbPostData => {
//     if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//     }
//     const post = dbPostData.get({ plain: true });

//     res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err)
//     });
// });

module.exports = router; 
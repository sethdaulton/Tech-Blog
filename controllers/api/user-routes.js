const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: [['password']]}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        
include: [{
    model: Post,
    attributes: ['id', 'title', 'content', 'created_at']
}]
// {
//     model: Comment,
//     attributes: ['id', 'comment_text', 'created_at'],
//     include: {
//         model: Post,
//         attributes: ['title']
//     }
// },
// {
//     Model: Post,
//     attributes: ['title'],
// }

    })
.then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// signup
    router.post('/', async (req, res) => {
        try {
            const newUser = await User.create({
                username: req.body.username,
                password: req.body.password
            })
            req.session.save(()=>{
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;
                
                res.json(newUser);
            })
        } catch(err){
            res.status(500).json(err)
        }
    //     User.create({
    //         username: req.body.username,
    //         password: req.body.password
    //     })
    
    //     .then(dbUserData => {
    //             req.session.save(() => {
    //                 req.session.user_id = dbUserData.id;
    //                 req.session.username = dbUserData.username;
    //                 req.session.loggedIn = true;
    
    //                 res.json(dbUserData);
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    });
// Login
    router.post('/login', async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username,
                },
            });
            if (!user) {
                res.status(400).json({ message: 'Invalid Username' })
                return;
            }
            const validPassword = user.checkPassword(req.body.password);
            if(!validPassword) {
                res.status(400).json({ message: 'Invalid password' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.username = user.username;
                req.session.logged_in = true;

                res.json({ user, message: 'Login successful' });
            });
        } catch (err) {
            res.status(400).json({ message: 'Invalid username or password' })
        }

    });


        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that username' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password' });
                return;
            }
            req.session.save(() => {

                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: "You are now logged in!" })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

    router.post('/logout', (req, res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            })
        } else {
            res.status(404).end();
        }
    });

    router.put('/:id', (req, res) => {

        User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    router.delete('/:id', (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
   
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;



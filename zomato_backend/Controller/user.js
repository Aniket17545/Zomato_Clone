const User = require('../Model/user');

exports.postSignup = (req, res) => {
    const { email, password, name } = req.body;

    const userObj = new User({
        email,
        password,
        name
    });

    userObj.save()
        .then(response => {
            res.status(200).json({
                message: "User Details Saved Successfully",
                signup: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    user.find({
        email,
        password
    })

        .then(response => {
            if (response.length > 0) {
                res.status(200).json({
                    message: "User Details are Valid",
                    isAuthenticated: true,
                    login: response
                })
            } else {
                res.status(200).json({
                    message: "User Details not Valid",
                    isAuthenticated: false,
                    login: response
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
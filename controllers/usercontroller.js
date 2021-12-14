const router = require("express").Router()
const { UserModel } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UniqueConstraintError } = require("sequelize/dist")


router.post("/register", async (req, res) => {
    // const { firstName, lastName, email, password } = req.body

    try {
        const newUser = await UserModel.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        })

        const token = jwt.sign({
            id: newUser.id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24,
            })

        res.status(201).json({
            message: "User registered",
            user: newUser,
            token: `Bearer ${token}`
        })
    } catch (err) {
        // if (err.name === "SequelizeUniqueConstriantError")  //may need to use this as the devs ran an update and instance of doesnt work with unique constraint error
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: `${err}`
            })
        }
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginUser = await UserModel.findOne({
            where: { email }
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {

                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

module.exports = router
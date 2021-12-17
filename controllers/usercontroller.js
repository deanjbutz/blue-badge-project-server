const router = require("express").Router()
const { UserModel } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UniqueConstraintError } = require("sequelize/dist")


router.post("/register", async (req, res) => {

    const { email, password } = req.body

    try {
        const newUser = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 10),
        })

        const token = jwt.sign({
            id: newUser.id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24,
            })

        res.status(201).json({
            message: "Registration successful. Welcome To The Dungeon!",
            user: newUser,
            token: `Bearer ${token}`
        })
    } catch (err) {
        // if (err.name === "SequelizeUniqueConstriantError")  //may need to use this as the devs ran an update and instance of doesnt work with unique constraint error
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Oops! Looks like you are already registered! Please login."
            })
        } else {
            res.status(500).json({
                message: `Registration failed. Error: ${err}`
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
                    message: "Welcome Back To The Dungeon!",
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password. Please try again."
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password. Please try again."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Login failed. Error: ${err}`
        })
    }
});

module.exports = router
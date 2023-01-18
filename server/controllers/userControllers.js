const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.home = (req, res) => {
  res.send("Hello KRISHNA");
};

//createuser
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Name Email & Password must be Required");
    }
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("Email Already Exists");
    }

    const myEncyPassword = await bcrypt.hash(password, 10)

    // Creating & Inserting user into the Database
    const user = await User.create({
      name,
      email,
      password: myEncyPassword,
    });

    // Token
    const token = jwt.sign({ user_id: user._id, email },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    );
    // console.log(token);
    user.token = token
    await user.save();

    user.password = undefined
    return res.status(200).json(user)

  } catch (error) {
    return res.status(400).send("user already registered");
  }
};

//getusers
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      return res.status(400).send("Incorrect Credincial")
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not registerd");
    }

    //Match password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: '2h'
        }
      );
      user.token = token;
      await user.save();
      user.password = undefined;
      // console.log(token);

      // Cookie
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
    res.status(400).send("email or password is incorrect");
  } catch (error) {
    console.log(error);
    console.log("login error");
  }
};

// isloggedin
exports.isloggedin = async (req,res)=>{
  try {
      const loggedInUser = await User.findOne({_id: req.user});
      res.status(200).json({
        success: true,
        loggedInUser
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Login Failed"
    }
      );
  }
};

//signout
exports.signout = async (req, res) => {
try {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: 'Signout Success',
  })
} catch (error) {
  console.log(error.message);
}};







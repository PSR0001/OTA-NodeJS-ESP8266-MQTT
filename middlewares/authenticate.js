require('dotenv').config()

const authenticate = (req, res, next) => {
    // Capture the input fields
try{
    let username = req.body.username;
    let password = req.body.password;

    if (password === process.env.PASSWORD && username === process.env.USER_NAME) {

        console.log("ok");
    }
    else {

    }
}
catch(err){console.log(err);}

next()
}


module.exports = authenticate
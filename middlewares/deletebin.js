

const deleteBin = (req,res)=>{
    let { username, password } = req.body;
    if (password === process.env.PASSWORD && username === process.env.USER_NAME) {


        return true
    }
    else{
        return false
    }

}

module.exports =deleteBin
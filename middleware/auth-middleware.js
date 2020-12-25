const jwt = require('jsonwebtoken');
const Profile = require('../schemas/user');

const auth = async (req, res, next) => {
    const urlsExcluded = ['/register/(.*)', '/login/(.*)'];
    const matches = urlsExcluded.filter(function(pattern) {
        return new RegExp(pattern).test(req.url);
    });

    req.version = process.env.VERSION;

    if(matches.length < 1){
        try{
            const token = req.header('Authorization').replace('Bearer ', '');
            console.log(token);
            const data = jwt.verify(token, process.env.JWT_KEY);
            console.log(data);
            const profile = await Profile.findOne({_id: data});

            if(!profile) {
                res.status(401).send({
                    status: "Error",
                    message: "Not authorized to access this resource"
                })
            } else console.log(profile);

            req.profile = profile;

            next()
        }catch (e) {
            res.status(401).send({
                status: "Error",
                message: "Not authorized to access this resource"
            })
        }
    }else{
        next();
    }
};

module.exports = auth;

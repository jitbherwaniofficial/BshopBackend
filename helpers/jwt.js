//TO SECURE THE APIS//

const expressJwt = require("express-jwt");

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms:['HS256'],  //ALSO NEEDS TO PASS ALGORITHMS GENERATING THIS(SECRET) TOKEN//
        isRevoked:isRevoked
    }).unless({
        path:[
            {url: /\/public\/upload(.*)/ ,method:['GET','OPTIONS']}, //TO PUBLIC THE IMAGES//
            {url: /\/api\/v1\/products(.*)/ ,method:['GET','OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ ,method:['GET','OPTIONS']},
            {url: /\/api\/v1\/orders(.*)/ ,method:['POST','OPTIONS','GET']},
            `/${api}/users/login`,
            `/${api}/users/register`,
            {url:/(.*)/}
            
        ]
    })
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true);
    }
    done();
}

module.exports = authJwt;
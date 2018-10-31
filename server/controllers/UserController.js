const User                    = require('./../models/user');
const authService             = require('./../services/AuthService');
const { to, ReE, ReS }        = require('../services/util');



let SanatizeUpdateData = function(data){
	let blacklist = ['membership','role','createdAt','updatedAt','_id','__v'] ;

	for(let i=0 ; i <blacklist.length ; i++){
		if(data[blacklist[i]]){
			return true;
		}
	}
	return false;

};

const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	const body = req.body;
	if(!body.email){
		return ReE(res, 'Please enter an email to register.');
	} else if(!body.password){
		return ReE(res, 'Please enter a password to register.');
	}else{
		let err, user;

     
      [err, user] = await to(authService.createUser(body));

      if(err){

	return ReE(res, err, 422);
      }
      return ReS(res, {message:'Successfully created new user', 201);
  }
};

module.exports.create = create;

const login = async function(req, res){
	const body = req.body;
	let err, user;

	[err, user] = await to(authService.authUser(req.body));
	if(err) {
		return ReE(res, err, 422);
	}

	return ReS(res /*, Token + user object */);
};
module.exports.login = login;

const get = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;

	return ReS(res, /* user object */);
};
module.exports.get = get;

const update = async function(req, res){
	let err, user, data ;
	user = req.user;
	data = req.body;

	if(SanatizeUpdateData(data)) {
		return ReE(res,"You can't do that",403);
	}

  user.set(data);


  [err, user] = await to(user.save());
  if(err){
	return ReE(res, err , 400);
  }
  return ReS(res, {message :'Updated User: '+user.email});
};

module.exports.update = update;


const remove = async function(req, res){
	let user, err;
	user = req.user;

	[err, user] = await to(user.remove());
	if(err) {
		return ReE(res, 'error occured trying to delete user');
	}

	return ReS(res, {message:'Deleted User'}, 204);
};
module.exports.remove = remove;

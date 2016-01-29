

Accounts.onCreateUser(function(options, user) {

	console.log(user);
	console.log(user.services.facebook);
	
    if(user.services.facebook) {
	   user.username = user.services.facebook.name;
	   user.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
	}
	return user;

});

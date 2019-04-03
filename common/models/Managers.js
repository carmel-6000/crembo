'use strict';
// var logUser = require('debug')('model:user');
module.exports = function (Managers) {

	// Managers.login = function (credentials, include, callback) {

	// 	console.log("branch is",Manager.branch)
	// 	storage.setItem(branch, Managers.branch);

	// 	// Invoke the default login function\
	// 	let userModel = Customuser.app.models.User;
	// 	let rolemap = Customuser.app.models.RoleMapping;
	// 	logUser("this: ", this);
	// 	logUser("login: ", Customuser.login);

	// 	userModel.login(credentials, include, function (loginErr, loginToken) {
	// 		if (loginErr) {
	// 			logUser("login error", loginErr);
	// 			return callback(loginErr);
	// 		}
	// 		logUser("user logged!")
	// 		loginToken = loginToken.toObject();
	// 		rolemap.find({ where: { principalId: loginToken.userId } }, (err, userrole) => {
	// 			if (err)
	// 				return callback(err, null);
	// 			loginToken.role = userrole[0].roleId;
	// 			switch (loginToken.role) {
	// 				case rolesEnum.STUDENT:
	// 					loginToken.compArr = `StudentDashboard`;
	// 					break;
	// 				case rolesEnum.TEACHER:
	// 					loginToken.compArr = "TeacherDashboard";
	// 					break;
	// 				default:
	// 					loginToken.compArr = [];

	// 			}
	// 			logUser("logim token:", loginToken);
	// 			return callback(null, loginToken);
	// 			//return component arr and save in session storage
	// 		});
	// 	});
	// };
};


// CREATE TABLE `Managers` (
// 	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
// 	`realm` varchar(255) DEFAULT NULL,
// 	`username` varchar(255) DEFAULT NULL,
// 	`password` varchar(255) DEFAULT NULL,
// 	`credentials` text,
// 	`branch` int(11) unsigned DEFAULT NULL,
// 	`email` varchar(255) NOT NULL,
// 	`emailVerified` tinyint(1) DEFAULT NULL,
// 	`verificationToken` varchar(255) DEFAULT NULL,
// 	PRIMARY KEY (`id`),
// 	FOREIGN KEY (`branch`) REFERENCES `branches`(`id`)

//   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 

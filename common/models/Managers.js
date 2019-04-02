// 'use strict';
// var logUser = require('debug')('model:user');
// module.exports = function (Managers) {
// 	const rolesEnum = {
// 		ADMIN: 1,
// 		SUPERADMIN: 2,
// 		TEACHER: 3,
// 		STUDENT: 4

// 	}
// 	/** This call adds custom behaviour to the standard Loopback login.
// 	 *
// 	 *  Since it uses the User.login function of the User model, let's also
// 	 *  keep the same parameter structure.
// 	 */
// 	Managers.getUsersList = function (callback) {
// 		let userModel = Customuser.app.models.User;
// 		return userModel.find({},function (errorrr, data) {
// 			if (errorrr) {
// 				logUser("error in find")
// 				console.log("ERROR!");
// 				return callback(errorrr)
// 			}
// 			logUser("DATAAAA", data)
// 		let	payload=data.map((item,index)=>{
// 				return {id:item.id,username:item.username}
// 			})
// 			return callback(null,payload)
// 		});
// 		return callback(null,{res:'aa'})

// 	}

// 	Managers.login = function (credentials, include, callback) {
// 		// Invoke the default login function\
// 		let userModel = Customuser.app.models.User;
// 		let rolemap = Customuser.app.models.RoleMapping;
// 		logUser("this: ", this);
// 		logUser("login: ", Customuser.login);

// 		userModel.login(credentials, include, function (loginErr, loginToken) {
// 			if (loginErr) {
// 				logUser("login error", loginErr);
// 				return callback(loginErr);
// 			}
// 			logUser("user logged!")
// 			loginToken = loginToken.toObject();
// 			rolemap.find({ where: { principalId: loginToken.userId } }, (err, userrole) => {
// 				if (err)
// 					return callback(err, null);
// 				loginToken.role = userrole[0].roleId;
// 				switch (loginToken.role) {
// 					case rolesEnum.STUDENT:
// 						loginToken.compArr = `StudentDashboard`;
// 						break;
// 					case rolesEnum.TEACHER:
// 						loginToken.compArr = "TeacherDashboard";
// 						break;
// 					default:
// 						loginToken.compArr = [];

// 				}
// 				logUser("logim token:", loginToken);
// 				return callback(null, loginToken);
// 				//return component arr and save in session storage
// 			});
// 		});
// 	};
// 	Managers.remoteMethod('getUsersList', {
// 		http: {
// 			verb: 'get'
// 		},
// 		returns: { arg: 'res', type: 'object' }
// 	});
// };


// // CREATE TABLE `Managers` (
// // 	`id` int(11) NOT NULL AUTO_INCREMENT,
// // 	`realm` varchar(512) DEFAULT NULL,
// // 	`username` varchar(512) DEFAULT NULL,
// // 	`password` varchar(512) DEFAULT NULL,
// // 	`credentials` text,
// // 	`email` varchar(512) NOT NULL,
// // 	`emailVerified` tinyint(1) DEFAULT NULL,
// // 	`verificationToken` varchar(512) DEFAULT NULL,
// // 	`mainImageId` int(11) DEFAULT NULL,
// // 	PRIMARY KEY (`id`)
// //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 
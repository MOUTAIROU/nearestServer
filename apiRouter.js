// Imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var clientCtrl = require('./routes/clientCtrl')
var auth = require('./utils/auth')


//Router
exports.router = (function() {
  var apiRouter = express.Router();

  //Users routes
  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/text/').get(usersCtrl.text);

  apiRouter.route('/client/register/').post(clientCtrl.register);

  apiRouter.route('/client/search_product/').post(auth,clientCtrl.search_product);

  apiRouter.route('/client/search_phc_proche/').post(auth,clientCtrl.search_phc_proche);
  apiRouter.route('/client/search_phc_assurrance/').post(auth,clientCtrl.search_phc_assurrance);
  apiRouter.route('/client/search_phc_garde/').post(auth,clientCtrl.search_phc_garde);
  apiRouter.route('/client/client_compl_info/').post(auth,clientCtrl.client_compl_info);
  apiRouter.route('/client/client_contact/').post(auth,clientCtrl.client_contact);
  apiRouter.route('/client/check_code_verication/').post(clientCtrl.check_code_verication);




  apiRouter.route('/users/login/').post(usersCtrl.login);

  apiRouter.route('/users/update_phc_users_password/').post(auth,usersCtrl.updatePhcUsersPassword);
  apiRouter.route('/users/set_profile_phc/').post(auth,usersCtrl.set_profile_phc);
  apiRouter.route('/users/online_phc_medoc/').post(auth,usersCtrl.online_phc_medoc);
  apiRouter.route('/users/drop_online_phc_medoc/').post(auth,usersCtrl.drop_online_phc_medoc);
  apiRouter.route('/users/set_personnel_phc/').post(auth,usersCtrl.set_personnel_phc);
  apiRouter.route('/users/set_phc_assurance/').post(auth,usersCtrl.set_phc_assurance);
  apiRouter.route('/users/set_phc_garde/').post(auth,usersCtrl.set_phc_garde);


  return apiRouter;
})();

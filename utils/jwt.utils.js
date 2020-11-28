// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'ly4QG_rr_YRB0e-3-IU65fNnHkV42YPluUOUM4AI16iC1lfrXP5sRUifp9dincUGoSD-PMUJaBkHE61QkWQ86WaoXo-sPa_w2JnWT2xsmSiS06bGP8YNy0rVSMYsK0vDppyb1ipOP0A5JQ5YPmx3CdEAEWRUdIFh2cYmzkYQYSNat9b69DW9MN-vwe6V3R-EJ3Z6VGxdWlBRKGl_GOxVOUfaNR43KPkx7ePekJv1e-EYW77VAMfYnZpUfVaRxNOqJR2jGF4OcC-UROjYCPsCxZGn1qkrU_LTplSWhHqTGWimun6W6dSdnv222jdPsxEhFiYPwuHuUf1FMb2c9XKRDQ'

//Exported functions
module.exports = {
  generateTokenForUser: function(userData)  {
    return jwt.sign(userData ,JWT_SIGN_SECRET,{
      noTimestamp:true,
      expiresIn: '9999 years'
    })
  },
  authenticateJWT: function(authHeader) {

    if (authHeader) {


        var token = authHeader.split(' ')[1];



        return  jwt.verify(token,JWT_SIGN_SECRET, (err, result) => {
                              if (err) {

                                  return 'jwt bad authorization'

                              }else {

                                 return result

                              }

                     });


    } else {
        return 'notAuthenticateSet'
    }

  }

}

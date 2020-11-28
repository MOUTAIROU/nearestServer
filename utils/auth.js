var jwtUtils = require('../utils/jwt.utils')

module.exports = (req, res, next) => {
  try {


          const authHeader = req.headers.authorization;


          let result = jwtUtils.authenticateJWT(authHeader)
           const {id} = req.body


          if(result.id){

              next()

          }else {
            return res.status(406).json({'errors':' Authorization Not Acceptable id '})
          }

          if(result == 'notAuthenticateSet' ){

               return res.status(511).json({'errors':'Network Authentication Required'})

          }

          if(result == 'jwt bad authorization' ){

               return res.status(406).json({'errors':' Authorization Not Acceptable'})

          }

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

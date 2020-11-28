var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var pool = require('../dbconfig/dbconfig')
var multer  = require('multer')

var userListe = []

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
          cb(null, './public/intituler_phc/')
    },
    filename: function (req, file, cb)
    {
      cb(null, req.body.id + '_'+ file.originalname )
    }
})

var upload = multer({ storage: storage }).single('file')


module.exports = {
  register: function(req, res, next) {


    var username = req.body.username;
    var password = req.body.password;
    var userData = req.body

    var today = new Date().toISOString().slice(0, 10)

    if(username == null || password == null ){
      return res.status(400).json({'errors':'missing parameters'})
      next()
    }


    try{
            SELECT_RESTO = `SELECT count(id) as count FROM phc_users  WHERE  phc_names='${username}'`
            pool.query(SELECT_RESTO,(err,resultat)=>{

                  if(err){
                      return res.send(err)

                  }else{

                        if(resultat[0].count == '0'){
                            bcrypt.hash(password.trim(), 8, function(err, hash) {

                              INSERT_DATA = `INSERT INTO  phc_users (phc_names,password,date) VALUES ('${username}','${hash}','${today}');SELECT LAST_INSERT_ID() as id`

                                    if(err){
                                      next(err)
                                    }else {

                                          pool.query(INSERT_DATA,[2, 1],(err,resultat)=>{
                                            if (err){
                                              next(err)
                                            }else {

                                                  let id = resultat[1][0].id

                                                 userData = {...userData, id}

                                              return res.status(201).json({
                                                'id':id,
                                                'token':jwtUtils.generateTokenForUser(userData)
                                              })
                                              next()
                                            }
                                          })

                                    }
                            })


                    }else {
                      res.status(409).json({'errors':'compte existe déja'})
                    }

                  }

              })

          }catch(err){
            next(err);
         }


  },
  login: function(req, res, next) {


      const { password , username, id } = req.body

      if( password == null || username == null || id == null){

         return res.status(406).json({"error":"parameters missing"})
         next()
      }




       var userData = req.body

      const SELECT = `SELECT password FROM phc_users WHERE id='${id}' and phc_names='${username}'`




          pool.query(SELECT,function(err,result){
                        if(err){
                          next(err)
                        }else{


                              if(result[0] == undefined ) {

                                return res.status(406).json({'errors':'Password is not the same'})
                                 next()

                              }


                               bcrypt.compare(password, result[0].password, function(error, resp) {

                                   if (error)
                                       {
                                         res.status(406).json({'errors':'Password is not the same'})
                                          next()

                                       }else {

                                           if(resp == true)
                                              {
                                                return res.status(201).json({
                                                  'id':id,
                                                  'token':jwtUtils.generateTokenForUser(userData)
                                                })

                                                res.status(200).json({'success':'success'})
                                                 next()
                                              }
                                              else {

                                                   res.status(406).json({'errors':'Password is not the same'})
                                                    next()
                                              }
                                       }
                               })

                        }
          })


  },
  updatePhcUsersPassword: function(req, res, next){

       const { ancienPassword , nouveauPassword ,id } = req.body

       if( ancienPassword == null || nouveauPassword == null || id == null){

          return res.status(406).json({"error":"parameters missing"})
          next()
       }

       const SELECT = `SELECT password FROM phc_users WHERE id='${id}'`

           pool.query(SELECT,function(err,result){
                         if(err){
                           next(err)
                         }else{

                                bcrypt.compare(ancienPassword, result[0].password, function(error, resp) {

                                    if (error)
                                        {
                                          next(error)
                                        }else {

                                            if(resp == true)
                                               {
                                                         bcrypt.hash(nouveauPassword, 8, function(hasherr, hash) {
                                                             UPDATE_PWD = `UPDATE phc_users SET password='${hash}' WHERE id='${id}'`

                                                                      pool.query(UPDATE_PWD,(err,resultat)=>{

                                                                             if(hasherr){

                                                                               next(hasherr)
                                                                             }else{

                                                                                   res.status(200).json({'success':'password has been updated successful'})
                                                                                    next()
                                                                             }

                                                                         })

                                                         })
                                               }
                                               else {

                                                    res.status(406).json({'errors':'Password is not the same'})
                                                     next()
                                               }
                                        }
                                })

                         }
           })


  },
  set_profile_phc:function(req, res, next){

    upload(req, res, function (err) {

            if (err instanceof multer.MulterError) {
                  return res.status(500).json(err)
              } else if (err) {
                  return res.status(500).json(err)
              }

              const {phone1,phone2,ville,quartier,rue1,rue2,email,long,lat,id,intituler} = req.body

              console.log(req.body);

              if( phone1 == null || phone2 == null || quartier == null || rue1 == null || email == null || long == null || lat == null || id == null || intituler == null){

                 return res.status(406).json({"error":"parameters missing"})
                 next()
              }

              const { originalname } = req.file
              let img_lien = id+'_'+originalname

              SELECT_RESTO = `SELECT count(id) as count FROM phc_profiles  WHERE  phc_id='${id}'`

              INSERT = `INSERT INTO phc_profiles (phc_id, img_lien, phone1, phone2, ville ,quartier, rue1 ,rue2, mail,longtitude,latitude,intituler) VALUES ('${parseInt(id)}','${img_lien}','${phone1}','${phone2}','${ville}','${quartier}','${rue1}','${rue2}','${email}','${parseFloat(long)}','${parseFloat(lat)}','${intituler}')`


               UPDATE = `UPDATE phc_profiles SET img_lien='${img_lien}',phone1='${phone1}',phone2='${phone2}',ville='${ville}',quartier='${quartier}',
               rue1='${rue1}',rue2='${rue2}',mail='${email}',longtitude='${parseFloat(long)}',latitude='${parseFloat(lat)}',intituler='${intituler}' WHERE phc_id='${parseInt(id)}'`

              pool.query(SELECT_RESTO,(err,resultat)=>{

                console.log(resultat[0].count);
                  if(resultat[0].count == '0'){


                        pool.query(INSERT,(insert_err,insert_resultat)=>{

                              if(insert_err){
                                next(insert_err)
                              }else {
                                res.status(200).json({'success':'success'})
                                next()
                              }

                        })

                  }else {
                      console.log(UPDATE);
                    pool.query(UPDATE,(updated_err,updated_resultat)=>{

                          if(updated_err){
                            next(updated_err)
                          }else {
                            res.status(200).json({'success':'profile has been updated successful'})
                            next()
                          }

                    })
                  }

              })








     })


  },
  online_phc_medoc:function(req, res, next){

       const { id ,products } = req.body

       if( id == null || products == null){

          return res.status(406).json({"error":"parameters missing"})
          next()
       }

      var SELECT_RESTO = `SELECT count(id) as count FROM phc_drugs  WHERE  phc_id='${id}'`

      var today = new Date().toISOString().slice(0, 10)

       pool.query(SELECT_RESTO,(err,resultat)=>{

         if(resultat[0].count == '0'){

               var SELECT = ``
               SELECT += `INSERT INTO phc_drugs (phc_id, name, molecule, quantity, price, code, date) VALUES `

                   products.forEach((item,index,products) => {

                       if(Object.is(products.length - 1, index)){

                        SELECT += `('${id}','${item.name}','${item.molecule}','${item.quantity}','${item.price}','${item.code+''+id}','${today}');`
                       }else {
                        SELECT += `('${id}','${item.name}','${item.molecule}','${item.quantity}','${item.price}','${item.code+''+id}','${today}'),  `
                       }

                   })

                   pool.query(SELECT,(select_err,result)=>{
                      if (select_err){
                         next(select_err)
                      }else {
                        res.status(200).json({'success':'success'})
                        next()
                      }


                   })



         }else{


           var SELECT = ``
               products.forEach((item,index,products) => {

                 SELECT += `UPDATE phc_drugs SET name='${item.name}',molecule='${item.molecule}',quantity='${item.quantity}',price='${item.price}',date='${today}' WHERE phc_id='${id}' and code = '${item.code+''+id}';`

               })

               pool.query(SELECT,(select_err,result)=>{
                  if (select_err){
                     next(select_err)
                  }else {
                    res.status(200).json({'success':'success'})
                    next()
                  }

               })

         }

       })



  },
  drop_online_phc_medoc:function(req,res,next){
    const { id ,products } = req.body

    if( id == null || products == null){

       return res.status(406).json({"error":"parameters missing"})
       next()
    }

   var SELECT_RESTO = `SELECT count(id) as count FROM phc_drugs  WHERE  phc_id='${id}'`

   var today = new Date().toISOString().slice(0, 10)

    pool.query(SELECT_RESTO,(err,resultat)=>{

      if(resultat[0].count == '0'){


                  res.status(404).json({'error':'The pharmacy is not found'})



      }else{



          var DELETE = ``
          var code_delete = ``
          DELETE += `DELETE FROM phc_drugs `
              products.forEach((item,index,products) => {

                  if(Object.is(products.length - 1, index)){

                      code_delete += `'${item.code+''+id}'`

                  }else {

                      code_delete += `'${item.code+''+id}',`
                  }

              })


                DELETE += `WHERE code IN (${code_delete}) and phc_id='${id}'`

                  pool.query(DELETE,(select_err,result)=>{
                     if (select_err){
                        next(select_err)
                     }else {
                       res.status(200).json({'success':'success'})
                       next()
                     }

                  })

      }

    })

  },
  set_personnel_phc:function(req,res,next){

     const {id,nom,prenom,pseudo,email,role,code,telephone} = req.body

     if( id == null || prenom == null  || pseudo == null  || email == null || role == null || code == null || telephone == null){

        return res.status(406).json({"error":"parameters missing"})
        next()
     }

     var SELECT_RESTO = `SELECT count(id) as count FROM phc_employs WHERE  phc_id='${id}' and code = '${code+''+id}'`

     pool.query(SELECT_RESTO,(err,resultat)=>{

       if(resultat[0].count == '0'){

             var INSERT = `INSERT INTO phc_employs (phc_id,name,prenom,telephone,role,mail,code) VALUES ('${id}','${nom}','${prenom}','${telephone}','${role}','${email}','${code+''+id}')`

               pool.query(INSERT,(err,result)=>{
                   if(err){
                     next(err)
                   }else {
                       res.status(200).json({'success':'success'})
                        next()
                   }
               })
       }
       else {

           UPDATE =  `UPDATE phc_employs SET name='${nom}', prenom='${prenom}', telephone='${telephone}', role='${role}', mail='${email}' WHERE phc_id='${id}' and code='${code+''+id}'`

           pool.query(UPDATE,(err,result)=>{
               if(err){
                 next(err)
               }else {
                   res.status(200).json({'success':'profile has been updated successful'})
                    next()
               }
           })

       }

       })




  },
  set_phc_assurance:function(req,res,next){


     var today = new Date().toISOString().slice(0, 10)

     const {id,assurance} = req.body

     if( id == null || assurance == null ){

        return res.status(406).json({"error":"parameters missing"})
        next()
     }

     var SELECT_RESTO = `SELECT count(id) as count FROM phc_insurances WHERE  phc_id='${id}'`

     pool.query(SELECT_RESTO,(err,resultat)=>{


           if(resultat[0].count == '0'){

               var SELECT = ``

               SELECT += `INSERT INTO phc_insurances (phc_id, insurance_id, assurance,date) VALUES `

                   assurance.forEach((item,index,assurance) => {

                       if(Object.is(assurance.length - 1, index)){

                        SELECT += `('${id}','${item.code+''+id}','${item.assurance}','${today}');`

                       }else {
                        SELECT += `('${id}','${item.code+''+id}','${item.assurance}','${today}'), `
                       }

                   })


                       pool.query(SELECT,(select_err,result)=>{
                          if (select_err){
                             next(select_err)
                          }else {
                            res.status(200).json({'success':'success'})
                            next()
                          }

                       })




           }else {


                  var UPDATE = ``

                  assurance.forEach((item,index,assurance) => {

                    UPDATE += `UPDATE phc_insurances SET assurance='${item.assurance}',date='${today}' WHERE phc_id='${id}' and insurance_id = '${item.code+''+id}';`

                  })


                        pool.query(UPDATE,(select_err,result)=>{
                           if (select_err){
                              next(select_err)
                           }else {
                             res.status(200).json({'success':'insurance has been update successful'})
                             next()
                           }

                        })

           }

      })


  },
  set_phc_garde:function(req,res,next){

    const {id,gard} = req.body

    if( id == null || gard == null ){

       return res.status(406).json({"error":"parameters missing"})
       next()
    }


    assurance

       var SELECT_RESTO = `SELECT count(id) as count FROM phc_gards WHERE  phc_id='${id}'`

            pool.query(SELECT_RESTO,(select_err,resultat)=>{



                    if(resultat[0].count == '0'){

                      var SELECT = ``
                          SELECT += `INSERT INTO phc_gards (phc_id, lun_ouvert, lun_fermer, mar_ouvert, mar_fermer, mer_ouvert, mer_fermer, jeu_ouvert, jeu_fermer, ven_ouvert, ven_fermer, sam_ouvert, sam_fermer, dim_ouvert, dim_fermer) VALUES  `

                      var insert_inside = ``


                             gard.forEach((item,index) => {


                                   if(item.lun){

                                        insert_inside += `'${item.lun.ouverture}','${item.lun.fermeture}',`

                                   }

                                   if(item.mar){

                                        insert_inside += `'${item.mar.ouverture}','${item.mar.fermeture}',`

                                   }


                                   if(item.mer){

                                         insert_inside += `'${item.mer.ouverture}','${item.mer.fermeture}',`

                                   }

                                   if(item.jeu){

                                        insert_inside += `'${item.jeu.ouverture}','${item.jeu.fermeture}',`

                                   }


                                   if(item.ven){

                                        insert_inside += `'${item.ven.ouverture}','${item.ven.fermeture}',`

                                   }


                                   if(item.sam){

                                       insert_inside += `'${item.sam.ouverture}','${item.sam.fermeture}',`

                                   }


                                   if(item.dim){

                                      insert_inside += `'${item.dim.ouverture}','${item.dim.fermeture}'`


                                   }



                             })

                             SELECT += `('${id}',${insert_inside})`


                               pool.query(SELECT,(err,result)=>{
                                 if(err){
                                   next(err)
                                 }else {
                                   res.status(200).json({'success':'success'})
                                   next()
                                 }

                               })

                    }else {
                      //console.log('update');

                      var UPDATE = ``
                          UPDATE += `UPDATE phc_gards SET  `

                      var insert_inside = ``


                             gard.forEach((item,index) => {


                                   if(item.lun){

                                        insert_inside += `lun_ouvert='${item.lun.ouverture}',lun_fermer ='${item.lun.fermeture}',`

                                   }

                                   if(item.mar){

                                        insert_inside += `mar_ouvert='${item.mar.ouverture}',mar_fermer='${item.mar.fermeture}',`

                                   }


                                   if(item.mer){

                                         insert_inside += `mer_ouvert='${item.mer.ouverture}',mer_fermer='${item.mer.fermeture}',`

                                   }

                                   if(item.jeu){

                                        insert_inside += `jeu_ouvert='${item.jeu.ouverture}',jeu_fermer='${item.jeu.fermeture}',`

                                   }


                                   if(item.ven){

                                        insert_inside += `ven_ouvert='${item.ven.ouverture}',ven_fermer='${item.ven.fermeture}',`

                                   }


                                   if(item.sam){

                                       insert_inside += `sam_ouvert='${item.sam.ouverture}',sam_fermer='${item.sam.fermeture}',`

                                   }


                                   if(item.dim){

                                      insert_inside += `dim_ouvert='${item.dim.ouverture}',dim_fermer='${item.dim.fermeture}'`


                                   }



                             })

                             UPDATE += `${insert_inside} WHERE phc_id = '${id}' `


                               pool.query(UPDATE,(err,result)=>{
                                 if(err){
                                   next(err)
                                 }else {
                                   res.status(200).json({'success':'Gard has been update successful'})
                                   next()
                                 }

                               })
                    }

            })

  }


}

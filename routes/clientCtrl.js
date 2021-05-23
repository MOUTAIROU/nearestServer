var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var pool = require('../dbconfig/dbconfig')
var multer  = require('multer')
var twilioMsg = require('./twilioSms')


var _eQuatorialEarthRadius = 6378.1370;
var _d2r = (Math.PI / 180.0);


module.exports = {
  register:function(req,res,next){



       const { username , telephone } = req.body


       var today = new Date().toISOString().slice(0, 10)

       var userData = req.body

        if( username == null && telephone == null ){

            return res.status(400).json({'errors':'missing parameters'})
            next()
        }


          SELECT_RESTO = `SELECT count(id) as count FROM client_users  WHERE  client_name='${username}' and client_telephone='${telephone.replace(/\s+/g, "")}'`


               pool.query(SELECT_RESTO,(err,resultat)=>{

                   if(err){
                     next(err)
                   }else {

                         if(resultat[0].count == '0'){


                             var INSERT = `INSERT INTO client_users ( client_name,client_telephone, date) VALUES ('${username}','${telephone.replace(/\s+/g, "")}','${today}');SELECT LAST_INSERT_ID() as id`
                             pool.query(INSERT,(err,result)=>{

                                 if(err){
                                   next(err)
                                 }else {

                                       setTimeout(function() {
                                       resetcode(telephone,id)
                                       }, 150000);

                                      let id = result[1][0].id

                                       vericationCode(telephone.replace(/\s+/g, ""),id)

                                       res.status(200).json({
                                                   "success":"create",
                                                    "id":id,
                                                    "telephone":telephone.replace(/\s+/g, ""),
                                                    "username":username
                                                 })

                                                 setTimeout(function() {
                                                 resetcode(telephone,id)
                                                 }, 150000);

                                 }

                             })

                         }else {

                               SELECT_ID = `SELECT id FROM client_users  WHERE  client_name='${username}' and client_telephone='${telephone.replace(/\s+/g, "")}'`

                               pool.query(SELECT_ID,(err,result)=>{

                                   if(err){
                                     next(err)
                                   }else {


                                        let id = result[0].id


                                             vericationCode(telephone.replace(/\s+/g, ""),id)


                                            res.status(200).json({
                                                        "success":"update",
                                                         "id":id,
                                                         "telephone":telephone.replace(/\s+/g, ""),
                                                         "username":username
                                                      })

                                                      setTimeout(function() {
                                                      resetcode(telephone,id)
                                                      }, 150000);
                                   }

                               })

                         }
                   }

               })


  },
  check_code_verication:function(req,res,next){

    const { id , telephone , checkcode } = req.body


    var today = new Date().toISOString().slice(0, 10)

    var userData = {id , telephone}

     if( id == null && telephone == null && checkcode == null ){

         return res.status(400).json({'errors':'missing parameters'})
         next()
     }

     SELECT_RESTO = `SELECT count(id) as count FROM client_users  WHERE  id='${id}' and client_telephone='${telephone.replace(/\s+/g, "")}' and checkCode='${checkcode}'`

    console.log(SELECT_RESTO);
     pool.query(SELECT_RESTO,(err,resultat)=>{

         if(err){
           next(err)
         }else {
                    console.log(resultat[0].count);
               if(resultat[0].count !== '0'){

                   userData = {...userData, id}
                   return res.status(201).json({
                      'id':id,
                      'token':jwtUtils.generateTokenForUser(userData)
                    })
                    next()
                 }else {
                     return res.status(401).json({'error':'bad response'})
                     next()
                 }

             }
        })
  },
  search_product:function(req,res,next){

    console.log('search_product');

    const { lat, lnt , rayon, search , ville} = req.body

    console.log(req.body);

    var now = new Date();
    var current = [
          now.getHours(),
          ':',
          now.getMinutes()
    ].join('');


     var tmp = [] , item = {}

     var time1 = "01:00";
     var time2 = "23:59";



     var currentInMinutes = getTimeAsNumberOfMinutes(current);


     if( lat == null || lnt == null || rayon == null || search == null){

        return res.status(406).json({"error":"parameters missing"})
        next()
     }


    //  var SELECT = `SELECT  phc.phc_id, phc.img_lien, phc.phone1, phc.phone2, phc.ville, phc.quartier, phc.intituler, phc.rue1, phc.rue2, phc.mail, phc.longtitude,phc.latitude,drugs.name,
    //    drugs.molecule , drugs.quantity ,drugs.price ,drugs.code ,${senday()} FROM phc_profiles as phc, phc_drugs as drugs, phc_gards as gards WHERE phc.phc_id = drugs.phc_id and  phc.phc_id = gards.phc_id and MATCH(drugs.name) AGAINST('${search}*' IN BOOLEAN MODE)`

//    var SELECT = `SELECT  phc.phc_id, phc.img_lien, phc.phone1, phc.phone2, phc.ville, phc.quartier, phc.intituler, phc.rue1, phc.rue2, phc.mail, phc.longtitude,phc.latitude,drugs.name,
//      drugs.molecule , drugs.quantity ,drugs.price ,drugs.code ,${senday()} FROM phc_profiles as phc, phc_drugs as drugs, phc_gards as gards WHERE phc.phc_id = drugs.phc_id and  phc.phc_id = gards.phc_id and MATCH(drugs.name) AGAINST('${search}*' IN BOOLEAN MODE)`

    var SELECT = `SELECT  phc.phc_id, phc.img_lien, phc.phone1, phc.phone2, phc.ville, phc.quartier, phc.intituler, phc.rue1, phc.rue2, phc.mail, phc.longtitude,phc.latitude,drugs.name,
      drugs.molecule , drugs.quantity ,drugs.price ,drugs.code ,${senday()} FROM phc_profiles as phc, phc_drugs as drugs, phc_gards as gards WHERE phc.phc_id = drugs.phc_id and  phc.phc_id = gards.phc_id and drugs.name LIKE '%${search}%'`

  console.log(SELECT);
// "SELECT id,name FROM `hin` WHERE name LIKE '%". mysql_real_escape_string($q) ."%'"

//drugs.name LIKE '%". mysql_real_escape_string(${search}) ."%'


        pool.query(SELECT,(err,resultat) => {

             if(err){
               next(err)
             }else {

                console.log(resultat);
               resultat.forEach((item,index) => {

                    let distance = HaversineInM(lat,lnt,item.latitude,item.longtitude)
                     console.log(distance);
                   if( distance <= ConvertionInM(parseInt(rayon)) ){

                     item = {...item, distance}
                      tmp.push(item)
                   }
                })

                  console.log(tmp);
                res.status(200).json({
                   'data':tmp.sort(ascendingOrder),
                 })
                 next()

             }


         })


  },
  search_phc_proche:function(req,res,next){
    const { lat, lnt ,ville} = req.body

   console.log(req.body);

      if( lat == null || lnt == null ){

         return res.status(406).json({"error":"parameters missing"})
         next()
      }


     var tmp = []

        var SELECT = `SELECT  phc.id,phc.phc_id, phc.img_lien, phc.phone1, phc.phone2, phc.ville, phc.quartier, phc.rue1, phc.rue2, phc.mail, phc.longtitude,phc.latitude
        ,phc.intituler ,${senday()}  FROM phc_profiles as phc INNER JOIN phc_gards as gards ON phc.phc_id=gards.phc_id`


         pool.query(SELECT,(err,resultat) => {

             if(err){
               next(err)
             }else {


          console.log(resultat);
               resultat.forEach((item,index) => {



                       let distance = HaversineInM(lat,lnt,item.latitude,item.longtitude)


                      if( distance <= 40000 ){

                        item = {...item, distance}
                         tmp.push(item)
                        }
                })



                res.status(200).json({
                   'data':tmp.sort(ascendingOrder),
                 })
                 next()

             }




         })


  },
  search_phc_assurrance:function(req,res,next){

      const { lat, lnt ,ville,rayon,search} = req.body


      if( lat == null || lnt == null || ville == null || search == null, rayon == null){

         return res.status(406).json({"error":"parameters missing"})
         next()
      }


     var tmp = []

     var SELECT = `SELECT  phc.phc_id, phc.img_lien, phc.phone1, phc.phone2, phc.ville, phc.quartier, phc.rue1, phc.rue2, phc.mail, phc.longtitude,phc.latitude, insurances.assurance,
      phc.intituler,${senday()} FROM phc_profiles as phc, phc_insurances as insurances, phc_gards as gards WHERE phc.phc_id = insurances.phc_id and  phc.phc_id = gards.phc_id and insurances.assurance LIKE '%${search}%'`


         pool.query(SELECT,(err,resultat) => {

             if(err){
               next(err)
             }else {

        console.log(resultat);

               resultat.forEach((item,index) => {

                           let distance = HaversineInM(lat,lnt,item.latitude,item.longtitude)

                          if( distance <= ConvertionInM(parseInt(rayon)) ){

                            item = {...item, distance}
                             tmp.push(item)
                          }
                })


                res.status(200).json({
                   'data':tmp.sort(ascendingOrder),
                 })
                 next()

             }


         })


  },
  search_phc_garde:function(req,res,next){

     const { lat, lnt, ville} = req.body



    if( lat == null || lnt == null || ville == null){

          return res.status(406).json({"error":"parameters missing"})
          next()

    }

   var tmp = []
   var SELECT =``
   SELECT += `SELECT  phc.phc_id, phc.img_lien, phc.phone1, phc.phone2, phc.ville, phc.quartier, phc.rue1, phc.rue2, phc.mail, phc.longtitude, phc.latitude, phc.intituler`

    if(getday() == 0){
       // dimanche

        SELECT += `, gards.dim_ouvert as ouverture, gards.dim_fermer as fermeture`
    }

    if(getday() == 1){
     // lundi
      SELECT += `, gards.lun_ouvert as ouverture, gards.lun_fermer as fermeture`

    }

    if(getday() == 2){
     // lundi
      SELECT += `, gards.mar_ouvert as ouverture, gards.mar_fermer as fermeture`

    }

    if(getday() == 3){
       // mardi
       SELECT += `, gards.mer_ouvert as ouverture, gards.mer_fermer as fermeture`

    }

    if(getday() == 4){

       // mercerdi
       SELECT += `, gards.jeu_ouvert as ouverture, gards.jeu_fermer as fermeture`

    }

    if(getday() == 5){
       // jeudi
       SELECT += `, gards.ven_ouvert as ouverture, gards.ven_fermer as fermeture `
    }


    if(getday() == 6){
       // samedi
         SELECT += `, gards.sam_ouvert as ouverture, gards.sam_fermer as fermeture `

    }

    SELECT += ` FROM phc_profiles as phc INNER JOIN phc_gards as gards ON phc.phc_id=gards.phc_id`



        pool.query(SELECT,(err,resultat) => {

            if(err){
              next(err)
            }else {


              resultat.forEach((item,index) => {

                          let distance = HaversineInM(lat,lnt,item.latitude,item.longtitude)


                         if( distance <= 40000 ){

                           item = {...item, distance}
                            tmp.push(item)
                           }
               })

               res.status(200).json({
                  'data':tmp.sort(ascendingOrder),
                })
                next()

            }


        })



  },
  client_compl_info:function(req,res,next){
    const {nom ,prenom ,telephone ,email ,ville, id} = req.body

    var SELECT_RESTO = `SELECT count(id) as count FROM client_compl_info  WHERE  client_id='${id}'`


    if( nom == null || prenom == null || telephone == null || email == null || ville == null || id == null){

      return res.status(406).json({"error":"parameters missing"})
      next()

    }

      pool.query(SELECT_RESTO,(err,resultat)=>{

          if(err){
            next(err)
          }else {

            if(resultat[0].count == '0'){

                 var INSERT = ` INSERT INTO client_compl_info ( nom, premon, telephone, email, ville, client_id) VALUES ('${nom}','${prenom}','${telephone.replace(/\s+/g, "")}','${email}','${ville}','${id}')`


                      pool.query(INSERT,(inser_err,inser_result)=>{
                        if(inser_err){
                          next(inser_err)
                        }else {

                          res.status(200).json({"success":"success"})
                          next()

                        }

                      })



            }else {

              var UPDATE= `UPDATE client_compl_info SET nom='${nom}',premon='${prenom}',telephone='${telephone.replace(/\s+/g, "")}',email='${email}',ville='${ville}' WHERE client_id='${id}'`

              pool.query(UPDATE,(inser_err,inser_result)=>{
                if(inser_err){
                  next(inser_err)
                }else {

                  res.status(200).json({"success":"update"})
                  next()

                }

              })
            }


          }
      })

  },
  client_contact:function(req,res,next){

    const {id, msg, nom, email } = req.body

     var today = new Date().toISOString().slice(0, 10)

      if(id == null || msg == null || nom == null ){

          return res.status(406).json({"error":"parameters missing"})
          next()

      }

         var INSERT = ` INSERT INTO client_contact( msg, nom, client_id, email ,date) VALUES ('${msg}','${nom}','${id}','${email}','${today}')`


           pool.query(INSERT,(inser_err,inser_result)=>{
             if(inser_err){
               next(inser_err)
             }else {

               res.status(200).json({"success":"success"})
               next()

             }

           })




  }
}

function HaversineInM(lat1, long1, lat2, long2){
    return (1000.0 * HaversineInKM(lat1, long1, lat2, long2));
}

function HaversineInKM(lat1, long1, lat2, long2){
    var dlong = (long2 - long1) * _d2r;
    var dlat = (lat2 - lat1) * _d2r;
    var a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
    var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    var d = _eQuatorialEarthRadius * c;

    return d;
}

function ConvertionInM(value){
  return (1000.0 * value )
}

function getday() {
  var d = new Date();
  var n = d.getDay()
  return n;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

function getTimeAsNumberOfMinutes(time)
{
   if( time != undefined) {

       var timeParts = time.split(":");

       var timeInMinutes = (timeParts[0] * 60) + timeParts[1];

       return timeInMinutes;

   }

}

function senday(){
  if(getday() == 0){
     // dimanche

    return ` gards.dim_ouvert as ouverture, gards.dim_fermer as fermeture`
  }

  if(getday() == 1){
   // lundi
    return ` gards.lun_ouvert as ouverture, gards.lun_fermer as fermeture`

  }

  if(getday() == 2){
   // lundi
   return ` gards.mar_ouvert as ouverture, gards.mar_fermer as fermeture`

  }

  if(getday() == 3){
     // mardi
     return ` gards.mer_ouvert as ouverture, gards.mer_fermer as fermeture`

  }

  if(getday() == 4){

     // mercerdi
     return ` gards.jeu_ouvert as ouverture, gards.jeu_fermer as fermeture`

  }

  if(getday() == 5){
     // jeudi
     return ` gards.ven_ouvert as ouverture, gards.ven_fermer as fermeture `
  }


  if(getday() == 6){
     // samedi
      return ` gards.sam_ouvert as ouverture, gards.sam_fermer as fermeture `

  }
}

// a and b are object elements of your array
function ascendingOrder(a,b) {
  return parseFloat(a.distance) - parseFloat(b.distance);
}

function vericationCode(telephone,id){

  let code = Math.floor(Math.random()*9000) + 1000,
      status = false

    SELECT_RESTO = `SELECT count(id) as count FROM client_users  WHERE  id='${id}' and client_telephone='${telephone.replace(/\s+/g, "")}'`

    pool.query(SELECT_RESTO,(err,resultat)=>{

        if(err){
          console.log(err);
          status = false
        }else {

              if(resultat[0].count == '0'){


                  var INSERT = `INSERT INTO client_users (checkCode) VALUES ('${code}') WHERE  id='${id}' and client_telephone='${telephone.replace(/\s+/g, "")}'`
                  pool.query(INSERT,(err,result)=>{

                      if(err){
                        console.log(err);
                        status =  false
                      }else {

                          twilioMsg.sendSms(telephone,code)
                         console.log(' insert success ok');
                        status =  true
                      }

                  })

              }else {

                    UPDATE_ID = `UPDATE client_users SET checkCode='${code}' WHERE id='${id}' and client_telephone='${telephone.replace(/\s+/g, "")}'`


                    pool.query(UPDATE_ID,(err,result)=>{

                        if(err){
                           console.log(err);
                          status =  false
                        }else {
                              console.log(' update success ok');
                              twilioMsg.sendSms(telephone,code)
                            status =  true
                        }

                    })

              }
        }

    })

    return status

}

function resetcode(telephone,id){
  console.log("setTimeout");
  console.log(telephone,id);
  UPDATE_ID = `UPDATE client_users SET checkCode='000000' WHERE id='${id}'`


  pool.query(UPDATE_ID,(err,result)=>{

      if(err){
         console.log(err);
      }else {
            console.log(' ok');

      }

  })
}

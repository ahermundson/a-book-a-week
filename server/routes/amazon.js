var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function() {
  // var baseURL = 'http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=[' + process.env.SECRET_ACCESS_KEY + ']&AssociateTag=[' + process.env.ACCESS_KEY_ID + ']&Operation=ItemLookup&ItemId=[9780857521828]&IdType=ISBN&Timestamp=[YYYY-MM-DDThh:mm:ssZ]&Signature=[Request Signature]';

  var options = {
    host: 'webservices.amazon.com',
    path: 'webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=' + process.env.SECRET_ACCESS_KEY + '&AssociateTag=' + process.env.ACCESS_KEY_ID + '&Operation=ItemLookup&ItemId=9780857521828&IdType=ISBN&Signature=[Request%20Signature]'
  };

  request('http://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&AssociateTag=mytag-20&Condition=New&ItemId=B0011ZK6PC%2CB000NK8EWI&Merchant=Amazon&Operation=ItemSearch&Operation=SimilarityLookup&ResponseGroup=Offers%2CItemAttributes&Service=AWSECommerceService&SimilarityType=Intersection&Timestamp=2014-08-18T17%3A39%3A22.000Z&Version=2013-08-01&Signature=nIlF7C6O1T3faoXIZgGVxYXd%2BD%2F39%2BFPSnwdfiQvy9g%3D', function(error, response, body) {
    console.log("Amazon: ", response);
      // amazon = res;
      // console.log("Amazon: ", amazon);
  });
});


module.exports = router;

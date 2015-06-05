var chai     = require('chai'),
    expect   = chai.expect,
    dbpediaService = require('../services/dbpediaService'),
    Q = require('q');

describe('getThings', function(){
  it('should return a list of things', function(done){
      this.timeout(15000);
      var location = {};
      location.lat = 45;
      location.long = -122;
      var radius = 1;
      Q.nfcall(dbpediaService.nearbyPlaces,location, radius).then(function(places) {
        expect(places).to.be.an('array');
        done();
      });
    });    
  });





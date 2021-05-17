//const chai = require('chai');
const expect = require('chai').expect;
const request = require('request');
//const app = require('../app');
const axios = require('axios').default;

const urlBase = "http://localhost:3000"

//Vowel counting has 2 endpoints, GET and POST 
describe('Vowel counting API', () => {

  describe('GET/ grabs text from url', () => {
    /*built an array with urls and associated response casses and used forEach to map through them and use request for every case, it works nice*/
    const cases = [
      {
        url: "/api/count-vowels/aei",
        result:
        {
          "text": "aei",
          "vowels": 3
        }
      },
      {
        url: "/api/count-vowels/a",
        result:
        {
          "text": "a",
          "vowels": 1
        }
      },
      {
        url: "/api/count-vowels/uusfeilmoa",
        result:
        {
          "text": "uusfeilmoa",
          "vowels": 6
        }
      }
    ];

    //checked for status to be 200
    it('returns status 200', () => {
      cases.forEach(elem => {
        request(urlBase + elem.url, (err, res, body) => {
          expect(res.statusCode).to.equal(200);
        })
      })
    })

    //checked for content-type to be application/json
    it('returns json data', () => {
      cases.forEach(elem => {
        request(urlBase + elem.url, (err, res, body) => {
          //expect(typeof JSON.parse(body)).to.equal('object');
          expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
        })
      })
    })

    //checked for data to match each of the cases in the cases array
    it('returns number of vowels in text', () => {
      cases.forEach(elem => {
        request(urlBase + elem.url, (err, res, body) => {
          expect(body).to.equal(JSON.stringify(elem.result));
        })
      })
    })

  })

  // ===============================================
  // tried to test a post request, worked with axios
  // ===============================================
  describe('POST/ grabs text from body', () => {
    const url = urlBase + "/api/count-vowels";

    //checked for status to be 200
    it('returns status 200', () => {
      //sent { text: "auei" } through axios request
      axios.post(url, { text: "auei" })
        .then(function (response) {
          //managed to log response, it saved me :)
          //console.log(response);
          expect(response.status).to.equal(200);
        })
        .catch(function (error) {
          console.log(error);
        });
    })

    //checked for content-type to be application/json
    it('returns json data', () => {
      axios.post(url, { text: "auei" })
        .then(function (response) {
          //console.log(response);
          expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
        })
        .catch(function (error) {
          console.log(error);
        });
    })

    //checked for data to match
    it('returns number of vowels in text', () => {
      axios.post(url, { text: "auei" })
        .then(function (response) {
          //console.log(response);
          expect(response.data).to.deep.equal({
            "text": "auei",
            "vowels": 4
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    })

  })

  // ===============================================
  //post request failed trials. Could not log response with request library. Also did not understand how to send data in request body
  // ===============================================
  // describe('POST/ grabs text from body', () => {
  //   const options = {
  //     url: 'http://localhost:3000/api/count-vowels',
  //     body: { text: "auei" }
  //   };
  //   // const url = "http://localhost:3000/api/count-vowels";

  //   it('returns number of vowels in text', () => {

  //     request(options, (err, res, body) => {
  //       expect(body).to.equal(JSON.stringify({
  //         "text": "auei",
  //         "vowels": 4
  //       }));
  //     })

  //     // let res = await chai
  //     //   .request(app)
  //     //   .post('/api/count-vowels')
  //     //   .send({ text: "auei" })



  //     // expect(res.body).to.equal(JSON.stringify({ "text": "auei", "vowels": 4 }));

  //     // console.log(res);
  //   });

  // })

})

//Random number API has 2 endpoints
describe('Random number API', () => {

  describe('GET/ random number between 0 and 1023', () => {
    const path = urlBase + "/api/random";

    //checked for status to be 200
    it('returns status 200', () => {
      request(path, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
      })
    })

    //checked for content-type to be application/json
    it('returns an object', () => {
      request(path, (err, res, body) => {
        //expect(typeof JSON.parse(body)).to.equal('object');
        expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
      })
    })

    //checked for data to be a finite number above -1 and below 1023
    it('returns a number between 0 and 1023', () => {
      request(path, (err, res, body) => {
        expect(JSON.parse(body).number).to.be.finite.and.to.be.above(-1).but.to.not.be.above(1023);
      })
    })

  })

  describe('GET/ random number between 0 and max', () => {
    const path = urlBase + "/api/random/5";

    //checked for status to be 200
    it('returns status 200', () => {
      request(path, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
      })
    })

    //checked for content-type to be application/json
    it('returns an object', () => {
      request(path, (err, res, body) => {
        //expect(typeof JSON.parse(body)).to.equal('object');
        expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
      })
    })

    //checked for data to be a finite number above -1 and below 5 hence we are sending 5 as max in the url(see line 186)
    it('returns a number between 0 and max', () => {
      request(path, (err, res, body) => {
        expect(JSON.parse(body).number).to.be.finite.and.to.be.above(-1).but.to.not.be.above(5);
      })
    })

  })

})

/* api that calculates how many weeks a person has lived and how many he has got left according to average lifespan in sweden (82 years);
POST request that sends the user object in the following format:
{
id: "asvd3ed57hj",
name: "John Doe",
dob: 1989/04/13,
},
expected response:
{
id: "asvd3ed57hj",
name: "John Doe",
weeksLived: "1674",
expectedWeeksToLive: ,
} 
*/

describe('Life in weeks API', () => {

  const url = urlBase + '/lifeinweeks';
  const url2 = urlBase + '/lifespaninweeks';

  const cases = [
    {
      user: {
        id: "asvd3ed57hj",
        name: "John Doe",
        dob: "1989-04-13",
      },
      result: {
        id: "asvd3ed57hj",
        name: "John Doe",
        weeksLived: "1674.6",
        expectedWeeksLeft: "2604",
      },
      result2: {
        expectedLifespanInWeeks: "4278.6",
        //dod: "2071-04-13"
      }
    },
    {
      user: {
        id: "hsf47dciel2",
        name: "Alex Andrew",
        dob: "1975-06-30",
      },
      result: {
        id: "hsf47dciel2",
        name: "Alex Andrew",
        weeksLived: "2394",
        expectedWeeksLeft: "1884.7",
      },
      result2: {
        expectedLifespanInWeeks: "4278.7",
        //dod: "2057-06-30"
      }
    },
    {
      user: {
        id: "osw93peh20t",
        name: "Loise Salem",
        dob: "1995-11-05",
      },
      result: {
        id: "osw93peh20t",
        name: "Loise Salem",
        weeksLived: "1332.1",
        expectedWeeksLeft: "2946.6",
      },
      result2: {
        expectedLifespanInWeeks: "4278.7",
        //dod: "2077-11-05"
      }
    },
    // {
    //   data: {
    //     id: "alr375mdgv2",
    //     name: "Baltazar Themighty",
    //     dob: "1990-12-25",
    //   },
    //   result: {
    //     id: "alr375mdgv2",
    //     name: "Baltazar Themighty",
    //     weeksLived: "1674",
    //     expectedWeeksToLive: "",
    //   }
    // },
    // {
    //   data: {
    //     id: "lskd873h54e",
    //     name: "Ruby Salmon",
    //     dob: "1969-08-22",
    //   },
    //   result: {
    //     id: "lskd873h54e",
    //     name: "Ruby Salmon",
    //     weeksLived: "1674",
    //     expectedWeeksToLive: "",
    //   }
    // }
  ];

  describe('POST/ Weeks lived and weeks to live', () => {

    it('returns status 200', () => {

      cases.forEach(ofCase => {
        axios.post(url, ofCase.user)
          .then(response => {
            expect(response.status).to.equal(200);
          })
          .catch(error => {
            console.log("error occured, status:", error.response.status, " status text:", error.response.statusText);
          })
      })
    })

    it('returns json data', () => {

      cases.forEach(ofCase => {
        axios.post(url, ofCase.user)
          .then(response => {
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
          })
          .catch(error => {
            console.log("error occured, status:", error.response.status, " status text:", error.response.statusText);
          })
      })
    })

    it('returns number of weeks lived and left to live', () => {

      cases.forEach(ofCase => {
        axios.post(url, ofCase.user)
          .then(response => {
            expect(response.data).to.deep.equal(ofCase.result);
          })
          .catch(error => {
            console.log("error occured, status:", error.response.status, " status text:", error.response.statusText);
          })
      })
    })

  })

  describe('POST/ Lifespan in weeks', () => {

    it('returns status 200', () => {

      cases.forEach(ofCase => {
        axios.post(url2, ofCase.user)
          .then(response => {
            expect(response.status).to.equal(200);
          })
          .catch(error => {
            console.log("error occured, status:", error.response.status, " status text:", error.response.statusText);
          })
      })
    })

    it('returns json data', () => {

      cases.forEach(ofCase => {
        axios.post(url2, ofCase.user)
          .then(response => {
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
          })
          .catch(error => {
            console.log("error occured, status:", error.response.status, " status text:", error.response.statusText);
          })
      })
    })

    it('returns number of weeks lived and left to live', () => {

      cases.forEach(ofCase => {
        axios.post(url2, ofCase.user)
          .then(response => {
            expect(response.data).to.deep.equal(ofCase.result2);
          })
          .catch(error => {
            console.log("error occured, status:", error.response.status, " status text:", error.response.statusText);
          })
      })
    })

  })

})

/* cannot calculate exact number of weeks without creating js function first, takes too long
and it is useless to make the tests if the results will still be calculated with the help of js
seems to pass al the tests even when endpoint is not created, weird*/




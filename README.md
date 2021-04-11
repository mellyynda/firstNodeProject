"# firstNodeProject" 

"/" returns a json object with quotes and teir authors
 ex: {
    "text": "If you aren't going all the way, why go at all?",
    "author": "Joe Namath"
    },
    {
    "text": "Our greatest glory is not in never falling, but in rising every time we fall.",
    "author": "Confucius"
    },

"/api/count-vowels/:string" returns a json object containing the entered  string and the number of vocals the entered string contains
ex: {
    "text": "some string here",
    "vowels": 5
    }

"/api/random" returns a json object containing a random number between 0 and 1023
ex: {
    "number": 194
    }

"/api/random/:max" returns a json object containing a random number between 0 and the entered max
ex: {
    "number": 917330801
    }
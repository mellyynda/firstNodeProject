## firstNodeProject

> "/" returns an array of 1642 json objects with quotes and their authors  
 example: 
 ```
    {
    "text": "If you aren't going all the way, why go at all?",
    "author": "Joe Namath"
    },
    {
    "text": "Our greatest glory is not in never falling, but in rising every time we fall.",
    "author": "Confucius"
    },
  ```

> "/api/count-vowels/:string" returns a json object containing the entered string and the number of vocals the entered string contains  
example: 
```
   {
    "text": "some string here",
    "vowels": 5
    }
```

> "/api/random" returns a json object containing a random number between 0 and 1023  
example: 
```
   {
    "number": 194
    }
```

> "/api/random/:max" returns a json object containing a random number between 0 and the entered max  
example: 
```
   {
    "number": 917330801
    }
```

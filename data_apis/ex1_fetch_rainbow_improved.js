//
console.log("Hoping to fetch a rainbow.")

rainbow = "images/avatar_sm.jpg";
// steps:
// 1  -- make a request for a resource; line 15
// 2  -- .then is a method that receives the result of a promise (which is asynch) and starts handling it
//    rephrased, the .then argument is a (callback) function to look at the returned response ( 1 possible result of the fetch() )
//    line 19 returns a blob; which is another promise ...
// 3. -- response blob return is also <async> so it is "chained" with another .then to complete reading stream into a blob (line 13)
// ... you have the image. Do something with it...

// fetch() returns a promise (other videos discussing async communications)
// ... but short version; 
// ... use .then method of a promise
// ... errors can occur anywhere in this promise handling, but .catch is 1 method for them all
fetch(rainbow)
  .then(response => {
    console.log(response);
    return response.blob(); // so the 'then' is returning it; which is another promise
  })
  .then(resp_blob => {
      console.log(resp_blob);
      // this doesn't work because the DOM element doesn't understand the blob
      //document.getElementById("rainbow").src = resp_blob;
      // ... but URL. can help ...
      document.getElementById("rainbow").src = URL.createObjectURL(resp_blob);
  })
  .catch(error => {
      console.error(error);
  })
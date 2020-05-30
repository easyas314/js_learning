//
// improvements: error handling and async/await to replace .then
//
// ... further improvements: replace .then with async / await
// ... await only in the context of an async function

// btw - the keyword "function" and the arrow syntax are 2 ways to define a function


console.log("Hoping to fetch a rainbow.")

rainbow = "images/avatar_sm.jpg";

// the async function replacing the .then methods does need to be invoked  :-)
// ... and it can still use the catch() to handle errors!
// ... and/or use the .then (because the async function IS returning a promise object!)
catchRainbow()
.then(response => {
  console.log("job's done.")
})
.catch(error => {
    console.error(error);
})


// here's async () replacing the .then methods
async function catchRainbow() {
    const myResponse = await fetch(rainbow);
    const resp_blob = await myResponse.blob();
    document.getElementById("rainbow").src = URL.createObjectURL(resp_blob);
}

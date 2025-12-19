const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Promise is resolved!"); // Operation successful
  } else {
    reject("Promise is rejected!"); // Operation failed
  }
});

// Consuming the promise
myPromise
  .then((result) => console.log(result)) // Output if resolved
  .catch((error) => console.error(error)); // Output if rejected

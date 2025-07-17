function doSomeHeavyTask() {
  return new Promise((resolve) => {
    const randomDelay = Math.floor(Math.random() * 5000) + 1000; // 1000ms to 6000ms
    console.log(`Starting heavy task for ${randomDelay} ms`);
    setTimeout(() => {
      console.log("Heavy task done.");
      resolve();
    }, randomDelay);
  });
}

module.exports = { doSomeHeavyTask };

// =================================
//
// sample script
//
// ==================================

// tutorial Intro to web workers https://www.youtube.com/watch?v=2yD1gkRf4Vk
const worker = new Worker("worker.js");

document.addEventListener("DOMContentLoaded", function() {
  const sectionHeader = document.getElementById("example");

  worker.addEventListener('message', ({data}) => {
    if (data.action === 'Count3Billion') {
      console.log(`done without blocking UI thread, count: ${data.count}`);
    }
  })

  const beginning = performance.now();

  worker.postMessage({type: 'cmd', action: 'Count3Billion'});

  const timeTaken = performance.now() - beginning;
  sectionHeader.innerHTML = `<p>Hello From Script</p>`;
  console.log(`Time taken: ${timeTaken}`);
  alert(`On UI thread -- Time taken: ${timeTaken}`);
});
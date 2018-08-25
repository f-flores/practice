
addEventListener('message', ({data}) => {
  let count = 0;

  if (data.action === 'Count3Billion') {
    for (let i = 0; i < 3000000000; i++) {
      count++;
    }
  }

  postMessage({action: 'Count3Billion', status: 'done', count: 'count'});
})

function package(str) {
  console.log(`placing time ${str} into box.`);

  function address(addr) {
    console.log(`Will mail ${str} to ${addr}`);
  }

  return address;
}

let sendPkg = package('book');

console.log(sendPkg(`51 Park St, Union NJ 07083`));
const a = 'fater/mother/test.png';

console.log(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(a.split('.').at(1)));

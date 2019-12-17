console.log('This is my 1st JS')
    let str = '';
    for (let i =0; i<10; i++){
        console.log(i+1);
        str += (i+1) + ' '
    }
    console.log(str);
    document.querySelector('#output').innerHTML = str;

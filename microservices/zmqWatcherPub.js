'use strict';
const fs = require('fs');
const zmq = require('zeromq');
const filename = process.argv[2];

const publisher = zmq.socket('pub');

fs.watch(filename, ()=>{
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    },null,2));
});

publisher.bind('tcp://127.0.0.1:60400', (err)=>{
    if (err){
        throw err;
    }
    console.log('listening for zmq subs');
});
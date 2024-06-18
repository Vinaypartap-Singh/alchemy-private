#!/usr/bin/env node
var dir = require('node-dir');
const fs = require('fs');

async function run() {

    dir.readFiles(__dirname, {
        excludeDir: ['node_modules'],
        match: /.ts$/,
    }, function(err, content, filename, next) {
        if (err) throw err;
        
        const response = fetch('http://127.0.0.1:3000/api/typescript-to-javascript', {
            method: "POST",
            body: content,
        }).then((response) => {
            response.text().then((value) => {

                fs.writeFile(filename, value, err => {
                    if (err) {
                        console.error(err);
                    }
                });

            })
        })
        
        next();
    },
                  function(err, files){
                      if (err) throw err;
                      console.log('finished reading files:');
                  });


}
run();

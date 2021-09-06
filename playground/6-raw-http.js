const { rejects } = require('assert');
const http = require('http');
const { resolve } = require('path');
const url = "http://api.weatherstack.com/current?access_key=e3e54c5c72fb603638f79646631440e9&query=45,-75&units=f";

async function getData () {
    return new Promise((resolve, reject) => {

        let data = "";
        const request = http.request(url,(response)=>{
            response.on('data',(chunk) => {
                data = data + chunk.toString();
            })
            
            response.on('end', () => {
                resolve(JSON.parse(data));                
            })
        })
        
        request.on('error',(err)=>{
            reject(err)
        })
        request.end(data);
    })
}
(async () => {
    var data = await getData();
    console.log(data)
})()
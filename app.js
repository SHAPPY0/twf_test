'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true ,limit: '100mb'}));   
app.use(bodyParser.json({limit: '100mb'}));

//product stocks
const PRODUCTS = {
    "A":{
        "weight": 3,
        "center": "C1"
    },
    "B":{
        "weight": 2,
        "center": "C1"
    },
    "C":{
        "weight": 8,
        "center": "C1"
    },
    "D":{
        "weight": 12,
        "center": "C2"
    },
    "E":{
        "weight": 25,
        "center": "C2"
    },
    "F":{
        "weight": 15,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        "center": "C2"
    },
    "G":{
        "weight": 500,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        "center": "C3"
    },
    "H":{
        "weight": 1,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        "center": "C3"
    },
    "I":{
        "weight": 2,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        "center": "C3"
    }
};

//Indexings
let indexes = {"C1":0,"C2":1,"C3":2,"L1":4};

//Order destination index
let destination = indexes['L1'];

//costs from various centers
const COSTS = [
    [0,4,0,3],
    [4,0,3,2.5],
    [0,3,0,2],
    [3,2.5,2,0]
];

//Initialize product orders
let initialization = (reqData)=>{
    let c = 0;
    return new Promise((resolve, reject)=>{
        let orderedProducts = [];
        (function processOrder(){
            if(c >= reqData.length){ 
                let allCosts = calculateCost(orderedProducts);
                finalCost(allCosts.weight, (fc)=>{
                    return resolve(fc+allCosts.units);
                    
                });
                return;
            }  
            let PRODUCTS_LIST = JSON.parse(JSON.stringify(PRODUCTS));
            let product = PRODUCTS_LIST[reqData[c]['product']];
                product['weight'] = product['weight'] * parseInt(reqData[c]['quantity']);
                
            orderedProducts.push(product);
             
            c++;
            processOrder();
        })();
    });   
}
//calculation of total minimum cost
let calculateCost = (orders)=>{
    let sumCost = 0; 
    let normOrders = normalizeOrders(orders);
   for(let i = 0; i < normOrders.length; i++){
       let centers = COSTS[indexes[normOrders[i]['center']]]; 
       let minCost = 0; 
       centers.forEach((elm)=>{
            if(elm > 0) minCost = elm;
            else if(elm < minCost) minCost = elm;
       });
       sumCost = sumCost + minCost;
   }
   let allCosts = {units:sumCost,weight:0};
   normOrders.forEach((elm)=>{
        allCosts['weight'] = allCosts['weight'] + elm.weight;
   }); 
   return allCosts;
}

//if multiple products ordered from same center 
let normalizeOrders = (orders)=>{ 
    let finalOrders = orders.reduce((a,c)=>{
        let doPush = true;
        a.map((v)=>{
            if(v.center === c.center){
                v.weight = v.weight + c.weight;
                doPush = false;
            }  
        });
         if(doPush) a.push(c);
        return a; 
    },[]);
    return finalOrders;
}

//calculate final minimum cost

let finalCost = (weight, cb)=>{
 let w = 0;
 if(weight > 5){
     weight = weight-5;
     w = w+10;
     (function rec(weight, w){
        if(weight < 5) return cb(w);
        w = w+8;
        weight = weight - 8;
        rec(weight, w);
     })(weight,w);
 }
}

//Route to calculate minimum delivery cost.
app.post('/api/getcost', async (req,res,next)=>{
    let reqData = req.body;
    if(!reqData.length || !Object.keys(reqData[0]).length) 
        return res.status(400).send({'success':false,'msg':'Please provide order details'});
     
    await initialization(reqData).then((cost)=>{
        return res.send({'success':true,'minimum_cost':cost});
    }).catch((err)=>{
        return res.send({'success':false,'msg':'Some Error Occured'});
    });    
});



//Server creation
app.listen(port,()=> console.log('App is started on port: ' + port));


const express = require('express');
const axios = require("axios");
const cors = require("cors");
const { get } = require('http');

const id = "mj3N8JYvWxgPRWM4cuMQ";
const secret = "ZyH8RSY1y7";


let header = {
  "X-Naver-Client-Id": id,
  "X-Naver-Client-Secret": secret,
};

let finalData = [];
let app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.listen(1299,() =>
  console.log('1299번 포트에서 실행중')
)

const axiosInstance = axios.create({
  headers: header
});

app.get("/place", async (req,res)=>{
    // res.send(req.query.name)
    axios.all([
      axiosInstance.get(`https://openapi.naver.com/v1/search/local.json?query=${req.query.name}`),
      axiosInstance.get(`https://openapi.naver.com/v1/search/image?query=${req.query.name}&sort=sim&filter=large&display=1`)
      ]).then(
        axios.spread((res1,res2)=>{
          const placeData = res1.data;
          // console.log(placeData.items[0]);
          finalData.push(placeData.items[0])
          const thumbData = res2.data;
          // console.log(thumbData);
          finalData.push(thumbData.items[0])
          // console.log(finalData[1].link);
          res.send(finalData)
        })
      ).catch((error) => {
        console.log("Error: ", error); 
      })
    })

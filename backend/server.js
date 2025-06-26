// Import Dependencies
import express from "express"; 
import {pool} from "./config/connectToPG.js"
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import {s3Client} from "./config/connectToS3.js"
import { 
    paginateListBuckets,
    PutObjectCommand,
    GetObjectCommand 
} from "@aws-sdk/client-s3";

import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";



dotenv.config()

// Create Express App 
const app = express() 
app.use(cors())
app.use(express.json())

// Routing

// Test
app.get('/', (req,res)=>{
    res.json({hello: "world"})
})

// Signup User
app.post('/users/signup', async (req,res)=>{
    // Generate unique id for and hashed password for user
    const user_id = uuidv4()
    const hashedPassword = await bcrypt.hash(req.body.passcode, 10)

    // Grab username and Update password to hashed password
    const {user_name, passcode} = {user_name: req.body.user_name, passcode: hashedPassword}
    const newUser = await pool.query(`INSERT INTO users (user_name, passcode, user_id) VALUES($1,$2,$3)`, 
        [user_name, passcode, user_id]
    )

    // Respond With User
    res.json(newUser)
})

// Login User
app.post('/users/login', async(req,res)=> {

    // Find Matching User in DB
    const {user_name, passcode} = req.body
    let userMatch = await pool.query(`SELECT passcode FROM users WHERE user_name = $1`, 
        [user_name])

    // If Match Found -> Authenticate User and Generate Token 
    if (userMatch.length == 0) {
        res.send("No match")
    } 
    else {
        if(await bcrypt.compare(passcode, userMatch.rows[0].passcode)){
            const match = await pool.query(`SELECT user_id FROM users WHERE user_name = $1`, 
                [user_name]
            )
            const user_id = match.rows[0].user_id
            const user = {user_name, user_id, passcode}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            console.log("Match found")
            res.json({user, accessToken})
        }
        else {
            res.send("Not allowed")
            console.log("Not allowed")
        }

    }
})

// Token Authentication Middleware - call before accessing any user-specific data
function authenticateToken(req, res, next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
    console.log("token authenticated");
}

// Testing - Grab Bucket 
const grabBucket = async() => {
   
        const buckets = []
        for await (const page of paginateListBuckets({ client: s3Client }, {})) {
            buckets.push(...page.Buckets);
        }
        console.log("Buckets: ");
        //console.log(buckets.map((bucket)=>bucket.Name).join("\n"));
        console.log(buckets[0].Name)
        
} 

// Create Presigned URL - PUT request
app.get('/users/create-put-url', authenticateToken, async(req,res) => {
    const user_id = req.user.user_id
    const {image_url} = req.body
    const key = `${user_id}/photos/${image_url}`
    const command = new PutObjectCommand({Bucket: process.env.AWS_BUCKET_NAME, Key: key});
    const signedUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600})
    res.send(signedUrl)
})

// Create Presigned URL - GET request
app.get('/users/create-get-url', authenticateToken, async(req,res) => {
    const user_id = req.user.user_id
    const {image_url} = req.body
    const key = `${user_id}/photos/${image_url}`
    const command = new GetObjectCommand({Bucket: process.env.AWS_BUCKET_NAME, Key: key});
    const signedUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600})
    res.send(signedUrl)
})


// Add Image to DB
app.post('/users/add-image', authenticateToken, async (req,res) => {
   
    const user_id = req.user.user_id
    const {image_url} = req.body
    await pool.query(`INSERT INTO images (user_id, image_url) VALUES ($1, $2)`, 
        [user_id, image_url]
    )
    res.json({user_id, image_url})
    
})

// Delete Image from DB
app.delete('users/delete-image', authenticateToken, async(req,res)=>[

])

app.post('/product-info', async(req,res)=>{
    const {image_uri, product, brand} = req.body
    res.json({image_uri, product, brand})
})

// Testing connection to S3
//grabBucket()

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> 
    console.log(`Server listening on port ${PORT}`)
);


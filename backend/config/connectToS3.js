// This is used for getting user input.
import { createInterface } from "node:readline/promises";
import dotenv from "dotenv";

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  paginateListBuckets,
  S3ServiceException,
} from "@aws-sdk/client-s3";

dotenv.config() 

export const s3Client = new S3Client({
   region: process.env.AWS_REGION,
   credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   }

})


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routesAll from './routes/routes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 


const app = express();

export {app, express, bodyParser, routesAll, jwt, mongoose, bcrypt}
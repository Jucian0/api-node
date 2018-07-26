import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import jwt from 'jsonwebtoken';

const app = express();

export {app, express, bodyParser, routes, jwt}
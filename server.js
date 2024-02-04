// Prereqs
const express = require('express');
const fs = require('fs');
const path = require('path');
// Express
const app = express();
const PORT = process.env.PORT || 3000;
// DB
let dataBase = require('./db/db.json');

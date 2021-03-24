const should = require('should'),
    request = require('supertest'),
    express = require('express'),
    Member = require('../models/member.model');

let app, agent, id;


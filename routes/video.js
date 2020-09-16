'use strict'

const express = require('express');
const VideoContraller = require('../controllers/video');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/NewVideo', md_auth.ensureAuth, VideoContraller.saveVideo);
api.get('/getVideo/:id', md_auth.ensureAuth, VideoContraller.getVideo);
api.get('/getVideoPublic/:name', VideoContraller.getVideoPublic);
api.get('/getsVideo/:page?', md_auth.ensureAuth, VideoContraller.getsVideo);
api.get('/getsVideoPublic/:page?', VideoContraller.getsVideoPublic);
api.put('/updateVideo/:id', md_auth.ensureAuth, VideoContraller.updateVideo);
api.delete('/deleteVideo/:id', md_auth.ensureAuth, VideoContraller.deleteVideo);

module.exports = api;
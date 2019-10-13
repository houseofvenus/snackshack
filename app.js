// author(s):  Patrice-Morgan Ongoly
// version: 0.2.2
// last modified: Monday, July 2, 2018 12:32 EST
// description:

// required modules
var bodyParser = require('body-parser');
var express = require('express');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var WhichBrowser = require('which-browser');
// main application instance

var app = express();

// main application settings

var config = {
    PORT: process.env.PORT || 8008,
    DIRECTORY: [
        './',           /* 0 */
        './css',        /* 1 */
        './js',         /* 2 */
        './media/texture',  /* 3 */
        './media/gifs', /* 4 */
        './media/pattern', /* 5 */
        './media/img',  /* 6 */
        './media/sounds',   /* 7 */
        './media/model',    /* 8 */
        './uploads',        /* 9 */
        './drafts/docs',       /* 10 */
        './media/upload',       /* 11 */
        './media/room',         /* 12 */
        './media/img/bg',       /* 13 */
        './media/room/media/model', /* 14 */
        './board/',             /* 15 */
    ]
};

var deviceType = 'unknown';
let dir = config.DIRECTORY;

var terminalOutputViewers = [];
var terminals = [];
var objectsInSceneHandler = {
    points: [],
    adding: false,
    saveLastVertex: false,
    gestureInterval: null,
    starter: null,
    webcam: null,
    objectList: [],
    build: {
        markup: ''
    }
};

var io = require('socket.io').listen(app.listen(config.PORT, function(){
    console.log('connecting \n . \n .. \n ... \n .... \n ..... \n ------------------------------------------');
    console.log('    HOUSE OF VENUS, BENEFIT CORPORATION \n PUBLIC AUGMENTED REALITY KINECTOME Draft Serialization v 0.5.0 ');
    console.log('------------------------------------------');
    console.log(`[0] listening on port ${config.PORT}`);
    console.log('------------------------------------------');

}));

var SNACKSHACK = {
    type: 'DecentralizedImmersiveApplication',
    ATOWN: {
        ENVIRONMENT: {
            HyperRealSpace: {
                Boundary: {
                    spline: null,
                    origin: {
                        latitude: null,
                        longitude: null,
                    },
                    zips: [

                    ],
                    area: 0
                }
            },
            LedgerSpace: {
                capacity: 1024, //GB, i.e. 1 TB
                upperBound : {
                    alpha: 9, //how many full time ARias should be committed to this DIA running at maximum capacity and processing power load?
                    beta: 1024, //how much full time cARd traffic should be allotted to this DIA running at maximum capacity and processing power load (recommended 1GB per cARd for this)?
                }
            },
            Community: {
                Members: {

                },
            }
        },
        OBJECTSUBJECTS: {

        },
        SUBJECTOBJECTS: {
            Views: {

            }
        },
        SELECTORS: {

        },
        EFFECTORS: {
            GRIO: {
                type: 'GeneralResponseInputOutput',
                connect: function(){
                    console.log(' ~~~~~~~~~~~ \n GRIO Controller linked to SNACK SHACK DIA');
                },
                select: function(option){

                }
            }
        }
    },
};

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('/'));

app.get('/', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    if(result.isType('desktop')){
        console.log('This is a desktop computer.');
        deviceType = 'desktop';
    }
    else{
        console.log('This is a mobile device.');
        deviceType = 'mobile';
    }

    res.render('snackshack.html',{root: dir[0]});
});

app.get('/grio', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    if(result.isType('desktop')){
        console.log(`-------------------- GRIO -------------------- \n v. 0.1.0 \n accessed on desktop. \n setting: 1 \n author: Patrice-Morgan Ongoly `);
    }
    else{
        console.log(`-------------------- GRIO -------------------- \n v. 0.1.0 \n accessed on mobile. \n setting: 0 (default) \n author: Patrice-Morgan Ongoly `);
    }
    res.render('grio.html',{root: dir[0]});
});

/**/

app.get('/css/:stylesheet_id', function(req, res){
    let stylesheet_id = req.params.stylesheet_id;
    res.sendFile(stylesheet_id, {root: dir[1]});
});

app.get('/js/:script_id', function(req, res){
    var script_id = req.params.script_id;
    res.sendFile(script_id, {root: dir[2]});
});

app.get('/media/texture/:texture_id', function(req, res){
    var texture_id = req.params.texture_id;
    res.sendFile(texture_id, {root: dir[3]});
});

app.get('/media/gifs/:gif_id', function(req, res){
    var gif_id = req.params.gif_id;
    res.sendFile(gif_id, {root: dir[4]});
});

app.get('/media/img/:img_id', function(req, res){
    var img_id = req.params.img_id;
    res.sendFile(img_id, {root: dir[6]});
});

app.get('/media/sounds/:sound_id', function(req, res){
    var sound_id = req.params.sound_id;
    res.sendFile(sound_id, {root: dir[7]});
});

app.get('/media/model/:model_id', function(req, res){
    var model_id = req.params.model_id;
    res.sendFile(model_id, {root: dir[8]});
});

app.get('/uploads/:upload_id', function(req, res){
    var upload_id = req.params.upload_id;
    res.sendFile(upload_id, {root: dir[9]});
});

io.sockets.on('connection', function(socket){
    console.log(`client connected at ${socket.id}`);
    //var conn = socket;

    // applicationClient sockets

    socket.on('requestDIAStream', function(data){

        if(data.status){
            SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[socket.id] ={
                id: socket.id,
                type: 'ApplicationClient',
                originName: data.name,
                origin: socket,
                code: socket.id,
                Members: {

                }
            };

            console.log(` ~~~~~~~~~~ \n fx requestDIAStream \n type: appClientRequest \n applicationClient for ${socket.id} \n code ${SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[socket.id].code} \n`);

        }
    });

    // client sockets
    socket.on('checkDeviceType', function(data){
        socket.emit('loadDeviceType', {type: deviceType});
    });

    socket.on('createScene', function(data){
        var ori = data.orientation;

        socket.emit('clearInitialVideoFeed', {status: 1});

        switch(ori){
            case 0: // landmark oriented
                landmarkTrackingTest(socket);
                break;
            case 1: // face oriented
                //facialRecognitionTest(socket, 0, 100);
                facialRecognitionTest(socket, 1, 250);
                break;
            case 2: // hand oriented
                //gestureTrackingTest(socket, 0, 100);
                gestureTrackingTest(socket, 1, 250);
                //gestureTrackingTest(socket, 1, 1000);
                break;
            default:
                console.log('no associated orientation found');
                break;
        }

        socket.emit('transitionToBuildView', {buildType: ori});
    });

    socket.on("disconnectGRIO", function(data){
        console.log(` ~~~~~~~~~~ \n fx disconnectGRIO \n type: void \n manager ${socket.id} now disconnected from View ${data.code} \n`);
        console.log(SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[data.code].Members);
        delete SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[data.code].Members[socket.id];
    });

    socket.on('connectGRIO', function(data){
        if(data.status){
            SNACKSHACK.ATOWN.EFFECTORS.GRIO.connect();
            let views = Object.keys(SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views);
            let Viewers = SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views;
            let connected = false;
            let connCode = null;

            for(let i = 0; i<views.length; i++){
                let currentView = Viewers[views[i]];
                let memberCount = Object.keys(currentView.Members).length;


                if(memberCount>0){
                    continue;
                }
                else{
                    Viewers[views[i]].Members[socket.id] = {
                        id: socket.id,
                        onPage: 0,
                        code: currentView.code
                    }
                    connCode = currentView.code;
                    connected = true;
                }
            }

            if(connected){
                console.log(` ~~~~~~~~~~ \n fx connectGRIO \n type: void; initial connection \n manager ${socket.id} now connected to View ${connCode} \n`);
                socket.emit('applicationSuccessfullyConnectedToGRIO', {status: true, code: connCode});
            }
            else{
                console.log(` ~~~~~~~~~~ \n fx connectGRIO \n type: refused \n manager ${socket.id} cannot be attached as there are no available Views \n`);
                socket.emit('applicationSuccessfullyConnectedToGRIO', {status: false});
            }


        }
        else{
            if(data.statusCode!=null){

            }
        }
    });

    socket.on('handleGRIOEvent', function(data){
        if(data.status){
            if(data.eventType=="pageChange"){
                let transitionData = data.target;
                SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[transitionData.code].Members[socket.id].onPage = transitionData.page;
                 SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[transitionData.code].origin.emit('selectNewPage', {status: true, page: transitionData.page});

                console.log(` ~~~~~~~~~~ \n fx handleGRIOEvent \n type: pageChange \n manager : ${socket.id} \n View ${transitionData.code} \n now on application page ${transitionData.page} \n`);
            }
        }
    });

    socket.on("CLIENTconnectOutputViewerToTerminalSERVER", function(data){
        if(data.status){
            if(terminals.length==0){
                socket.emit("SERVERopenNewTerminalForViewerCLIENT", {status: true});
            }
            terminalOutputViewers.push({pointer: socket});
            console.log(terminalOutputViewers);
        }
    });

    socket.on("CLIENTconnectHandToDroneSERVER", function(data){
        if(data.status){
            SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV = {
                type: "EulaliesVoyager",
                connect: function(){
                    console.log('connected to eV');
                },
                move: function(direction, speed){
                    let self = this;
                    console.log(`move ${direction} at speed ${self.core.speed} units`);
                },
                core: {
                    position: [
                        0,
                        0,
                        0
                    ],
                    heading: "landed",
                    speed: 10
                }
            };

            SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.connect();

            socket.emit("SERVERhandleClientLinkRequestCLIENT", {status: true, drone:
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core});
        }
    });

    socket.on("CLIENTrequestDroneMovementSERVER", function(data){
        if(data.status){
            let direction = data.direction;
            let speed = SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.speed;
            switch(direction){
                case "takeoff":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "takeoff"){
                      console.log(`takeoff.`);
                      SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "takeoff";
                    }
                break;
                case "right":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "right"){
                      console.log(`move drone right at ${speed}`);
                      SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "right";
                    }
                break;
                case "left":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "left"){
                        console.log(`move drone left at ${speed}`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "left";
                    }
                    break;
                case "forward":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "forward"){
                        console.log(`move drone forward at ${speed}`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "forward";
                    }
                    break;
                case "back":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "back"){
                        console.log(`move drone backward at ${speed}`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "back";
                    }
                    break;
                case "up":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "up"){
                        console.log(`move drone up at ${speed}`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "up";
                    }
                    break;
                case "down":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "down"){
                        console.log(`move drone down at ${speed}`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "down";
                    }
                    break;
                case "hover":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hover"){
                        console.log(`drone stopped...\nset to hover.`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "hover";
                    }
                    break;
                case "hoverstop":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hover"){
                        console.log(`drone stopped...\nset to hover.\nlanding in...`);
                        let countValue = 5;
                        let countDownToLanding = setInterval(function(){
                            console.log(`${countValue}...`);
                            countValue--;
                            if(countValue==-1){
                                clearInterval(countDownToLanding);
                                SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "landed";
                            }
                        }, 1000);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "hover";
                    }
                    break;
                default:
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hover"){
                        console.log(`drone instructed not to move.`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "hover";
                    }
                    console.log(`remain still...\ndrone set to hover.`);
                    break;
            }
        }
    });

    socket.on("CLIENTupdateLyokoSessionSERVER", function(data){
        console.log("[function called] xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("[function  start] CLIENT -- update lyoko session --> SERVER");
        if(data.status){
            let target = data.target;
            let request = data.request;
            console.log(`[function branch] ---------------------------`);
            console.log(`[function branch] Requesting "${request}" mode for ${target}`);
            console.log(`[function branch] ---------------------------`);
            console.log(`[ function  end ] xxxxxxxxxxxxxxxxxxxxxxxxxxx`);
            if(request=="new"||request=="addphrase"){
                broadcastRequestToClients(request, socket, null, null);
            }
        }
    });

    socket.on("CLIENTupdatePhraseAndSemanticAnalysisSERVER", function(data){
        console.log("[function called] xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("[function  start] CLIENT -- update phrase and semantic analysis --> SERVER");
        if(data.status){
            let rawSemanticInput = data.semantics;
            let rawPhraseInput = data.phrase;
            let target = data.target;
            let request = data.request;

            console.log(`[function branch] ---------------------------`);
            console.log(`[function branch]        semantics`);
            console.log(`[function branch] ---------------------------`);
            console.log(rawSemanticInput);
            console.log(`[function branch] ---------------------------`);
            console.log(`[function branch]         phrases`);
            console.log(`[function branch] ---------------------------`);
            console.log(rawPhraseInput);
            console.log(`[function branch] ---------------------------`);
            console.log(`[ function  end ] xxxxxxxxxxxxxxxxxxxxxxxxxxx`);
            if(request=="new"||request=="addphrase"){
                broadcastRequestToClients(request, socket, rawSemanticInput, rawPhraseInput);
            }
        }
    });

    socket.on('disconnect', function(){
        console.log(`socket ${socket.id} disconnected.`);
    });
});

function broadcastRequestToClients(request, origin, semantics, phrase){
    if(terminalOutputViewers.length==0){
        origin.emit("SERVERdenyUnauthorizedAccessCLIENT", {status: true, code: "missing output", message: "please open a terminal output viewer first"});
    }
    else{
        for(var w=0; w<terminalOutputViewers.length; w++){
            (function(){
                terminalOutputViewers[w].pointer.emit("BROADCASTupdateLyokoSessionRESULT", {status: true, request: request, semantics: semantics, phrase: phrase, target: "default", hostID: terminalOutputViewers[w].pointer.id});
            })();
        }
    }
}

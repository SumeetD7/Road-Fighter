let b = new Bump(PIXI);
let appEnemyYellowContainer = new PIXI.Container();
//document.body.appendChild(appContainer.view);
//appContainer.renderer.backgroundColor = 0x000000

PIXI.loader//.add('bg', 'BG_tile.svg')
    //  .add('car', 'test.svg')
    //  .add('enemy', 'testEnemy.svg')
    //.add('BG_roadBoundary', 'BG_roadBoundary.svg')
     .add('enemyY', 'testEnemyY.svg')
    .load(setup);

//let inputDetectionBox;
//let initialMousePos;

//let backgroundSprite = [];
//let boundarySprite = [];
//let car;
//let enemiesr1 = [];
//let enemiesr2 = [];
//let enemiesr3 = [];
//let enemiesy1 = [];
//let mouseIsDown = false;

//let accelaration = 0;
//let oiler = 2.7182;
//let velocity = 0;
//let carHorizontalSpeed = 3;

//let canScroll = false;
//let numberOfBackgroundTilesToLoad = 5;

/*function setup() {
    /*car = new PIXI.Sprite(PIXI.loader.resources.car.texture);
    car.anchor = { x: 0.5, y: 1 };
    car.position = { x: 180, y: 600 }
    car.scale.x = 0.25;
    car.scale.y = 0.25;



    SetupBackgroundLevel();
    SetupInputDetection();

    appContainer.ticker.add(delta => GameLoop(delta));

    appContainer.stage.addChild(inputDetectionBox);

    //appContainer.stage.addChild(car);

    canScroll = true;

}

function GameLoop(delta) {
    MoveRoadVertically();
    SetupCollisionDetection();
    //SpawnEnemies();

}*/

function SetupBackgroundLevel() {
    // var request = new XMLHttpRequest();
    // request.open("GET", "BG_tile.svg");
    // request.setRequestHeader("Content-Type", "image/svg+xml");
    // request.addEventListener("load", function(event) {
    //  var response = event.target.responseText;
    //  console.log(response);
    //  var doc = new DOMParser();
    //  var xml = doc.parseFromString(response, "image/svg+xml");
    //  var rect = xml.getElementsByClassName("cls-1");
    //   rect.fill = "#000000";
    // 	console.log(response);
    //  var result = response.slice(0, response.indexOf("<svg"));
    //  result += xml.documentElement.outerHTML;
    // });
    // request.send();

    /*for (var i = 0; i < numberOfBackgroundTilesToLoad; i++) {
        let tempBackgroundSprite = new PIXI.Sprite(PIXI.loader.resources.bg.texture);
        tempBackgroundSprite.anchor = { x: 0.5, y: 1 };
        let yPos = 640 - (i * 1920);
        tempBackgroundSprite.position = { x: 180, y: yPos }
        appContainer.stage.addChild(tempBackgroundSprite);
        backgroundSprite.push(tempBackgroundSprite);


        //rendering boundary sprite with the same transform values
        let tempBoundarySprite = new PIXI.Sprite(PIXI.loader.resources.BG_roadBoundary.texture);
        tempBoundarySprite.anchor = { x: 0.5, y: 1 };
        tempBoundarySprite.position = { x: 180, y: yPos }
        appContainer.stage.addChild(tempBoundarySprite);
        boundarySprite.push(tempBoundarySprite);

        //rendering Red_enemies1
        let tempEnemies11 = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);
        tempEnemies11.anchor = { x: 0.5, y: 1 };
        tempEnemies11.position = { x: Math.random() * 180 + 90, y: yPos + 200 }
        tempEnemies11.scale = { x: 0.25, y: 0.25 };
        appContainer.stage.addChild(tempEnemies11);
        enemiesr1.push(tempEnemies11);

        //rendering Red_enemies2
        let tempEnemies12 = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);
        tempEnemies12.anchor = { x: 0.5, y: 1 };
        tempEnemies12.position = { x: Math.random() * 180 + 90, y: yPos + 420 }
        tempEnemies12.scale = { x: 0.25, y: 0.25 };
        appContainer.stage.addChild(tempEnemies12);
        enemiesr2.push(tempEnemies12);

        //rendering Red_enemies3
        let tempEnemies13 = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);
        tempEnemies13.anchor = {x:0.5, y:1};
          tempEnemies13.position = {x:Math.random()*180+90, y:yPos+600}
          tempEnemies13.scale = {x:0.25,y:0.25};
        appContainer.stage.addChild(tempEnemies13);
        enemiesr3.push(tempEnemies13);*/

        //rendering Yellow_enemies1
        let tempEnemies21 = new PIXI.Sprite(PIXI.loader.resources.enemyY.texture);
        //tempEnemies21.anchor = { x: 0.5, y: 1 };
        //tempEnemies21.position = { x: Math.random() * 180 + 90, y: yPos + 300 }
        //tempEnemies21.scale = { x: 0.25, y: 0.25 };
       appEnemyYellowContainer.stage.addChild(tempEnemies21);
        //enemiesy1.push(tempEnemies21);


    //}
}

/*function SetupInputDetection() {
    inputDetectionBox = new PIXI.Graphics();
    inputDetectionBox.hitArea = new PIXI.Rectangle(0, 0, 360, 640);
    inputDetectionBox.interactive = true;
    inputDetectionBox
        .on('pointerdown', onDragStart)
        .on('pointermove', onDrag)
        .on('pointerup', onDragEnd);
}

function SetupCollisionDetection() {

    if (!b.hit(car, boundarySprite[0]))
        console.log("hit");

}

function SpawnEnemies()
{
	let tempEnemies = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);
	tempEnemies.anchor = {x:0.5, y:1};
 	tempEnemies.position = {x:Math.random()*180+90, y:Math.random()*160+200}
 	tempEnemies.scale = {x:0.25,y:0.25};
	appContainer.stage.addChild(tempEnemies);
	enemies.push(tempEnemies);
}

function onDragStart(event) {
    mouseIsDown = true;
    accelaration = accelaration * Math.pow(oiler, (-(accelaration + 10)));
    velocity += 10;
    initialMousePos = event.data.originalEvent.pageX;
}

function onDragEnd() {
    mouseIsDown = false;
    velocity = 0;
    initialMousePos = 0;
}

function onDrag(dragData) {
    MoveCarHorizontally(dragData);
}

function MoveCarHorizontally(dragData) {
    if (!mouseIsDown) {
        return;
    }

    let mousePos = dragData.data.originalEvent.pageX;
    if (Math.abs(mousePos - initialMousePos) < 0.5) {
        return;
    }

    //Left
    if (mousePos > initialMousePos) {
        car.x += carHorizontalSpeed;
    }
    else {
        car.x -= carHorizontalSpeed;
    }


    initialMousePos = mousePos;
}

function MoveRoadVertically() {
    if (canScroll) {
        for (var i = 0; i < numberOfBackgroundTilesToLoad; i++) {
            backgroundSprite[i].y += velocity;
            boundarySprite[i].y += velocity;
            //enemiesr1[i].y += velocity - 2;
            //enemiesr2[i].y += velocity - 2.2;
            //enemiesr3[i].y += velocity-2.4;
            //enemiesy1[i].y += velocity - 2;
            //enemiesy1[i].x = 180 + Math.sin(enemiesy1[i].y * 0.01) * 30;

        }
    }
}*/


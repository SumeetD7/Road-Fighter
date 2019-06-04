let b= new Bump(PIXI);
let appContainer = new PIXI.Application({width: 360, height: 640});
document.body.appendChild(appContainer.view);
appContainer.renderer.backgroundColor = 0x000000
PIXI.loader.add('bg', 'BG_tile.svg')
		.add('car', 'test.svg')
		.add('enemy', 'testEnemy.svg')
		.add('BG_roadBoundary','BG_roadBoundary.svg')
		.add('enemyY','testEnemyY.svg')
		.add('enemyB','testEnemyB.svg')
	  .load(setup);

let inputDetectionBox;
let initialMousePos;

let backgroundSprite = [];
let boundarySprite = [];
let car;
let enemiesr1 = [];
//let enemiesr2 = [];
let enemiesb = [];
let enemiesy1 = [];
let mouseIsDown = false;

let accelaration = 0;
let oiler = 2.7182;
let velocity = 0;
let enemyVelocity = 0;
let enemyLagCorrectionAcc = false;
let enemyLagCorrectionDec = false;

let lastVelocity = 0;
let lastEnemyVelocity = 0;
let carHorizontalSpeed = 3;

let canScroll = false;
let numberOfBackgroundTilesToLoad = 20;
let numberOfEnemyBatchesToLoad = 14;
let endBoundaryNumber = 8;

let backgroundContainer;
let backgroundColliderContainer;
let playerContainer;
let enemy1Container;
let enemy2Container;
let enemy3Container;
let textContainer;
let gameLoopTimer;
let textSeconds;
let textMilliseconds;
let timeSecond;
let stopText;
let resetTimer = 0;
let totalTimer = 0;
let maxResetTime = 120;
let maxBlinkTime = 240;
let redDestroyTime = 0;
let yellowDestroyTime = 0;
let blueDestroyTime = 0;
let myTicker = PIXI.ticker.shared;
let gameStartCondition = false;
let mouseOutOfGame = false;
let endBoundary = false;
let boundaryLimit = 670;
let hitType1 = false;
let hitType11 = false;
let hitType2 = false;
//let hitEnemy = false;
let accelarationTime = 0;
let decelarationTime = 0;
let accelarationTimeEnemy =0;
let decelarationTimeEnemy =0;
//let count = 0;



function setup()
{
	
	CarSetup();
	TextSetup();
    gameLoopTimer = 0;
    timeSecond = 0;

	
	backgroundContainer = new PIXI.Container();
	backgroundColliderContainer = new PIXI.Container();
	playerContainer = new PIXI.Container();
	enemy1Container = new PIXI.Container();
	enemy2Container = new PIXI.Container();
	enemy3Container = new PIXI.Container();
	textContainer = new PIXI.Container();

	SetupBackgroundLevel();
	SetupInputDetection();
	
	appContainer.ticker.add(delta => GameLoop(delta));

	appContainer.stage.addChild(backgroundContainer);
	appContainer.stage.addChild(backgroundColliderContainer);
    appContainer.stage.addChild(enemy1Container);
	appContainer.stage.addChild(enemy2Container);
	appContainer.stage.addChild(enemy3Container);
    appContainer.stage.addChild(inputDetectionBox);
    playerContainer.addChild(car);
	appContainer.stage.addChild(playerContainer);
	textContainer.addChild(textSeconds);
	textContainer.addChild(textMilliseconds);
	textContainer.addChild(stopText);
	appContainer.stage.addChild(textContainer);

	canScroll = true;

}

function GameLoop(delta)
{
	if(mouseOutOfGame)
	{
		onDragEnd();
		canScroll = false;
		return;
	}
	endBoundary = b.hit(car,boundarySprite[endBoundaryNumber]);
	

	MoveRed1EnemyCars();
	//MoveRed2EnemyCars();
	MoveYellowEnemyCars();
	MoveBlueEnemyCars();

	
	if(!endBoundary && gameStartCondition)
	{
		 gameLoopTimer++;

		 SetupTimer();
		
	  	 MoveRoadVertically();
		 SetupCollisionDetection();
		 SetupBlinkTime();
		 SetupAcceleration();
		 SetupDecceleration();
		 SetupEnemyAcceleration();
		 SetupEnemyDeceleartion();
		 CheckBoundaryCollision();
		 CheckEndLine();
	}
}

function CarSetup()
{
	car = new PIXI.Sprite(PIXI.loader.resources.car.texture);
	car.anchor = {x:0.5, y:1};
	car.position = {x:180, y:600}
	car.scale.x = 0.25;
	car.scale.y = 0.25;
}

function TextSetup()
{
	textSeconds = new PIXI.Text('                Click to start!                  ',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'Left'});
	textMilliseconds = new PIXI.Text('                Click to start!                  ',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
	stopText = new PIXI.Text('                                 ',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'Left'});
}

function SetupBackgroundLevel()

{
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


for(var j=0;j<numberOfEnemyBatchesToLoad;j++)
{
	let tempEnemies11 = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);

	tempEnemies11.anchor = {x:0.5, y:1};
 	tempEnemies11.position = {x:Math.random()*180+90, y:Math.random()*200 - 660*j}
 	tempEnemies11.scale = {x:0.25,y:0.25};
	enemy1Container.addChild(tempEnemies11);
	enemiesr1.push(tempEnemies11);
}

for(var l=0;l<numberOfEnemyBatchesToLoad;l++)
{
	let tempEnemies21 = new PIXI.Sprite(PIXI.loader.resources.enemyY.texture);
	tempEnemies21.anchor = {x:0.5, y:1};
 	tempEnemies21.position = {x:Math.random()*180+90, y:Math.random()*300 - 560*l}
 	tempEnemies21.scale = {x:0.25,y:0.25};
	enemy2Container.addChild(tempEnemies21);
	enemiesy1.push(tempEnemies21);
}

for(var m=0; m<numberOfEnemyBatchesToLoad; m++)
{
	let tempEnemies31 = new PIXI.Sprite(PIXI.loader.resources.enemyB.texture);
	tempEnemies31.anchor = {x:0.5, y:1};
 	tempEnemies31.position = {x:Math.random()*180+90, y:Math.random()*300 - 720*m}
 	tempEnemies31.scale = {x:0.25,y:0.25};
	enemy3Container.addChild(tempEnemies31);
	enemiesb.push(tempEnemies31);
}

for(var i=0;i<numberOfBackgroundTilesToLoad;i++)
{
 	let tempBackgroundSprite = new PIXI.Sprite(PIXI.loader.resources.bg.texture);

 	tempBackgroundSprite.anchor = {x:0.5, y:1};
	let yPos = 640 - (i*1920);
 	tempBackgroundSprite.position = {x:180, y:yPos}
	backgroundContainer.addChild(tempBackgroundSprite);
	backgroundSprite.push(tempBackgroundSprite);
	

	//rendering boundary sprite with the same transform values
	let tempBoundarySprite = new PIXI.Sprite(PIXI.loader.resources.BG_roadBoundary.texture);
	tempBoundarySprite.anchor = {x:0.5, y:1};
 	tempBoundarySprite.position = {x:180, y:yPos}
	backgroundColliderContainer.addChild(tempBoundarySprite);
	boundarySprite.push(tempBoundarySprite);
}
}

function SetupInputDetection()
{
	inputDetectionBox = new PIXI.Graphics();
	inputDetectionBox.hitArea = new PIXI.Rectangle(0, 0, 360, 640);
	inputDetectionBox.interactive = true;
	inputDetectionBox
        .on('pointerdown', onDragStart)
		.on('pointermove', onDrag)
		.on('pointerout', onPointerOutOfFocus)
		.on('pointerover', onPointerInFocus)		
        .on('pointerup', onDragEnd);

}
function SetupTimer()
{
	 var time_millisecond = gameLoopTimer % 60;
		 if(time_millisecond==0)
		 	{
		 		timeSecond++;
	         	textSeconds.text = timeSecond;
	 		}
	     textMilliseconds.text ='\n'+ time_millisecond;
}
function CheckBoundaryCollision()
{
	if(car.position.x>270 )
		 {
		 	hitType1 = true;
		 	hitType11 = true;
		 }
		 if(car.position.x<90 )
		 {
		 	hitType2 = true;
		 	hitType11 = true;
		 }
}
function CheckEndLine()
{
	if(Math.abs(boundarySprite[endBoundaryNumber].position.y- car.position.y)<50)
        {
        	stopText.text = "                      Stop                ";

        }
}
function SetupBlinkTime()
{
	if(hitType11)
		{
			totalTimer += myTicker.deltaTime;
			if(totalTimer >= 0 && totalTimer < maxBlinkTime )
            	{

            	if((Math.floor(totalTimer/10))%2 == 0)
            		car.alpha = 1;
            	else
            		car.alpha = 0;
            	}          		           	
            	if (totalTimer >= maxBlinkTime)
            	{
	            	totalTimer = 0;
	            	
            		inputDetectionBox.interactive = true;
            		canScroll = true;
            		car.alpha = 1;
            		hitType11 = false;
            		car.isSprite = true;
	            }
	            

        	}

}
function SetupCollisionDetection()
{
		if( hitType1)
			{
				
            	resetTimer += myTicker.deltaTime;
            	if(resetTimer >= 0 && resetTimer < maxResetTime)
            	{
            	//car.position.x -= 10;
            	car.rotation = -0.5;
            	onDragEnd();
            	}
            	if (resetTimer >= maxResetTime)
            	{
	            	resetTimer = 0;
	            	
            		inputDetectionBox.interactive = true;
            		canScroll = true;
            		car.rotation = 0;
            		car.setTransform(car.position.x - 10 ,car.position.y,0.25,0.25,0,0,0,0,0);
            		hitType1 = false;
            	
	            }
	            

        	}
        else if(hitType2 )
        	{
				
            	resetTimer += myTicker.deltaTime;
            	if(resetTimer >= 0 && resetTimer < maxResetTime)
            	{
            	//car.position.x -= 10;
            	car.rotation = 0.5;
            	onDragEnd();
            	if((Math.floor(resetTimer/10))%2 == 0)
            		car.alpha = 1;
            	else
            		car.alpha = 0;

            	}
            	if (resetTimer >= maxResetTime)
            	{
	            	resetTimer = 0;
	            	car.rotation = 0;
	            	car.setTransform(car.position.x + 10,car.position.y,0.25,0.25,0,0,0,0,0);
            		inputDetectionBox.interactive = true;
            		canScroll = true;
            		hitType2 = false;
	            }
	        }
		   
	    
}
function SetupEnemyAcceleration()
{
	if(enemyLagCorrectionAcc)
	{
		
		accelarationTimeEnemy += myTicker.deltaTime;
		if(accelarationTimeEnemy < 100 )
		
		{	
			enemyVelocity = 0.06*accelarationTimeEnemy;
			lastEnemyVelocity = enemyVelocity;
		}
		else
		{
			enemyVelocity = 6;
			lastEnemyVelocity = 6;
			//enemyLagCorrectionAcc = false;
			//accelarationTimeEnemy = 0;

		}
		
	}
}
function SetupEnemyDeceleartion()
{
	if(!enemyLagCorrectionAcc)
	{
		
		decelarationTimeEnemy += myTicker.deltaTime;
		if(decelarationTimeEnemy < 30 )
		
		{	
			enemyVelocity = lastEnemyVelocity-0.2*decelarationTimeEnemy;
			//lastVelocity = velocity;
		}
		else
		{
			enemyVelocity = 0;
			//enemyLagCorrectionDec = false;
			//decelarationTimeEnemy = 0;
		}
		
	}
}
function SetupAcceleration()
{
	if(mouseIsDown)
	{
		
		accelarationTime += myTicker.deltaTime;
		if(accelarationTime < 100 )
		
		{	
			velocity = 4.5 + 0.085*accelarationTime;
			//velocity = 8.5 + 0.045*accelarationTime;

			//enemyVelocity = 4.5 + 0.085*accelarationTime;
			lastVelocity = velocity;

			
		}
		else
		{
			velocity = 13;
			lastVelocity = 13;
			//enemyVelocity =6;
		}
	}
}
function SetupDecceleration()
{
	if(!mouseIsDown)	
	{
		decelarationTime += myTicker.deltaTime;
		if(decelarationTime < 30 )
		
		{   
			if(velocity >= 0.25)
			velocity = lastVelocity - 0.28*decelarationTime;
		}
		else
		{   
			velocity = 0;
		}	
	}
}/*
function SetupEnemyAcceleration()
{
	if(mouseIsDown)
	{
		
		if(enemyVelocity < 6)
		
		{	
			enemyVelocity += 0.2 * myTicker.deltaTime;
			
		}
		else
		{
			enemyVelocity = 6;
			

		}
		
	}
}
function SetupEnemyDeceleartion()
{
	if(!mouseIsDown)
	{
		
		
		if(enemyVelocity > 0 )
		
		{	
		
			enemyVelocity -= 0.4 * myTicker.deltaTime;
		
			//lastVelocity = velocity;
		}
		else
		{
			enemyVelocity = 0;
			//enemyLagCorrectionDec = false;
			//decelarationTimeEnemy = 0;
		}
		
	}
}
function SetupAcceleration()
{
	if(mouseIsDown)
	{
		if(velocity < 13 )
		{	
			velocity += 0.2 * myTicker.deltaTime;
		}
		else
		{
			velocity = 13;
		}
	}
}
function SetupDecceleration()
{
	if(!mouseIsDown)	
	{
		if(velocity > 0 )
		{   
			velocity -= 0.4*myTicker.deltaTime;
		}
		else
		{   
			velocity = 0;
		}	
	}
}*/

function onPointerOutOfFocus(event)
{
	mouseOutOfGame = true;
}
function onPointerInFocus(event)
{
	mouseOutOfGame = false;
}

function onDragStart(event)
{
 
  	gameStartCondition = true;
  	canScroll = true;
  	mouseIsDown = true;
	//accelaration = accelaration * Math.pow(oiler, (-(accelaration+10)));
	
	accelarationTime = 0;
	enemyVelocity = 6;
	enemyLagCorrectionAcc = true;
	//enemyLagCorrectionDec = false;
	initialMousePos = event.data.originalEvent.pageX;
	decelarationTime = 0;
	//count++;
}

function onDragEnd()
{

	mouseIsDown = false;
	//enemyVelocity = 0;
	enemyLagCorrectionAcc = false;
	
	//enemyLagCorrectionDec = true;
	initialMousePos = 0;

}

function onDrag(dragData)
{
	MoveCarHorizontally(dragData);
}

function MoveCarHorizontally(dragData)
{
	if(!mouseIsDown)
	{
		return;
	}

	let mousePos = dragData.data.originalEvent.pageX;
	if(Math.abs(mousePos - initialMousePos) < 0.5)
	{
		return;
	}

	//Left
	if(mousePos > initialMousePos)
	{
		car.x += carHorizontalSpeed;
	}
	else
	{
		car.x -= carHorizontalSpeed;
	}
	

	initialMousePos = mousePos;
}

function MoveRoadVertically()
{
	if(canScroll)
	{   

		for(var i=0;i<numberOfBackgroundTilesToLoad;i++)
		{
			backgroundSprite[i].y += velocity;
			boundarySprite[i].y += velocity;
		}
	}
}

function MoveRed1EnemyCars()
{
		
		for(var j=0;j<enemiesr1.length;j++)
		{	
			if(!endBoundary )
			{//console.log(enemiesr1[0].position.y);
				if(enemiesr1[j].position.y < boundaryLimit)
				{
				enemiesr1[j].y += enemyVelocity-2;
				
				if(b.hit(car,enemiesr1[j]))
					{onDragEnd(); 
					hitType1 = true;
				    hitType11 = true;}
                }
                else
                {
                	enemiesr1[j].y = 8000;
                }
            }
            else

          	{
            	enemiesr1[j].y -= 2;
            	if(enemiesr1[j].position.y < -100)
            	{
            	enemiesr1[j].y = 8000;
            	redDestroyTime = myTicker.deltaTime;
            	if(redDestroyTime >= 60)
            	{
            		enemiesr1.length = 0;
            	}	
            	}
            	
            } 
        }          
}
function MoveYellowEnemyCars()
{
		for(var j=0;j<enemiesy1.length;j++)
		{
			if(!endBoundary)
			{
				if(enemiesy1[j].position.y < boundaryLimit)
            	{
            	enemiesy1[j].y += enemyVelocity-2;
            	//enemiesy1[j].x = 180+Math.sin(enemiesy1[j].y*0.005)*45;
            	//if(enemiesy1[j].y >= 198)
            	
            	//let tempX = car.position.x ;
            	//let s1 = 0;
            	//let s2 = 0;
            	if(enemiesy1[j].x < car.position.x)
            	{
            		if(enemiesy1[j].y >= 150 && enemiesy1[j].y <350)
		            	{

		            		enemiesy1[j].x +=1;
		            		
		            	} 
		        }
		        if(enemiesy1[j].x > car.position.x)
		        {
		        	if(enemiesy1[j].y >= 150 && enemiesy1[j].y <350)
		            	{

		            		enemiesy1[j].x -=1;
		            		
		            	}
		        }
            	if(b.hit(car,enemiesy1[j]))
            		{onDragEnd();
            		hitType1 = true;
            		hitType11 = true;}
					
            	}
           	    
            	else
            	{
            	 	enemiesy1[j].y = 8000;
            	}
            }
            else
            {
            	enemiesy1[j].y -= 2;
            	//enemiesy1[j].x = 180+Math.sin(enemiesy1[j].y*0.005)*45;
            	if(enemiesy1[j].position.y < -100)
            	{
            	enemiesy1[j].y = 8000;
            	//console.log(enemiesy1[j].y);
            	yellowDestroyTime = myTicker.deltaTime;
            	if(yellowDestroyTime >= 60)
            	{
            		enemiesy1.length = 0;
            	}
            	}
            
            } 
        }          
}
function MoveBlueEnemyCars()
{
		for(var j=0;j<enemiesb.length;j++)
		{
			if(!endBoundary)
			{
				if(enemiesb[j].position.y < boundaryLimit)
            	{
            	enemiesb[j].y += enemyVelocity-2;
            	if(enemiesb[j].y >= 200)
            	{
            		if(enemiesb[j].x >= car.position.x && enemiesb[j].x <= 270)
            		{
            			enemiesb[j].x += 1; 
            		}
            		else if(enemiesb[j].x <= car.position.x && enemiesb[j].x >= 90)
            		{
            			enemiesb[j].x -= 1; 
            		}
            		else if(enemiesb[j].x < 90)
            		{
            			enemiesb[j].x = 90;
            		}
            		else if(enemiesb[j].x > 270)
            		{
            			enemiesb[j].x = 270;
            		}
            	}
            	if(b.hit(car,enemiesb[j]))
            		{onDragEnd();
            		hitType1 = true;
            		hitType11 = true;}
					
            	}
            	else
            	{
            	 	enemiesb[j].y = 8000;
            	}
            }
            else
            {
            	enemiesb[j].y -= 2;
            	//enemiesb[j].x = 180+Math.sin(enemiesr3[j].y*0.005)*45;
            	if(enemiesb[j].position.y < -100)
            	{
            	enemiesb[j].y = 8000;
            	//console.log(enemiesy1[j].y);
            	blueDestroyTime = myTicker.deltaTime;
            	if(blueDestroyTime >= 60)
            	{
            		enemiesb.length = 0;
            	}
            	}
            
            } 
        }          
}
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj, timeStore;



//create feed and lastFed variable here





function preload()
{
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() 
{
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  eat = createButton("Feed the Dog");
  eat.position(700,95);
  eat.mousePressed(feedDog);

}

function draw() 
{
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

   //write code to display text lastFed time here

  textSize(30);
    if(hour>=12){
        text("last feed : "+ lastFed%12 + " PM", 100,200);
       }else if(hour==0){
        text("last feed : 12 AM",100,200);
       }else if(hour<12){
        text("last feed : "+ lastFed%12 + " AM", 100,200);
       }
 
  drawSprites();
}

//function to read food Stock
function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog()
{
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
  
  

  //write code here to update food stock and last fed time


async function lastTime()
{
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datatime;
  var hour = datetime.slice(11, 13);

  database.ref('/').update({
    FeedTime: hour
  })

  
}

function trp()
{
  console.log("hello")
}
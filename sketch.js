var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed, fedTime;
var fed;



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

  fed = createButton("Feed the Dog");
  fed.position(700,95);
  fed.mousePressed(feedDog);

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

  fill("white");
  textSize(30);
    if(lastFed>=12){
        text("last feed : "+ lastFed%12 + " PM", 100,200);
       }else if(lastFed==0){
        text("last feed : 12 AM",100,200);
       }else{
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

  var food_stock = foodObj.getFoodStock()
  
  if(food_stock <= 0){
    foodObj.updateFoodStock(food_stock*0);
  }else{
    foodObj.updateFoodStock(food_stock-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
  
  

  //write code here to update food stock and last fed time





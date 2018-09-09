var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  // Your password
  password: "Summer18",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to Bamazon");
  console.log("________________________________________________________")
  prompt();
})

function prompt() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name + " || Price: " + res[i].price);
    }
    questions();
  }
  )
  connection.end();
  
}
function questions(){
  inquirer.prompt([
  {
      type: "input",
      name: "action",
      message: "What product are you interested in buying?",
      
  }]).then(function(quantity){
    var userInput = quantity.action

    inquirer.prompt([
      {
          type: "input",
          name: "quantity",
          message: "How many would you like?",
          
      }
    ]).then(function(database){
      var database = database.quantity;
      var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Summer18",
        database: "bamazon"
      });

      connection.connect(function (err) {
        if (err) throw err;
        checkQuantity();
      
    })
    function checkQuantity(){
        var query = 'SELECT * FROM products WHERE product_name=';
        connection.query(query + connection.escape(userInput), function (err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
          // console.log("Product: " + res[i].product_name + "|| Quantity:" + res[i].stock_quantity + " || Price: " + res[i].price);
          if(database > res[i].stock_quantity){
            console.log("We dont have enough in stock!!!");
            console.log("we only have "+ res[i].stock_quantity);
          } else {
            
            console.log("Your total cost is: $" + res[i].price * database);
            }}
    connection.end();
          })}})})}
    
    
  






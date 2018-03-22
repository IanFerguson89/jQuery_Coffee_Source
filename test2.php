<?php
$host = "213.171.200.94";
$user = "ertioertio";
$password = "Yankee890";
$dbname = "coffeedb";


 $db = mysqli_connect($host, $user, $password, $dbname)
 or die('Error connecting to MySQL server.');
 
 
  //fetch all table rows from mysql db
    $sql = "SELECT * FROM shopdetails";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //creates an array which will hold the information on all the coffee shops
    $coffeeArray = array();

	//Adds every row of the database table to the emparray that was created
    while($row =mysqli_fetch_assoc($result))
    {
        $coffeeArray[] = $row;
    }
	
	//echoes
	echo json_encode($coffeeArray);

    //close the db connection, always good practice to do this
    mysqli_close($db);
?>
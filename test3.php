<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "coffeedb";


 $db = mysqli_connect($host, $user, $password, $dbname)
 or die('Error connecting to MySQL server.');
 
 
  //fetch all table rows from mysql db
    $sql = "
SELECT shoprss.shopID, shopdetails.shopName, shoprss.newsPiece, shoprss.newsDate
FROM shoprss
INNER JOIN shopdetails ON shoprss.shopID = shopdetails.shopID
ORDER BY shoprss.newsDate DESC";
    $result = mysqli_query($db, $sql) or die("Error in Selecting " . mysqli_error($db));

    //creates an array which will hold the information on all the coffee shops
    $rssArray = array();

	//Adds every row of the database table to the emparray that was created
    while($row =mysqli_fetch_assoc($result))
    {
        $rssArray[] = $row;
    }
	
	//echoes
	echo json_encode($rssArray);

    //close the db connection, always good practice to do this
    mysqli_close($db);
?>
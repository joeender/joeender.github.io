<?php
	$mysql_host = "localhost";
	$mysql_database = "joeender_booking";
	$mysql_user = "joeender_admin";
	$mysql_password = "orwell1984";
	// Create connection
	$con = mysqli_connect($mysql_host,$mysql_user, $mysql_password,$mysql_database);

	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	//$bookingstable = "CREATE TABLE BOOKINGS(BookingId INT, EmailAddress CHAR(30), NumofPeople INT, Month INT, DAY INT, Year INT)";

	// Enter an entry.

	$email = mysqli_real_escape_string($con,$_POST["email"]);
	$numOfPeople = $_POST["numOfPeople"];
	$month = $_POST["month"];
	$day = $_POST["day"];
	$year = $_POST["year"];
	
	$entry = "INSERT INTO BOOKINGS (EmailAddress, NumofPeople, Month, DAY, Year) VALUES ('$email', '$numOfPeople', '$month', '$day', '$year')";
		
	if (!mysqli_query($con, $entry))
	{
		die('Error: ' . mysqli_error($con));
	}
	echo "1 record added";
	
?>

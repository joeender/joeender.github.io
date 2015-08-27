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
	
	// Create Forms Table
	$bookingstable = "CREATE TABLE BOOKINGS(EmailAddress CHAR(30), NumofPeople INT, Month INT, DAY INT, Year INT)";
	
	// Execute
	
	if (mysqli_query($con,$bookingstable))
	{
		echo "Bookings Table Created.";
	}
	else
	{
		echo "Error creating table: ".mysqli_error($con);
	}
	
	$alter = "ALTER TABLE BOOKINGS ADD BookingId INT FIRST";
	mysqli_query($con, $alter);
?>

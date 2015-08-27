<?php
	$mysql_host = "localhost";
	$mysql_database = "joeender_booking";
	$mysql_user = "joeender_admin";
	$mysql_password = "orwell1984";
	// Create connection
	$con = mysqli_connect($mysql_host,$mysql_user, $mysql_password,$mysql_database);

	// Check connection
	if (mysqli_connect_errno()) 
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	//$bookingstable = "CREATE TABLE BOOKINGS(BookingId INT, EmailAddress CHAR(30), NumofPeople INT, Month INT, DAY INT, Year INT)";
	
	$query = "SELECT * FROM BOOKINGS";
	$result = mysqli_query($con, $query);
	echo "<table border='1'>
		<tr>
		<th>Email</th>
		<th>People</th>
		</tr>";

		while($row = mysqli_fetch_array($result)) 
		{
			echo "<tr>";
			echo "<td>" . $row['EmailAddress'] . "</td>";
			echo "<td>" . $row['NumofPeople'] . "</td>";
			echo "</tr>";
		}

	echo "</table>";

?>

<?php
                $con=mysqli_connect('mysql15.000webhost.com', 'a7109459_usr', 'abc123','a7109459_db');
                // Check connection
                if (mysqli_connect_errno())
                {
                    echo "Failed to connect to MySQL: ";
                }
            $show_date = $_GET[month];
            $show_date = "2013-" . $show_date . "-%"
            
            $result = mysqli_query($con,"SELECT * FROM jobs LIKE date='$show_date' ORDER BY id DESC");
            $i=1;
            while($row = mysqli_fetch_array($result)) {
               echo "<tr><td>" . $i++ . "</td>";
                echo "<td>" . $row['company'] . "</td>";
                echo "<td>" . $row['designation'] . "</td>";
                 echo "<td>" . $row['openings'] . "</td>";
                  echo "<td>" . $row['degree'] . "</td>";
                   echo "<td>" . $row['criteria'] . "</td>";
                    echo "<td>" . $row['location'] . "</td>";
                     echo "<td><a href='" . $row['link'] . "'>" . $row['website'] . "</a></td>";
                echo "</tr>";
            }
            
            mysqli_close($con);
 ?>
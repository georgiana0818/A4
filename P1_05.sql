
/*
Question 5)Find the names of all the subscribers
who subscribe to at least three services.
*/



select name from subscribers, (select line, count(*) AS numOfSubscribe
from service_subscribers group by line HAVING count(*) >= 3) where portid = line;


/*
Test Output

name
---------------
Michael Jordan
Joe Carter
Homer Simpson
Vince Carter
Chris Pronger
Frank Thomas
Steve Sampras
Matt Stajan

*/

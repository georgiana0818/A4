
/*
Question 6)Produce a table that lists the most popular service (or services).
That is, give the name of the service that has the most subscribers.
*/

.width 30

select MAX(service) AS mostPopularService from (select service
from services,(select service AS svc, count(*) AS numOfSubscribe
from service_subscribers group by service) where scode = svc);



/*
Test Output

mostPopularService
------------------------------
Message Answer

*/

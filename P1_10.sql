/*
Question 10)Produce a table that lists the name of
all the service-subscribers that subscribe to at least
all the same services as Jason Allison subscribes to
but possibly others as well. Jason Allison rents the line with portID=2.
*/

select name from subscribers, (select  count(*) as numSubscribe from service_subscribers where line = 2), 
(select line, count(*) AS sevNum from service_subscribers
where service in (select service from service_subscribers where line = 2) group by line)
where numSubscribe = sevNum AND line = portid;


/*
Test Output








*/

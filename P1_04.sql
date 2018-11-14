
/*
Question 4)Find the names and address of all subscribers
who subscribe to all of the available services.
(Note the result for the current data might be empty
but your query should work if the TA's add more data to the databse.)
*/

insert into service_subscribers values (1, 'CWT');
insert into service_subscribers values (1, 'DSP');
insert into service_subscribers values (1, '3WC');

select name, address from subscribers,
(select line, count(*) AS numOfSubscribe, numOfService from service_subscribers
join (select count(*) AS numOfService from services group by scode)
group by line HAVING numOfSubscribe = numOfService) where portid = line;


/*
Test Output

name             address
---------------  ---------------
Mats Sundin      45 Elgin St.

*/

delete from service_subscribers where line = 1 AND service = 'CWT';
delete from service_subscribers where line = 1 AND service = 'DSP';
delete from service_subscribers where line = 1 AND service = '3WC';

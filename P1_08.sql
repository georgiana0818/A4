
/*
Question 8)Write an SQL query that would find if the line with phone number
(613) 712-0024 is currently available to take a call (that it is IDLE).
*/

select state = 'IDLE' from (select * from lines where areacode = '613' AND officecode = '712' AND stationcode = '0024');



/*
Test Output

state = 'IDLE'
------------------------------
0

*/

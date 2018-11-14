
/*
Question 7)Write an SQL query that will produce in one table a list of
all the acceptable trunks that can be used to route a call to the 416 area code,
office code 334. This query should list the trunks in the order of preference.
(The answer should list trunks with routes 416,334
then those with 416,000 and then those with 000,000 for example)
*/

select portid, foreign_switch, area, office from trunks
join (select portid AS pid, area, office from trunk_routes where area = '416' AND office = '334'
UNION ALL select portid AS pid, area, office from trunk_routes where area = '416' AND office = '000'
UNION ALL select portid AS pid, area, office from trunk_routes where area = '000' AND office = '000')
on portid = pid;



/*
Test Output

portid                          foreign_switch   area             office
------------------------------  ---------------  ---------------  ----------
102                             RIDEAU           416              334
102                             RIDEAU           416              000
106                             BAY              416              000
107                             Innes            000              000

*/

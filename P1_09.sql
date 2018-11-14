
/*
Question 9)Do the same as question 1.7 but this time only include trunks that
have at least one 'IDLE' channel. That is, write an SQL query
that will produce in one table a list of all the acceptable trunks
that can be used to route a call to the 416 area code,
office code 334 have at least one idle channel.
This query should list the trunks in the order of preference.
(The answer should list trunks routes 416,334 then 416,000 then 000,000 for example)
*/


select portid, foreign_switch, area, office from (select portid from trunk_channels where state = 'IDLE' group by portid),
(select portid AS id, foreign_switch, area, office from trunks,
(select portid AS pid, area, office from trunk_routes where area = '416' AND office = '334'
UNION ALL select portid AS pid, area, office from trunk_routes where area = '416' AND office = '000'
UNION ALL select portid AS pid, area, office from trunk_routes where area = '000' AND office = '000')
where portid = pid) where portid = id order by office DESC;


/*
Test Output

portid                          foreign_switch   area             office
------------------------------  ---------------  ---------------  ----------
102                             RIDEAU           416              334
102                             RIDEAU           416              000
106                             BAY              416              000
107                             Innes            000              000

*/

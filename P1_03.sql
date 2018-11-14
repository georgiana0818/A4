
/*
Question 3)List the names of all the subscribers
who are originators of a call to someone
who is also a subscriber on the same switch (i.e. a line to line call)
*/



select name from subscribers join
(select orig, term from calls where
orig in (select portid from lines) and
term in (select portid from lines)) on subscribers.portid = orig;

/*
Test Output

name
---------------
Mats Sundin
Jason Allison
Homer Simpson
Michael Jordan
Ed Belfour

*/

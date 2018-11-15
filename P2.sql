
.open fakebooks3005fall2018.db
delete from songs where rowid not in (select min(rowid) from songs group by title, bookcode, page);
select count(*) from songs;
select count(*) from (select title, bookcode, page from songs group by title, bookcode, page having count(*) > 1);

attach 'fakebooks3005fall2018.db' as db1;
attach 'fakebooks3005winter2016.db' as db2;

.databases

create table IF NOT EXISTS db2.tempSongs
AS
select
id, a.title, b.composer, a.bookcode, a.page, b.length
from
  db2.songs a
  left outer join
  db1.songs b on b.title = a.title AND b.bookcode = a.bookcode AND b.page = a.page;

detach db1;
detach db2;
.open fakebooks3005winter2016.db
drop table songs;

alter table tempSongs rename to songs;

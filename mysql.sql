create database cms;
//创建信息表格
create table if not exists  info(
	id varchar(50) not null,
	title text not null,
	content text not null,
	createDate date,
	overDate date,
	primary key(id)
);
delete from info;
// curdate 当前日期的函数,curdate()+2 加2天
insert into info values('test','ipaji is published','this is a big date, my ipaji is published.Everybody can publish info on my ipaji',curdate(),curdate()+2);
select * from info;
update info set overDate = date_add(curdate(),interval 31 day);

drop database if exists nodemariatodo;
create database nodemariatodo;
use nodemariatodo

create table todoer (
    userid varchar(16) not null,
    email varchar(64) not null,
    pwd blob not null,
    primary key(userid),
    unique(email)
);

create table task (
    id int unsigned not null auto_increment,
    task varchar(64) not null,
    entered datetime not null default current_timestamp,
    completed boolean not null default false,
    userid varchar(16) not null,
    primary key(id),
    foreign key(userid) references todoer(userid)
);

grant all on nodemariatodo.* to nobody@localhost;

insert into todoer values('nml', 'nmla@iba.dk', 'x');
insert into todoer values('john', 'johndoe@doe.com', 'x');
insert into todoer values('jane', 'jane@doe.com', 'x');

insert into task (task, userid) values('Complete materials', 'nml');
insert into task (task, userid) values('Write Unit Guides', 'nml');
insert into task (task, userid) values('Prepare Exam', 'nml');

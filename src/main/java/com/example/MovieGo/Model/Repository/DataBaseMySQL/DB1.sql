create database moviegodb;
use moviegodb;

create table users (
    user_id int auto_increment primary key,
    full_name varchar(100) not null,
    email varchar(100) unique not null,
    `password` varchar(255) not null,
    phone varchar(15),
    `role` enum('customer', 'staff', 'admin') default 'customer',
    `status` enum('active', 'blocked') default 'active',
    created_at timestamp default current_timestamp
);


insert into users (full_name, email, password, phone, role) values 
('ho hoang trung', 'a@gmail.com', '123456', '0901234567', 'customer'),
('ho hoang chung', 'b@gmail.com', '123456', '0902345678', 'staff'),
('tran van cuong', 'c@gmail.com', '123456', '0903456789', 'admin');
select * from users;
update users set phone = '0909999999' where user_id = 1;
delete from users where user_id = 3;

create table movies (
    movie_id int auto_increment primary key,
    title varchar(255) not null,
    genre varchar(100),
    duration int,
    release_date date,
    `description` text,
    trailer_url varchar(255),
    poster_url varchar(255),
    rating float default 0,
    status enum('now_showing', 'coming_soon', 'ended') default 'coming_soon'
);
insert into movies (title, genre, duration, release_date, description) values
('avengers: endgame', 'action', 181, '2019-04-26', 'the final avengers battle.'),
('inside out 2', 'animation', 120, '2024-06-12', 'riley grows up with new emotions.'),
('oppenheimer', 'drama', 180, '2023-07-21', 'story of the atomic bomb.');
select * from movies;
update movies set rating = 9.5 where movie_id = 3;
delete from movies where movie_id = 2;

create table cinemas (
    cinema_id int auto_increment primary key,
    `name` varchar(100) not null,
    address varchar(255),
    phone varchar(20)
);

insert into cinemas (name, address, phone) values
('galaxy cinema', '478 dien bien phu, thanh khe, da nang', '02361234567'),
('cgv vincom', '910 ngo quyen, son tra, da nang', '02369876543'),
('lotte cinema', '255 nguyen van linh, hai chau, da nang', '02369988776');
select * from cinemas;
update cinemas set phone = '0289999999' where cinema_id = 1;
delete from cinemas where cinema_id = 3;

create table rooms (
    room_id int auto_increment primary key,
    cinema_id int,
    room_name varchar(50),
    seat_count int,
    foreign key (cinema_id) references cinemas(cinema_id)
);

insert into rooms (cinema_id, room_name, seat_count) values
(1, 'room a', 50),
(1, 'room b', 70),
(2, 'vip room 1', 30);
select * from rooms;
update rooms set seat_count = 60 where room_id = 1;
delete from rooms where room_id = 2;


create table seats (
    seat_id int auto_increment primary key,
    room_id int,
    seat_number varchar(10),
    seat_type enum('standard', 'vip') default 'standard',
    status enum('available', 'broken') default 'available',
    foreign key (room_id) references rooms(room_id)
);

insert into seats (room_id, seat_number, seat_type) values
(1, 'a1', 'standard'),
(1, 'a2', 'standard'),
(3, 'v1', 'vip');
select * from seats;
update seats set status = 'broken' where seat_id = 2;
delete from seats where seat_id = 3;

create table showtimes (
    showtime_id int auto_increment primary key,
    movie_id int,
    room_id int,
    show_date date,
    start_time time,
    end_time time,
    price decimal(10,2),
    foreign key (movie_id) references movies(movie_id),
    foreign key (room_id) references rooms(room_id)
);
insert into showtimes (movie_id, room_id, show_date, start_time, end_time, price) values
(1, 1, '2025-10-15', '18:00:00', '21:00:00', 95000),
(1, 3, '2025-10-16', '20:00:00', '23:00:00', 120000),
(3, 1, '2025-10-17', '19:00:00', '22:00:00', 100000);

select * from showtimes;
update showtimes set price = 99000 where showtime_id = 1;
delete from showtimes where showtime_id = 3;

create table bookings (
    booking_id int auto_increment primary key,
    user_id int,
    showtime_id int,
    booking_date timestamp default current_timestamp,
    total_price decimal(10,2),
    payment_status enum('pending', 'paid', 'cancelled') default 'pending',
    payment_method enum('online', 'offline') default 'online',
    foreign key (user_id) references users(user_id),
    foreign key (showtime_id) references showtimes(showtime_id)
);

insert into bookings (user_id, showtime_id, total_price, payment_status) values
(1, 1, 190000, 'paid'),
(2, 2, 120000, 'pending'),
(1, 2, 95000, 'paid');
select * from bookings;
update bookings set payment_status = 'cancelled' where booking_id = 2;
delete from bookings where booking_id = 3;

create table reviews (
    review_id int auto_increment primary key,
    movie_id int,
    user_id int,
    rating int check (rating between 1 and 5),
    `comment` text,
    created_at timestamp default current_timestamp,
    foreign key (movie_id) references movies(movie_id),
    foreign key (user_id) references users(user_id)
);

insert into reviews (movie_id, user_id, rating, comment) values ();
select * from reviews;
update reviews set rating = 4 where review_id = 3;
delete from reviews where review_id = 2;


create table reports (
    report_id int auto_increment primary key,
    report_type enum('revenue', 'view_count', 'activity'),
    generated_at timestamp default current_timestamp
);

select * from reports;
update reports set report_type = 'activity' where report_id = 1;
delete from reports where report_id = 3;


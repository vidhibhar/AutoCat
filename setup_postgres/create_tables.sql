CREATE TABLE car 
(
    car_id integer not NULL,
    make text,
    model text, 
    safety_rating integer,
    price float,
    parent_comapny text,
    image_url text,
    PRIMARY KEY (car_id)
);

CREATE TABLE engine
(
    engine_id integer not NULL,
    horsepower integer,
    engine_size double precision,
    cylinders text,
    Engine_loc text,
    PRIMARY KEY (engine_id)
);

CREATE TABLE car_contains_engine
(
   car_id integer not null,
   engine_id integer not null,
   PRIMARY KEY(car_id),
   FOREIGN KEY(engine_id) REFERENCES engine ON DELETE CASCADE,
   FOREIGN KEY(car_id) REFERENCES car ON DELETE CASCADE
);
CREATE TABLE body
(
   body_id integer not null,
   doors integer,
   body_style text,
   drive_wheel text,
   seats integer,
   PRIMARY KEY(body_id)
);

CREATE TABLE car_has_body(
   car_id integer not null,
   body_id integer not null,
   PRIMARY KEY(car_id),
   FOREIGN KEY(body_id) REFERENCES engine ON DELETE CASCADE,
   FOREIGN KEY(car_id) REFERENCES car ON DELETE CASCADE
);

CREATE TABLE fuel(
   fuel_id integer not null,
   fuel_type text,
   highway_mpg integer,
   city_mpg integer,
   PRIMARY KEY (fuel_id)
);
CREATE TABLE runs_on(
   car_id integer not null,
   fuel_id integer not null,
   PRIMARY KEY(car_id),
   FOREIGN KEY(fuel_id) REFERENCES engine ON DELETE CASCADE,
   FOREIGN KEY(car_id) REFERENCES car ON DELETE CASCADE
);


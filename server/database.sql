-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    role character varying NOT NULL,
    name character varying NOT NULL,
    phone integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS public.booking
(
    booking_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    check_in date NOT NULL,
    check_out date NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    PRIMARY KEY (booking_id)
);

CREATE TABLE IF NOT EXISTS public.room
(
    room_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 ),
    type character varying NOT NULL,
    rate character varying NOT NULL,
    details character varying NOT NULL,
    max_count character varying NOT NULL,
    status character varying NOT NULL,
    img_url character varying NOT NULL,
    checkin_time character varying NOT NULL,
    checkout_time character varying NOT NULL,
    PRIMARY KEY (room_id)
);

ALTER TABLE IF EXISTS public.booking
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.booking
    ADD FOREIGN KEY (room_id)
    REFERENCES public.room (room_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;
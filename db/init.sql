--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-07-02 19:53:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- CREATE SCHEMA public;


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16395)
-- Name: catalogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalogs (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 16394)
-- Name: catalogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catalogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 211
-- Name: catalogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catalogs_id_seq OWNED BY public.catalogs.id;


--
-- TOC entry 217 (class 1259 OID 16422)
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 16402)
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    total integer,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 16401)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 213
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 223 (class 1259 OID 16473)
-- Name: product_catalogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_catalogs (
    product_id integer NOT NULL,
    catalog_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 16414)
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255),
    detail character varying(255),
    price integer,
    available_units integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 16413)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 215
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 221 (class 1259 OID 16450)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    policy jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16449)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 220
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 222 (class 1259 OID 16458)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16438)
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_sessions (
    id integer NOT NULL,
    user_id integer,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 16437)
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_sessions_id_seq OWNED BY public.user_sessions.id;


--
-- TOC entry 210 (class 1259 OID 16386)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    lastname character varying(255),
    email character varying(255),
    dni character varying(255),
    address character varying(255),
    phone character varying(255),
    username character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 16385)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3205 (class 2604 OID 16398)
-- Name: catalogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalogs ALTER COLUMN id SET DEFAULT nextval('public.catalogs_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 16405)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 16417)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3209 (class 2604 OID 16453)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 16441)
-- Name: user_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions ALTER COLUMN id SET DEFAULT nextval('public.user_sessions_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 16389)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3378 (class 0 OID 16395)
-- Dependencies: 212
-- Data for Name: catalogs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.catalogs VALUES (1, 'Frutas', '2023-07-03 00:52:51.074+00', '2023-07-03 00:52:51.074+00');
INSERT INTO public.catalogs VALUES (2, 'Verduras', '2023-07-03 00:52:51.132+00', '2023-07-03 00:52:51.132+00');


--
-- TOC entry 3383 (class 0 OID 16422)
-- Dependencies: 217
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3380 (class 0 OID 16402)
-- Dependencies: 214
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3389 (class 0 OID 16473)
-- Dependencies: 223
-- Data for Name: product_catalogs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_catalogs VALUES (1, 1, '2023-07-03 00:52:51.245+00', '2023-07-03 00:52:51.245+00');
INSERT INTO public.product_catalogs VALUES (2, 1, '2023-07-03 00:52:51.354+00', '2023-07-03 00:52:51.354+00');
INSERT INTO public.product_catalogs VALUES (3, 1, '2023-07-03 00:52:51.454+00', '2023-07-03 00:52:51.454+00');
INSERT INTO public.product_catalogs VALUES (4, 2, '2023-07-03 00:52:51.556+00', '2023-07-03 00:52:51.556+00');
INSERT INTO public.product_catalogs VALUES (5, 2, '2023-07-03 00:52:51.666+00', '2023-07-03 00:52:51.666+00');
INSERT INTO public.product_catalogs VALUES (6, 2, '2023-07-03 00:52:51.766+00', '2023-07-03 00:52:51.766+00');
INSERT INTO public.product_catalogs VALUES (7, 1, '2023-07-03 00:52:51.912+00', '2023-07-03 00:52:51.912+00');
INSERT INTO public.product_catalogs VALUES (8, 2, '2023-07-03 00:52:51.973+00', '2023-07-03 00:52:51.973+00');
INSERT INTO public.product_catalogs VALUES (9, 1, '2023-07-03 00:52:52.076+00', '2023-07-03 00:52:52.076+00');
INSERT INTO public.product_catalogs VALUES (10, 2, '2023-07-03 00:52:52.174+00', '2023-07-03 00:52:52.174+00');
INSERT INTO public.product_catalogs VALUES (11, 1, '2023-07-03 00:52:52.285+00', '2023-07-03 00:52:52.285+00');
INSERT INTO public.product_catalogs VALUES (12, 2, '2023-07-03 00:52:52.402+00', '2023-07-03 00:52:52.402+00');
INSERT INTO public.product_catalogs VALUES (13, 1, '2023-07-03 00:52:52.509+00', '2023-07-03 00:52:52.509+00');
INSERT INTO public.product_catalogs VALUES (14, 2, '2023-07-03 00:52:52.627+00', '2023-07-03 00:52:52.627+00');
INSERT INTO public.product_catalogs VALUES (15, 1, '2023-07-03 00:52:52.731+00', '2023-07-03 00:52:52.731+00');
INSERT INTO public.product_catalogs VALUES (16, 2, '2023-07-03 00:52:52.847+00', '2023-07-03 00:52:52.847+00');
INSERT INTO public.product_catalogs VALUES (17, 1, '2023-07-03 00:52:52.959+00', '2023-07-03 00:52:52.959+00');
INSERT INTO public.product_catalogs VALUES (18, 2, '2023-07-03 00:52:53.055+00', '2023-07-03 00:52:53.055+00');
INSERT INTO public.product_catalogs VALUES (19, 1, '2023-07-03 00:52:53.174+00', '2023-07-03 00:52:53.174+00');
INSERT INTO public.product_catalogs VALUES (20, 2, '2023-07-03 00:52:53.281+00', '2023-07-03 00:52:53.281+00');
INSERT INTO public.product_catalogs VALUES (21, 1, '2023-07-03 00:52:53.394+00', '2023-07-03 00:52:53.394+00');
INSERT INTO public.product_catalogs VALUES (22, 2, '2023-07-03 00:52:53.503+00', '2023-07-03 00:52:53.503+00');
INSERT INTO public.product_catalogs VALUES (23, 1, '2023-07-03 00:52:53.623+00', '2023-07-03 00:52:53.623+00');
INSERT INTO public.product_catalogs VALUES (24, 2, '2023-07-03 00:52:53.743+00', '2023-07-03 00:52:53.743+00');
INSERT INTO public.product_catalogs VALUES (25, 1, '2023-07-03 00:52:53.876+00', '2023-07-03 00:52:53.876+00');
INSERT INTO public.product_catalogs VALUES (26, 2, '2023-07-03 00:52:53.986+00', '2023-07-03 00:52:53.986+00');
INSERT INTO public.product_catalogs VALUES (27, 1, '2023-07-03 00:52:54.1+00', '2023-07-03 00:52:54.1+00');
INSERT INTO public.product_catalogs VALUES (28, 2, '2023-07-03 00:52:54.204+00', '2023-07-03 00:52:54.204+00');
INSERT INTO public.product_catalogs VALUES (29, 1, '2023-07-03 00:52:54.304+00', '2023-07-03 00:52:54.304+00');
INSERT INTO public.product_catalogs VALUES (30, 2, '2023-07-03 00:52:54.432+00', '2023-07-03 00:52:54.432+00');
INSERT INTO public.product_catalogs VALUES (31, 1, '2023-07-03 00:52:54.534+00', '2023-07-03 00:52:54.534+00');
INSERT INTO public.product_catalogs VALUES (32, 2, '2023-07-03 00:52:54.636+00', '2023-07-03 00:52:54.636+00');
INSERT INTO public.product_catalogs VALUES (33, 1, '2023-07-03 00:52:54.755+00', '2023-07-03 00:52:54.755+00');
INSERT INTO public.product_catalogs VALUES (34, 2, '2023-07-03 00:52:54.853+00', '2023-07-03 00:52:54.853+00');
INSERT INTO public.product_catalogs VALUES (35, 1, '2023-07-03 00:52:54.96+00', '2023-07-03 00:52:54.96+00');
INSERT INTO public.product_catalogs VALUES (36, 2, '2023-07-03 00:52:55.076+00', '2023-07-03 00:52:55.076+00');
INSERT INTO public.product_catalogs VALUES (37, 1, '2023-07-03 00:52:55.183+00', '2023-07-03 00:52:55.183+00');
INSERT INTO public.product_catalogs VALUES (38, 2, '2023-07-03 00:52:55.292+00', '2023-07-03 00:52:55.292+00');
INSERT INTO public.product_catalogs VALUES (39, 1, '2023-07-03 00:52:55.4+00', '2023-07-03 00:52:55.4+00');
INSERT INTO public.product_catalogs VALUES (40, 2, '2023-07-03 00:52:55.512+00', '2023-07-03 00:52:55.512+00');
INSERT INTO public.product_catalogs VALUES (41, 1, '2023-07-03 00:52:55.626+00', '2023-07-03 00:52:55.626+00');
INSERT INTO public.product_catalogs VALUES (42, 2, '2023-07-03 00:52:55.755+00', '2023-07-03 00:52:55.755+00');
INSERT INTO public.product_catalogs VALUES (43, 1, '2023-07-03 00:52:55.871+00', '2023-07-03 00:52:55.871+00');
INSERT INTO public.product_catalogs VALUES (44, 2, '2023-07-03 00:52:55.978+00', '2023-07-03 00:52:55.978+00');
INSERT INTO public.product_catalogs VALUES (45, 1, '2023-07-03 00:52:56.085+00', '2023-07-03 00:52:56.085+00');
INSERT INTO public.product_catalogs VALUES (46, 2, '2023-07-03 00:52:56.188+00', '2023-07-03 00:52:56.188+00');
INSERT INTO public.product_catalogs VALUES (47, 1, '2023-07-03 00:52:56.284+00', '2023-07-03 00:52:56.284+00');
INSERT INTO public.product_catalogs VALUES (48, 2, '2023-07-03 00:52:56.394+00', '2023-07-03 00:52:56.394+00');
INSERT INTO public.product_catalogs VALUES (49, 1, '2023-07-03 00:52:56.504+00', '2023-07-03 00:52:56.504+00');
INSERT INTO public.product_catalogs VALUES (50, 2, '2023-07-03 00:52:56.611+00', '2023-07-03 00:52:56.611+00');
INSERT INTO public.product_catalogs VALUES (51, 1, '2023-07-03 00:52:56.724+00', '2023-07-03 00:52:56.724+00');
INSERT INTO public.product_catalogs VALUES (52, 2, '2023-07-03 00:52:56.835+00', '2023-07-03 00:52:56.835+00');
INSERT INTO public.product_catalogs VALUES (53, 1, '2023-07-03 00:52:56.935+00', '2023-07-03 00:52:56.935+00');


--
-- TOC entry 3382 (class 0 OID 16414)
-- Dependencies: 216
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES (1, 'Manzana', 'Fruta fresca y jugosa', 2217, 58, '2023-07-03 00:52:51.184+00', '2023-07-03 00:52:51.184+00');
INSERT INTO public.products VALUES (2, 'Plátano', 'Fruta rica en potasio', 2385, 62, '2023-07-03 00:52:51.302+00', '2023-07-03 00:52:51.302+00');
INSERT INTO public.products VALUES (3, 'Sandía', 'Fruta refrescante para el verano', 4106, 51, '2023-07-03 00:52:51.406+00', '2023-07-03 00:52:51.406+00');
INSERT INTO public.products VALUES (4, 'Zanahoria', 'Hortaliza saludable y rica en betacaroteno', 2956, 63, '2023-07-03 00:52:51.504+00', '2023-07-03 00:52:51.504+00');
INSERT INTO public.products VALUES (5, 'Tomate', 'Fruto versátil para diferentes preparaciones culinarias', 2305, 69, '2023-07-03 00:52:51.607+00', '2023-07-03 00:52:51.607+00');
INSERT INTO public.products VALUES (6, 'Lechuga', 'Hojas verdes y crujientes para ensaladas', 2053, 72, '2023-07-03 00:52:51.715+00', '2023-07-03 00:52:51.715+00');
INSERT INTO public.products VALUES (7, 'Piña', 'Fruta tropical jugosa y dulce', 3840, 59, '2023-07-03 00:52:51.824+00', '2023-07-03 00:52:51.824+00');
INSERT INTO public.products VALUES (8, 'Papa', 'Tubérculo versátil para guarniciones y platos principales', 2465, 64, '2023-07-03 00:52:51.929+00', '2023-07-03 00:52:51.929+00');
INSERT INTO public.products VALUES (9, 'Mango', 'Dulce fruta exótica con pulpa jugosa', 4123, 56, '2023-07-03 00:52:52.026+00', '2023-07-03 00:52:52.026+00');
INSERT INTO public.products VALUES (10, 'Espinaca', 'Verdura rica en hierro y nutrientes esenciales', 2794, 68, '2023-07-03 00:52:52.125+00', '2023-07-03 00:52:52.125+00');
INSERT INTO public.products VALUES (11, 'Naranja', 'Cítrico jugoso y lleno de vitamina C', 2365, 65, '2023-07-03 00:52:52.232+00', '2023-07-03 00:52:52.232+00');
INSERT INTO public.products VALUES (12, 'Pimiento', 'Vegetal colorido y sabroso para guisos y ensaladas', 2239, 71, '2023-07-03 00:52:52.346+00', '2023-07-03 00:52:52.346+00');
INSERT INTO public.products VALUES (13, 'Pera', 'Fruta jugosa y dulce, perfecta para postres', 2614, 60, '2023-07-03 00:52:52.455+00', '2023-07-03 00:52:52.455+00');
INSERT INTO public.products VALUES (14, 'Pepino', 'Hortaliza refrescante para ensaladas y gazpachos', 2142, 67, '2023-07-03 00:52:52.571+00', '2023-07-03 00:52:52.571+00');
INSERT INTO public.products VALUES (15, 'Melón', 'Fruta dulce y jugosa, ideal para el verano', 3039, 57, '2023-07-03 00:52:52.675+00', '2023-07-03 00:52:52.675+00');
INSERT INTO public.products VALUES (16, 'Calabacín', 'Vegetal versátil para asar, saltear o rellenar', 2275, 69, '2023-07-03 00:52:52.784+00', '2023-07-03 00:52:52.784+00');
INSERT INTO public.products VALUES (17, 'Cereza', 'Pequeña fruta roja y jugosa, perfecta como snack', 3218, 54, '2023-07-03 00:52:52.9+00', '2023-07-03 00:52:52.9+00');
INSERT INTO public.products VALUES (18, 'Patata', 'Tubérculo versátil para diversas preparaciones', 2401, 61, '2023-07-03 00:52:53.004+00', '2023-07-03 00:52:53.004+00');
INSERT INTO public.products VALUES (19, 'Uva', 'Fruta pequeña y dulce, ideal para postres y vinos', 2873, 66, '2023-07-03 00:52:53.113+00', '2023-07-03 00:52:53.113+00');
INSERT INTO public.products VALUES (20, 'Cebolla', 'Hortaliza aromática para salsas y guisos', 2197, 70, '2023-07-03 00:52:53.227+00', '2023-07-03 00:52:53.227+00');
INSERT INTO public.products VALUES (21, 'Limón', 'Cítrico ácido y refrescante, perfecto para aliños', 2336, 68, '2023-07-03 00:52:53.34+00', '2023-07-03 00:52:53.34+00');
INSERT INTO public.products VALUES (22, 'Calabaza', 'Vegetal dulce y nutritivo para cremas y pasteles', 2750, 63, '2023-07-03 00:52:53.447+00', '2023-07-03 00:52:53.447+00');
INSERT INTO public.products VALUES (23, 'Mandarina', 'Pequeño cítrico jugoso y fácil de pelar', 2419, 64, '2023-07-03 00:52:53.562+00', '2023-07-03 00:52:53.562+00');
INSERT INTO public.products VALUES (24, 'Brócoli', 'Verdura llena de nutrientes y antioxidantes', 2657, 59, '2023-07-03 00:52:53.677+00', '2023-07-03 00:52:53.677+00');
INSERT INTO public.products VALUES (25, 'Melocotón', 'Fruta jugosa y dulce, ideal para postres', 2935, 55, '2023-07-03 00:52:53.811+00', '2023-07-03 00:52:53.811+00');
INSERT INTO public.products VALUES (26, 'Calabacita', 'Vegetal tierno y sabroso para guisos y salteados', 2232, 67, '2023-07-03 00:52:53.929+00', '2023-07-03 00:52:53.929+00');
INSERT INTO public.products VALUES (27, 'Mora', 'Pequeña fruta oscura y dulce, ideal para postres', 3127, 53, '2023-07-03 00:52:54.044+00', '2023-07-03 00:52:54.044+00');
INSERT INTO public.products VALUES (28, 'Perejil', 'Hierba aromática y decorativa para platos', 2168, 71, '2023-07-03 00:52:54.157+00', '2023-07-03 00:52:54.157+00');
INSERT INTO public.products VALUES (29, 'Durazno', 'Fruta jugosa y dulce, perfecta para postres', 2561, 62, '2023-07-03 00:52:54.257+00', '2023-07-03 00:52:54.257+00');
INSERT INTO public.products VALUES (30, 'Champiñón', 'Seta suave y versátil para platos salteados', 2345, 68, '2023-07-03 00:52:54.361+00', '2023-07-03 00:52:54.361+00');
INSERT INTO public.products VALUES (31, 'Frambuesa', 'Pequeña fruta dulce y ácida, ideal para postres', 3194, 56, '2023-07-03 00:52:54.489+00', '2023-07-03 00:52:54.489+00');
INSERT INTO public.products VALUES (32, 'Coliflor', 'Verdura versátil y nutritiva para guisos y gratinados', 2725, 61, '2023-07-03 00:52:54.583+00', '2023-07-03 00:52:54.583+00');
INSERT INTO public.products VALUES (33, 'Ciruela', 'Fruta jugosa y dulce, ideal para postres y mermeladas', 2959, 57, '2023-07-03 00:52:54.697+00', '2023-07-03 00:52:54.697+00');
INSERT INTO public.products VALUES (34, 'Escarola', 'Variedad de lechuga con hojas rizadas y amargas', 2175, 65, '2023-07-03 00:52:54.807+00', '2023-07-03 00:52:54.807+00');
INSERT INTO public.products VALUES (35, 'Kiwi', 'Fruta pequeña y exótica, rica en vitamina C', 2374, 67, '2023-07-03 00:52:54.903+00', '2023-07-03 00:52:54.903+00');
INSERT INTO public.products VALUES (36, 'Apio', 'Vegetal crujiente y refrescante para ensaladas', 2247, 69, '2023-07-03 00:52:55.013+00', '2023-07-03 00:52:55.013+00');
INSERT INTO public.products VALUES (37, 'Granada', 'Fruta llena de antioxidantes y sabor agridulce', 2838, 54, '2023-07-03 00:52:55.133+00', '2023-07-03 00:52:55.133+00');
INSERT INTO public.products VALUES (38, 'Repollo', 'Verdura crujiente y versátil para ensaladas y cocidos', 2146, 72, '2023-07-03 00:52:55.234+00', '2023-07-03 00:52:55.234+00');
INSERT INTO public.products VALUES (39, 'Fresa', 'Pequeña fruta dulce y jugosa, perfecta como postre', 3213, 58, '2023-07-03 00:52:55.346+00', '2023-07-03 00:52:55.346+00');
INSERT INTO public.products VALUES (40, 'Espárrago', 'Hortaliza delicada y sabrosa, ideal para guarniciones', 2261, 70, '2023-07-03 00:52:55.455+00', '2023-07-03 00:52:55.455+00');
INSERT INTO public.products VALUES (41, 'Coco', 'Fruta tropical con sabor dulce y textura cremosa', 2467, 63, '2023-07-03 00:52:55.563+00', '2023-07-03 00:52:55.563+00');
INSERT INTO public.products VALUES (42, 'Puerro', 'Hortaliza con sabor suave para sopas y guisos', 2321, 66, '2023-07-03 00:52:55.699+00', '2023-07-03 00:52:55.699+00');
INSERT INTO public.products VALUES (43, 'Albaricoque', 'Fruta jugosa y ligeramente ácida, perfecta para postres', 2714, 60, '2023-07-03 00:52:55.811+00', '2023-07-03 00:52:55.811+00');
INSERT INTO public.products VALUES (44, 'Alcachofa', 'Hortaliza con sabor delicado y textura tierna', 2286, 64, '2023-07-03 00:52:55.923+00', '2023-07-03 00:52:55.923+00');
INSERT INTO public.products VALUES (45, 'Ciruela pasa', 'Fruta deshidratada dulce y jugosa', 2095, 73, '2023-07-03 00:52:56.037+00', '2023-07-03 00:52:56.037+00');
INSERT INTO public.products VALUES (46, 'Remolacha', 'Hortaliza dulce y nutritiva, perfecta para ensaladas', 2378, 67, '2023-07-03 00:52:56.133+00', '2023-07-03 00:52:56.133+00');
INSERT INTO public.products VALUES (47, 'Mango verde', 'Fruta tropical aún sin madurar, ideal para preparaciones saladas', 2213, 72, '2023-07-03 00:52:56.237+00', '2023-07-03 00:52:56.237+00');
INSERT INTO public.products VALUES (48, 'Hinojo', 'Hortaliza de sabor anisado, ideal para ensaladas', 2280, 69, '2023-07-03 00:52:56.341+00', '2023-07-03 00:52:56.341+00');
INSERT INTO public.products VALUES (49, 'Carambola', 'Fruta tropical con forma de estrella y sabor agridulce', 2465, 66, '2023-07-03 00:52:56.455+00', '2023-07-03 00:52:56.455+00');
INSERT INTO public.products VALUES (50, 'Rábano', 'Raíz picante y crujiente para ensaladas y salsas', 2337, 63, '2023-07-03 00:52:56.557+00', '2023-07-03 00:52:56.557+00');
INSERT INTO public.products VALUES (51, 'Morango', 'Pequeña fruta dulce y jugosa, ideal para postres', 3191, 59, '2023-07-03 00:52:56.663+00', '2023-07-03 00:52:56.663+00');
INSERT INTO public.products VALUES (52, 'Habas', 'Legumbre tierna y sabrosa, ideal para guisos', 2219, 68, '2023-07-03 00:52:56.784+00', '2023-07-03 00:52:56.784+00');
INSERT INTO public.products VALUES (53, 'Níspero', 'Fruta dulce y jugosa, típica en climas cálidos', 2464, 65, '2023-07-03 00:52:56.885+00', '2023-07-03 00:52:56.885+00');


--
-- TOC entry 3387 (class 0 OID 16450)
-- Dependencies: 221
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles VALUES (1, 'Adminstrator', '{"GET": {"/products": true}}', '2023-07-03 00:52:47.837+00', '2023-07-03 00:52:47.837+00');
INSERT INTO public.roles VALUES (2, 'User', '{"GET": {"/products": true}}', '2023-07-03 00:52:47.902+00', '2023-07-03 00:52:47.902+00');


--
-- TOC entry 3388 (class 0 OID 16458)
-- Dependencies: 222
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_roles VALUES (1, 2, '2023-07-03 00:52:48.041+00', '2023-07-03 00:52:48.041+00');
INSERT INTO public.user_roles VALUES (2, 1, '2023-07-03 00:52:48.188+00', '2023-07-03 00:52:48.188+00');
INSERT INTO public.user_roles VALUES (3, 2, '2023-07-03 00:52:48.304+00', '2023-07-03 00:52:48.304+00');
INSERT INTO public.user_roles VALUES (4, 1, '2023-07-03 00:52:48.413+00', '2023-07-03 00:52:48.413+00');
INSERT INTO public.user_roles VALUES (5, 2, '2023-07-03 00:52:48.528+00', '2023-07-03 00:52:48.528+00');
INSERT INTO public.user_roles VALUES (6, 1, '2023-07-03 00:52:48.643+00', '2023-07-03 00:52:48.643+00');
INSERT INTO public.user_roles VALUES (7, 2, '2023-07-03 00:52:48.745+00', '2023-07-03 00:52:48.745+00');
INSERT INTO public.user_roles VALUES (8, 1, '2023-07-03 00:52:48.859+00', '2023-07-03 00:52:48.859+00');
INSERT INTO public.user_roles VALUES (9, 2, '2023-07-03 00:52:48.978+00', '2023-07-03 00:52:48.978+00');
INSERT INTO public.user_roles VALUES (10, 1, '2023-07-03 00:52:49.093+00', '2023-07-03 00:52:49.093+00');
INSERT INTO public.user_roles VALUES (11, 2, '2023-07-03 00:52:49.211+00', '2023-07-03 00:52:49.211+00');
INSERT INTO public.user_roles VALUES (12, 1, '2023-07-03 00:52:49.323+00', '2023-07-03 00:52:49.323+00');
INSERT INTO public.user_roles VALUES (13, 2, '2023-07-03 00:52:49.437+00', '2023-07-03 00:52:49.437+00');
INSERT INTO public.user_roles VALUES (14, 1, '2023-07-03 00:52:49.552+00', '2023-07-03 00:52:49.552+00');
INSERT INTO public.user_roles VALUES (15, 2, '2023-07-03 00:52:49.673+00', '2023-07-03 00:52:49.673+00');
INSERT INTO public.user_roles VALUES (16, 1, '2023-07-03 00:52:49.794+00', '2023-07-03 00:52:49.794+00');
INSERT INTO public.user_roles VALUES (17, 2, '2023-07-03 00:52:49.904+00', '2023-07-03 00:52:49.904+00');
INSERT INTO public.user_roles VALUES (18, 1, '2023-07-03 00:52:50.026+00', '2023-07-03 00:52:50.026+00');
INSERT INTO public.user_roles VALUES (19, 2, '2023-07-03 00:52:50.123+00', '2023-07-03 00:52:50.123+00');
INSERT INTO public.user_roles VALUES (20, 1, '2023-07-03 00:52:50.223+00', '2023-07-03 00:52:50.223+00');
INSERT INTO public.user_roles VALUES (21, 2, '2023-07-03 00:52:50.324+00', '2023-07-03 00:52:50.324+00');
INSERT INTO public.user_roles VALUES (22, 1, '2023-07-03 00:52:50.423+00', '2023-07-03 00:52:50.423+00');
INSERT INTO public.user_roles VALUES (23, 2, '2023-07-03 00:52:50.524+00', '2023-07-03 00:52:50.524+00');
INSERT INTO public.user_roles VALUES (24, 1, '2023-07-03 00:52:50.624+00', '2023-07-03 00:52:50.624+00');
INSERT INTO public.user_roles VALUES (25, 2, '2023-07-03 00:52:50.725+00', '2023-07-03 00:52:50.725+00');
INSERT INTO public.user_roles VALUES (26, 1, '2023-07-03 00:52:50.824+00', '2023-07-03 00:52:50.824+00');
INSERT INTO public.user_roles VALUES (27, 2, '2023-07-03 00:52:50.924+00', '2023-07-03 00:52:50.924+00');
INSERT INTO public.user_roles VALUES (28, 1, '2023-07-03 00:52:51.025+00', '2023-07-03 00:52:51.025+00');


--
-- TOC entry 3385 (class 0 OID 16438)
-- Dependencies: 219
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3376 (class 0 OID 16386)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Chanelle', 'Maggio', 'Stewart39@yahoo.com', '2326276559', '4652 Stoltenberg Highway', '1-792-583-6325', 'danilo', 'danilo', '2023-07-03 00:52:47.959+00', '2023-07-03 00:52:47.959+00');
INSERT INTO public.users VALUES (2, 'Jeramy', 'McClure', 'Jairo_Runte@yahoo.com', '4724417716', '374 Clarabelle Dam', '(419) 338-2352 x39960', 'Wilford.McDermott', 'Davh7w6wouc1XLM', '2023-07-03 00:52:48.12+00', '2023-07-03 00:52:48.12+00');
INSERT INTO public.users VALUES (3, 'Annetta', 'Zboncak', 'Janie.Powlowski46@gmail.com', '0129296032', '16787 O''Kon Harbors', '698-952-8651 x92252', 'Brett.Morissette66', 'WQuZapFo02Iqc_k', '2023-07-03 00:52:48.243+00', '2023-07-03 00:52:48.243+00');
INSERT INTO public.users VALUES (4, 'Gardner', 'Trantow', 'Trystan_Pfannerstill59@yahoo.com', '3410367596', '44145 Abner Circle', '1-841-675-6482 x364', 'Alene.Welch12', 'MTIzgQZQlQkAmjm', '2023-07-03 00:52:48.358+00', '2023-07-03 00:52:48.358+00');
INSERT INTO public.users VALUES (5, 'Giovanni', 'Bode', 'Tierra_Doyle82@yahoo.com', '3056404356', '142 Bayer Extension', '329.305.6855 x497', 'Elvis83', '6aco_LyK7xufeHJ', '2023-07-03 00:52:48.47+00', '2023-07-03 00:52:48.47+00');
INSERT INTO public.users VALUES (6, 'Marcelino', 'Barton', 'Savannah_Mosciski85@gmail.com', '1767943490', '94046 Rippin Green', '(504) 249-7523 x9581', 'Genesis_Raynor', 'zJkGCLl0UQ4Hd3v', '2023-07-03 00:52:48.591+00', '2023-07-03 00:52:48.591+00');
INSERT INTO public.users VALUES (7, 'Kenyon', 'Heller', 'Sally_Krajcik-Aufderhar88@yahoo.com', '5103706587', '466 Ross Neck', '1-625-506-6991 x34809', 'Leo65', 'L2kmIJOStveENFL', '2023-07-03 00:52:48.697+00', '2023-07-03 00:52:48.697+00');
INSERT INTO public.users VALUES (8, 'Damien', 'Stehr', 'Immanuel.Bartell@yahoo.com', '0981686879', '70675 Keeling Haven', '369-472-1628 x2897', 'Roselyn_Roob12', 'zJbD6wyaICEjnes', '2023-07-03 00:52:48.794+00', '2023-07-03 00:52:48.794+00');
INSERT INTO public.users VALUES (9, 'Owen', 'Funk', 'Lucie.Nikolaus42@yahoo.com', '9644888564', '18920 Pouros Place', '599.294.8040', 'Berry_Mraz38', 'xlKahA2haCRL7j5', '2023-07-03 00:52:48.916+00', '2023-07-03 00:52:48.916+00');
INSERT INTO public.users VALUES (10, 'Isabella', 'Welch', 'Nadia74@yahoo.com', '5827138198', '509 Bettye Alley', '958-490-7696', 'Felicity26', '_Y046CK2Y9O2IU0', '2023-07-03 00:52:49.041+00', '2023-07-03 00:52:49.041+00');
INSERT INTO public.users VALUES (11, 'Evie', 'Legros', 'Boyd_Cummings@gmail.com', '1845836881', '2728 Hermiston Groves', '409.449.1243 x146', 'Jalyn57', 'AZP8ocI2EdXn0D3', '2023-07-03 00:52:49.15+00', '2023-07-03 00:52:49.15+00');
INSERT INTO public.users VALUES (12, 'Nicholas', 'Reichel', 'Laney.Swaniawski67@gmail.com', '1831532591', '454 Macejkovic Ridge', '482.662.2282 x4660', 'Pierce.Kunze', 'YXKiz0wLWT4LBte', '2023-07-03 00:52:49.272+00', '2023-07-03 00:52:49.272+00');
INSERT INTO public.users VALUES (13, 'Aleen', 'Weimann', 'Eulah13@gmail.com', '3095553308', '2727 Darlene Curve', '256-403-4702 x374', 'Lexi69', 'SbSnqc7OAMPYFf5', '2023-07-03 00:52:49.383+00', '2023-07-03 00:52:49.383+00');
INSERT INTO public.users VALUES (14, 'Frederic', 'Walker', 'Eleanora.Lueilwitz@yahoo.com', '4447372369', '698 Green Mews', '586.572.2591 x0318', 'Tillman10', 'TQiQwewKwPnti7J', '2023-07-03 00:52:49.494+00', '2023-07-03 00:52:49.494+00');
INSERT INTO public.users VALUES (15, 'Cleo', 'Dickinson', 'Stanley96@hotmail.com', '1260926193', '147 Roberts Alley', '1-679-996-8133 x994', 'Rhianna_Stoltenberg33', 'cnLIyUFZuOucoOm', '2023-07-03 00:52:49.618+00', '2023-07-03 00:52:49.618+00');
INSERT INTO public.users VALUES (16, 'Gerald', 'Conroy', 'Tyrel_Toy@yahoo.com', '5313568229', '6954 Runte Radial', '(355) 220-5797 x2920', 'Hershel_Armstrong27', 'LGrXWvCHSKSyJSW', '2023-07-03 00:52:49.733+00', '2023-07-03 00:52:49.733+00');
INSERT INTO public.users VALUES (17, 'Eriberto', 'Grant', 'Makenzie.Yost18@hotmail.com', '9984291689', '33525 Kirlin Green', '(210) 926-8967 x044', 'Destinee.Wiegand85', 'bx8Cc3t2jW2AvaR', '2023-07-03 00:52:49.845+00', '2023-07-03 00:52:49.845+00');
INSERT INTO public.users VALUES (18, 'Clint', 'Schamberger-Stark', 'Kennith99@yahoo.com', '7954251948', '82274 Berniece Squares', '577-405-2683 x1092', 'Loy79', 'RZUPacCLSnxtzn4', '2023-07-03 00:52:49.956+00', '2023-07-03 00:52:49.956+00');
INSERT INTO public.users VALUES (19, 'Stephany', 'Heidenreich', 'Levi_Labadie@gmail.com', '6296507067', '9799 Grace Falls', '379-549-9839', 'Mckenna.Marvin44', 'o0H6j7LGL7aQvZ3', '2023-07-03 00:52:50.073+00', '2023-07-03 00:52:50.073+00');
INSERT INTO public.users VALUES (20, 'Robin', 'Ritchie', 'Maegan78@yahoo.com', '1404356905', '93162 Bergstrom Overpass', '(298) 990-4045 x6254', 'Elbert60', 'kEg6HodCXdbTDyn', '2023-07-03 00:52:50.173+00', '2023-07-03 00:52:50.173+00');
INSERT INTO public.users VALUES (21, 'Luigi', 'Goldner', 'Lionel_DAmore@gmail.com', '2124425529', '3002 Elda Lakes', '832-688-1418 x09075', 'Ari_OConnell', 'Khb0Cx7NE_bHYsZ', '2023-07-03 00:52:50.273+00', '2023-07-03 00:52:50.273+00');
INSERT INTO public.users VALUES (22, 'Kasey', 'Cronin', 'Paxton.Smitham50@yahoo.com', '0468278670', '792 Rutherford Lake', '1-386-696-8228 x63261', 'Otho74', 'zEBaNqLLxqB7_2U', '2023-07-03 00:52:50.373+00', '2023-07-03 00:52:50.373+00');
INSERT INTO public.users VALUES (23, 'Paula', 'Spencer', 'Rudolph57@yahoo.com', '6147510461', '851 Keyon Viaduct', '882.779.9894 x5986', 'Vincenza.Monahan', '3EbSisJBhVGRI0L', '2023-07-03 00:52:50.475+00', '2023-07-03 00:52:50.475+00');
INSERT INTO public.users VALUES (24, 'Alexys', 'Hayes', 'Unique6@hotmail.com', '5098588230', '3207 Abbey Roads', '(929) 240-1325 x551', 'Esteban.Hilll-Kozey71', '79Ksvi6QEj6Os_d', '2023-07-03 00:52:50.575+00', '2023-07-03 00:52:50.575+00');
INSERT INTO public.users VALUES (25, 'Darrion', 'Predovic', 'Mollie15@yahoo.com', '7956270153', '30182 Augustine Ridges', '409.220.0137', 'Earlene56', '4Wzlm1U2wbnm0px', '2023-07-03 00:52:50.675+00', '2023-07-03 00:52:50.675+00');
INSERT INTO public.users VALUES (26, 'Mathilde', 'Feil', 'Guiseppe_Wisozk@yahoo.com', '8515869102', '1551 Jayda Road', '320-560-4945 x68865', 'Sigrid_Dach', 'Ls9aenX4zZRhcKv', '2023-07-03 00:52:50.775+00', '2023-07-03 00:52:50.775+00');
INSERT INTO public.users VALUES (27, 'Ashley', 'Huel', 'Lura_Krajcik3@yahoo.com', '2830731118', '38526 Baumbach Light', '1-446-860-1638 x7914', 'Jacinthe.Leffler68', 'o6GtJO2r7J2KWT5', '2023-07-03 00:52:50.876+00', '2023-07-03 00:52:50.876+00');
INSERT INTO public.users VALUES (28, 'Lura', 'Jerde', 'Myrtis.Wuckert90@yahoo.com', '2511277448', '43674 Graham Knoll', '1-779-727-8297 x310', 'Eryn_Stokes', '9ma0Y_UBHfNRoM9', '2023-07-03 00:52:50.976+00', '2023-07-03 00:52:50.976+00');


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 211
-- Name: catalogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catalogs_id_seq', 2, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 213
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 215
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 53, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 220
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_sessions_id_seq', 1, false);


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- TOC entry 3213 (class 2606 OID 16400)
-- Name: catalogs catalogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalogs
    ADD CONSTRAINT catalogs_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 16426)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_id, product_id);


--
-- TOC entry 3215 (class 2606 OID 16407)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 16477)
-- Name: product_catalogs product_catalogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_catalogs
    ADD CONSTRAINT product_catalogs_pkey PRIMARY KEY (product_id, catalog_id);


--
-- TOC entry 3217 (class 2606 OID 16421)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 16457)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3225 (class 2606 OID 16462)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 3221 (class 2606 OID 16443)
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 16393)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 16427)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- TOC entry 3230 (class 2606 OID 16432)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3228 (class 2606 OID 16408)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3235 (class 2606 OID 16483)
-- Name: product_catalogs product_catalogs_catalog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_catalogs
    ADD CONSTRAINT product_catalogs_catalog_id_fkey FOREIGN KEY (catalog_id) REFERENCES public.catalogs(id);


--
-- TOC entry 3234 (class 2606 OID 16478)
-- Name: product_catalogs product_catalogs_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_catalogs
    ADD CONSTRAINT product_catalogs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3233 (class 2606 OID 16468)
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3232 (class 2606 OID 16463)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3231 (class 2606 OID 16444)
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-07-02 19:53:25

--
-- PostgreSQL database dump complete
--


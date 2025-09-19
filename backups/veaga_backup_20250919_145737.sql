--
-- PostgreSQL database dump
--

\restrict LW5Zqea8r4ekTLPJlhjZQucVpvSuANWe0ixu4cQmH00GxhHO9mQ5BMiYTdTRtGE

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6 (Homebrew)

-- Started on 2025-09-19 14:57:37 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS veaga;
--
-- TOC entry 3492 (class 1262 OID 16389)
-- Name: veaga; Type: DATABASE; Schema: -; Owner: turbostarter
--

CREATE DATABASE veaga WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE veaga OWNER TO turbostarter;

\unrestrict LW5Zqea8r4ekTLPJlhjZQucVpvSuANWe0ixu4cQmH00GxhHO9mQ5BMiYTdTRtGE
\connect veaga
\restrict LW5Zqea8r4ekTLPJlhjZQucVpvSuANWe0ixu4cQmH00GxhHO9mQ5BMiYTdTRtGE

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16390)
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: turbostarter
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO turbostarter;

--
-- TOC entry 861 (class 1247 OID 16418)
-- Name: plan; Type: TYPE; Schema: public; Owner: turbostarter
--

CREATE TYPE public.plan AS ENUM (
    'FREE',
    'PREMIUM',
    'ENTERPRISE'
);


ALTER TYPE public.plan OWNER TO turbostarter;

--
-- TOC entry 858 (class 1247 OID 16401)
-- Name: status; Type: TYPE; Schema: public; Owner: turbostarter
--

CREATE TYPE public.status AS ENUM (
    'ACTIVE',
    'CANCELED',
    'INCOMPLETE',
    'INCOMPLETE_EXPIRED',
    'PAST_DUE',
    'PAUSED',
    'TRIALING',
    'UNPAID'
);


ALTER TYPE public.status OWNER TO turbostarter;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16392)
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: turbostarter
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO turbostarter;

--
-- TOC entry 218 (class 1259 OID 16391)
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: turbostarter
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO turbostarter;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 218
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: turbostarter
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- TOC entry 220 (class 1259 OID 16425)
-- Name: accounts; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    account_id text NOT NULL,
    provider_id text NOT NULL,
    user_id text NOT NULL,
    access_token text,
    refresh_token text,
    id_token text,
    access_token_expires_at timestamp without time zone,
    refresh_token_expires_at timestamp without time zone,
    scope text,
    password text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.accounts OWNER TO turbostarter;

--
-- TOC entry 224 (class 1259 OID 16457)
-- Name: customers; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.customers (
    user_id text NOT NULL,
    customer_id text NOT NULL,
    status public.status,
    plan public.plan,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.customers OWNER TO turbostarter;

--
-- TOC entry 225 (class 1259 OID 16480)
-- Name: passkeys; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.passkeys (
    id text NOT NULL,
    name text,
    public_key text NOT NULL,
    user_id text NOT NULL,
    credential_i_d text NOT NULL,
    counter integer NOT NULL,
    device_type text NOT NULL,
    backed_up boolean NOT NULL,
    transports text,
    created_at timestamp without time zone,
    aaguid text
);


ALTER TABLE public.passkeys OWNER TO turbostarter;

--
-- TOC entry 221 (class 1259 OID 16432)
-- Name: sessions; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    token text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ip_address text,
    user_agent text,
    user_id text NOT NULL
);


ALTER TABLE public.sessions OWNER TO turbostarter;

--
-- TOC entry 226 (class 1259 OID 16502)
-- Name: two_factors; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.two_factors (
    id text NOT NULL,
    secret text NOT NULL,
    backup_codes text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public.two_factors OWNER TO turbostarter;

--
-- TOC entry 222 (class 1259 OID 16441)
-- Name: users; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    email_verified boolean NOT NULL,
    image text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    is_anonymous boolean,
    two_factor_enabled boolean
);


ALTER TABLE public.users OWNER TO turbostarter;

--
-- TOC entry 223 (class 1259 OID 16450)
-- Name: verifications; Type: TABLE; Schema: public; Owner: turbostarter
--

CREATE TABLE public.verifications (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.verifications OWNER TO turbostarter;

--
-- TOC entry 3306 (class 2604 OID 16395)
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: turbostarter
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- TOC entry 3479 (class 0 OID 16392)
-- Dependencies: 219
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: turbostarter
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	d229c129543b0b19e5fa285602a0d4849b952b9c9db84a1062d9f3f52f083fcf	1736097950478
2	f9f3daeef2e916d88298a348e42178701b6ff362f20443bbb66066ee56eda37d	1745863441120
3	851904e6a37ab578aa81c014aa58cffaa0070d861c997c08062eafa408bde705	1752259599987
\.


--
-- TOC entry 3480 (class 0 OID 16425)
-- Dependencies: 220
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.accounts (id, account_id, provider_id, user_id, access_token, refresh_token, id_token, access_token_expires_at, refresh_token_expires_at, scope, password, created_at, updated_at) FROM stdin;
1WCFX44bOsfb95ILG0jyLYDWk5OoBWsf	1gZago43wfcjWR1XVBye20szISxDxbCm	credential	1gZago43wfcjWR1XVBye20szISxDxbCm	\N	\N	\N	\N	\N	\N	24eb2e7f9204e91e04a3ffe30e842aa1:cad50d164a2df7af4faa6b16aaa669e40e8e081ddf9ae691f77d0aeffc99d0d363f7b41d3baa766ca470488b16d5d484c8fba12a35170913344f3a44011e7fb6	2025-09-19 18:19:03.349	2025-09-19 18:19:03.349
\.


--
-- TOC entry 3484 (class 0 OID 16457)
-- Dependencies: 224
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.customers (user_id, customer_id, status, plan, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3485 (class 0 OID 16480)
-- Dependencies: 225
-- Data for Name: passkeys; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.passkeys (id, name, public_key, user_id, credential_i_d, counter, device_type, backed_up, transports, created_at, aaguid) FROM stdin;
\.


--
-- TOC entry 3481 (class 0 OID 16432)
-- Dependencies: 221
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.sessions (id, expires_at, token, created_at, updated_at, ip_address, user_agent, user_id) FROM stdin;
VLoYcJZOwsvhGEFpFt1YI46A61aX8fvF	2025-09-26 18:19:03.352	iuTKI0pu2zv0hocolllPEQSXBhgw5py7	2025-09-19 18:19:03.352	2025-09-19 18:19:03.352		Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	1gZago43wfcjWR1XVBye20szISxDxbCm
cuBFpWuRv0FReDAdHZO9VrTtVG7xx6BF	2025-09-26 18:24:05.397	nb02D5bUmgy1ZJkISOc1kMa0SN0yCOzD	2025-09-19 18:24:05.397	2025-09-19 18:24:05.397		Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	1gZago43wfcjWR1XVBye20szISxDxbCm
\.


--
-- TOC entry 3486 (class 0 OID 16502)
-- Dependencies: 226
-- Data for Name: two_factors; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.two_factors (id, secret, backup_codes, user_id) FROM stdin;
\.


--
-- TOC entry 3482 (class 0 OID 16441)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.users (id, name, email, email_verified, image, created_at, updated_at, is_anonymous, two_factor_enabled) FROM stdin;
1gZago43wfcjWR1XVBye20szISxDxbCm	pierre.shaun	pierre.shaun@gmail.com	f	\N	2025-09-19 18:19:03.345	2025-09-19 18:19:03.345	\N	f
\.


--
-- TOC entry 3483 (class 0 OID 16450)
-- Dependencies: 223
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: turbostarter
--

COPY public.verifications (id, identifier, value, expires_at, created_at, updated_at) FROM stdin;
Urdn20vVcIWVEn5uwQwKWyYvZqj7lC0R	knhWlZ1HRtGf6MngQvbSGzyd2RbigaUr	{"expectedChallenge":"xcAxVZuZo2tcTogHg1u6w9WFfGuGAePKkMLjIQjqGI4","userData":{"id":""}}	2025-09-19 00:32:48.701	2025-09-19 17:58:19.49	2025-09-19 17:58:19.49
24uJlcTl5fyJ79Tm3XJYKV3gzDicVq78	8BqEnSFklRpUbIi3aI58HbSXKz0q7P6r	{"expectedChallenge":"DGcEXfoLfbBWNWPRChr5ryBB8AUW9PHb7MxLqp99swU","userData":{"id":""}}	2025-09-19 00:32:48.701	2025-09-19 17:58:19.627	2025-09-19 17:58:19.627
z497y2CYX3ZhPhRmpCt9Wvzgeuhnuskt	IXjwb7ZsUKzUOlBtSG76ZOvKRpgJOXCE	{"expectedChallenge":"7te7Wc0xF3HecJkUygxAvXNOTiCnS7LAtBQN5WULspY","userData":{"id":""}}	2025-09-19 18:12:18.539	2025-09-19 18:15:13.108	2025-09-19 18:15:13.108
8sgRzVsPlLCkotUD9o1e0lQGbcJLAAq3	uFjrXzloze6rEli4FNSIFj2vFeQpp9Wb	{"expectedChallenge":"01KpfGMNo6AF1_DGQYsMuTHnKcKna73JsKazxuQniC4","userData":{"id":""}}	2025-09-19 18:12:18.539	2025-09-19 18:15:13.132	2025-09-19 18:15:13.132
3U12lIB1C7dKxKN7P0ZCMTBhdn3Iytuu	1ec0bFmT3o7ipUyUvzZL5QzSFr21S1KQ	{"expectedChallenge":"oaGPWq1x-XGBkW5w7LkNSGwCLcU-GWlUI_F75sTwqY8","userData":{"id":""}}	2025-09-19 18:12:18.539	2025-09-19 18:15:25.615	2025-09-19 18:15:25.615
pK8y0CfPsd9HTaQkHdNMRCpCYgunSjDl	OmiwTSPvDEa7PkdTYjZ7kf3Ursg7iu0I	{"expectedChallenge":"h78iUG86jHq7fqDt9PcUZHXbdK2Aex7bHQeUWSZdbiA","userData":{"id":""}}	2025-09-19 18:12:18.539	2025-09-19 18:15:25.678	2025-09-19 18:15:25.678
FI9XLIJbB9HzqtEdU3ItuW9lIs2v2Nvy	4Y02Ng0b3iKG3kzpZL8qWmWO6Tb16GC1	{"expectedChallenge":"3o8yjWB1GrgYwqsIUUHKrybDsgOWbZxxSsl6OppxMTM","userData":{"id":"YIGSBL4muFOiueg2E8735RaEfXftJZ9s"}}	2025-09-19 18:12:18.539	2025-09-19 18:22:21.123	2025-09-19 18:22:21.123
seriZq2vXcOleQtCJcVmPlAQqwjZszy5	EEkWueWyJIbulh0tDS7ITnX0MCnBeU24	{"expectedChallenge":"Ycw8ZAffgoHghd4HQ99nW-eEl_u_BGbS2kySHT6k9OI","userData":{"id":"YIGSBL4muFOiueg2E8735RaEfXftJZ9s"}}	2025-09-19 18:12:18.539	2025-09-19 18:22:21.275	2025-09-19 18:22:21.275
2m1sFdx7bfx01LYNsjjfQz0N7twW3km2	2f3Kt6BHTnNCESdiE3mfBgUsqNv7bEZT	{"expectedChallenge":"lckuKBBK_SMitEfbMky5i__mU93S-_XerePQ2ldYMx0","userData":{"id":"YIGSBL4muFOiueg2E8735RaEfXftJZ9s"}}	2025-09-19 18:12:18.539	2025-09-19 18:23:52.581	2025-09-19 18:23:52.581
Dd2kKaAcqzY2hfuJTRLxtUu4z3umJnJZ	7TahbaN7WspSRlU5O41hFxTq1gvMR29R	{"expectedChallenge":"9bbP-O71LjihZYnuqZfVbDiCz_Fx6f3_SZ1IKrnwkq0","userData":{"id":"YIGSBL4muFOiueg2E8735RaEfXftJZ9s"}}	2025-09-19 18:12:18.539	2025-09-19 18:23:52.608	2025-09-19 18:23:52.608
\.


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 218
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: turbostarter
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 3, true);


--
-- TOC entry 3309 (class 2606 OID 16399)
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: turbostarter
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3311 (class 2606 OID 16431)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3323 (class 2606 OID 16464)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3325 (class 2606 OID 16486)
-- Name: passkeys passkeys_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.passkeys
    ADD CONSTRAINT passkeys_pkey PRIMARY KEY (id);


--
-- TOC entry 3313 (class 2606 OID 16438)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3315 (class 2606 OID 16440)
-- Name: sessions sessions_token_unique; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_unique UNIQUE (token);


--
-- TOC entry 3327 (class 2606 OID 16508)
-- Name: two_factors two_factors_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.two_factors
    ADD CONSTRAINT two_factors_pkey PRIMARY KEY (id);


--
-- TOC entry 3317 (class 2606 OID 16449)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 3319 (class 2606 OID 16447)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3321 (class 2606 OID 16456)
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- TOC entry 3328 (class 2606 OID 16492)
-- Name: accounts accounts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3330 (class 2606 OID 16475)
-- Name: customers customers_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3331 (class 2606 OID 16487)
-- Name: passkeys passkeys_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.passkeys
    ADD CONSTRAINT passkeys_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3329 (class 2606 OID 16497)
-- Name: sessions sessions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3332 (class 2606 OID 16509)
-- Name: two_factors two_factors_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: turbostarter
--

ALTER TABLE ONLY public.two_factors
    ADD CONSTRAINT two_factors_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-09-19 14:57:37 EDT

--
-- PostgreSQL database dump complete
--

\unrestrict LW5Zqea8r4ekTLPJlhjZQucVpvSuANWe0ixu4cQmH00GxhHO9mQ5BMiYTdTRtGE


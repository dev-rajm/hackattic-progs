--
-- PostgreSQL database dump
--

-- Dumped from database version 10.19 (Debian 10.19-1.pgdg90+1)
-- Dumped by pg_dump version 10.19 (Debian 10.19-1.pgdg90+1)

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
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = true;

--
-- Name: criminal_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.criminal_records (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    felony character varying(30) NOT NULL,
    ssn character varying(11) NOT NULL,
    home_address character varying(100) NOT NULL,
    entry timestamp without time zone NOT NULL,
    city character varying(100) NOT NULL,
    status character varying(16) NOT NULL
);


ALTER TABLE public.criminal_records OWNER TO postgres;

--
-- Name: criminal_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.criminal_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.criminal_records_id_seq OWNER TO postgres;

--
-- Name: criminal_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.criminal_records_id_seq OWNED BY public.criminal_records.id;


--
-- Name: criminal_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.criminal_records ALTER COLUMN id SET DEFAULT nextval('public.criminal_records_id_seq'::regclass);


--
-- Data for Name: criminal_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.criminal_records (id, name, felony, ssn, home_address, entry, city, status) FROM stdin;
1	David Ortiz	Larceny	289-26-6207	USNV Graham	2019-07-30 00:00:00	FPO AA 59539-5794	alive
2	Kimberly Gonzalez	Animal cruelty	569-37-4541	9253 Stephen Inlet	1981-06-07 00:00:00	West Brittany, AL 37763-7353	alive
3	Eric Mooney	Larceny	037-61-5291	6236 Johnson Courts	2004-12-03 00:00:00	Lake Stuart, MT 90809-9618	terminated
4	Melanie Vargas	Tax evasion	360-83-5297	996 Linda Pines Suite 604	2023-12-31 00:00:00	Taylorhaven, MP 07688	alive
5	Jared Roth	Arson	154-10-1047	020 Howard Haven Apt. 263	1971-03-09 00:00:00	South Timothy, IN 88688-6664	terminated
6	Natalie Gonzalez	Arson	111-12-7936	2905 Hughes Mill Apt. 527	1999-10-18 00:00:00	Floreston, NH 74092	alive
7	Natasha Fields	Obstruction of justice	015-40-0347	USNS Klein	2023-05-25 00:00:00	FPO AA 44474	terminated
8	Tracy Pratt	Check fraud	319-67-7842	19813 Hobbs Forest Suite 547	2014-09-10 00:00:00	Ashleyport, OR 89734-8134	alive
9	Kenneth Allen	Larceny	134-54-4335	297 White Mountain	1994-04-04 00:00:00	Robertport, DE 04748	terminated
10	Tina Lutz	Burglary	898-04-3976	Unit 6421 Box 5592	1988-09-17 00:00:00	DPO AA 56641-8153	missing
11	Sarah Fields	Vehicular homicide	299-58-0137	71725 Mario Valleys Apt. 551	1990-07-24 00:00:00	Port Valerie, SC 80289	terminated
12	Carlos Martin	Tax evasion	605-69-7022	61086 Mata Forge	2024-04-14 00:00:00	Cameronfort, SD 98236-1784	missing
13	Ashley Brown	Perjury	413-44-2246	22805 James Parkway Apt. 034	2011-08-28 00:00:00	Lake Victoria, ID 20463-1921	terminated
14	David Jones	Tax evasion	275-46-9919	54483 Peter Courts	1995-11-20 00:00:00	New Tammy, NY 32894-8204	missing
15	Erin Kent	Animal cruelty	738-52-4893	15492 Davis Landing Suite 808	1988-06-14 00:00:00	Ericburgh, WY 06007-1552	missing
16	Cheryl Wilkins	Arson	855-32-5517	6753 Jeffrey Isle Apt. 160	2021-04-15 00:00:00	Lake Reneeton, CO 34310	alive
17	Amanda Murphy	Manslaughter	023-43-1554	555 Moore Motorway	2012-04-28 00:00:00	Tiffanyshire, LA 17814	terminated
18	Amy Barnes	Vehicular homicide	742-50-8421	PSC 4767, Box 3818	2015-02-02 00:00:00	APO AE 78263	missing
19	Zachary Thomas	Vehicular homicide	491-88-2784	450 Stacy Squares Apt. 155	1970-06-14 00:00:00	North Tammy, MA 54514	terminated
20	Michele Montgomery	Manslaughter	336-30-5439	5894 Miller Ridges	2005-07-08 00:00:00	South Lucas, DC 40961	missing
21	Laura Rivers	Vehicular homicide	691-98-3853	20805 Rodriguez Square	2000-09-17 00:00:00	Port Michaelport, NM 87318	alive
22	Sherri Hernandez	Vehicular homicide	043-81-0069	3767 Lauren Orchard	2017-05-01 00:00:00	Kristinhaven, MO 06223-5426	missing
23	Curtis Gallegos	Tax evasion	595-62-7911	302 Robert Cliff Suite 606	2017-05-12 00:00:00	West Felicia, AR 22594	terminated
24	Rebecca Jones	Animal cruelty	481-82-5375	PSC 4069, Box 5607	1976-12-25 00:00:00	APO AP 94249-6843	alive
25	Hannah Duncan	Larceny	829-44-6199	19481 Brandy Unions Suite 445	2015-10-03 00:00:00	Schmidtmouth, LA 38868	missing
26	Linda Camacho	Check fraud	133-31-4509	USS Nelson	2024-08-08 00:00:00	FPO AE 80777-8480	alive
27	Sara Carter	Larceny	824-16-0495	6069 Stewart Trace	2008-05-18 00:00:00	West Devonview, MT 47977-1177	alive
28	Michael Rogers	Arson	879-08-1318	843 Brittany Estate	1973-05-30 00:00:00	East Megan, ND 15399-1695	terminated
29	Rachel Boyer	Animal cruelty	240-45-5535	864 Cruz Canyon	1997-09-12 00:00:00	Davisbury, CA 01569	terminated
30	Judith Rodriguez	Check fraud	521-34-4303	283 Christopher Ways Suite 554	1986-11-23 00:00:00	Haleport, NY 02738	missing
31	Mary Montgomery	Manslaughter	759-50-5782	0414 Gonzales Throughway	2022-04-17 00:00:00	South Jeremy, ME 52062	terminated
32	Daniel Arnold	Manslaughter	678-67-0331	651 Hamilton Lodge	2005-10-31 00:00:00	East Scottshire, KY 39641	terminated
33	Rachel Benson	Larceny	502-98-8222	USS Jordan	2005-07-16 00:00:00	FPO AP 40973-1298	alive
34	April Castro	Burglary	492-24-8676	9393 Baker Haven Apt. 350	1988-11-03 00:00:00	Riveraville, NV 47926-5835	missing
35	Michael Bautista	Check fraud	171-77-3421	8085 Love Extension Apt. 927	2011-06-18 00:00:00	Port Amyburgh, MH 24649-5715	alive
36	Michelle Pearson	Larceny	147-10-1536	7825 Shannon Fort	2011-09-15 00:00:00	West Nicholaston, LA 38261-8165	missing
37	Gloria Coleman	Arson	138-67-7604	29108 Pierce Field	1989-11-02 00:00:00	Robertmouth, CA 75440-0835	terminated
38	Eric Coleman	Burglary	146-60-4323	8495 Lisa Pike	2019-03-12 00:00:00	North Nicole, AS 76007-3470	alive
39	Ronnie Bailey	Tax evasion	002-04-8731	970 Lee Square	2000-03-29 00:00:00	West Stephanie, HI 25996	missing
40	Daniel Obrien	Perjury	405-82-3063	2852 Lisa Mews	2000-03-13 00:00:00	Reevesland, AR 50198	terminated
41	Craig Walker	Burglary	656-27-3195	4565 Singleton Knolls Apt. 201	2006-10-19 00:00:00	Paulamouth, IL 08584	alive
42	Sally Peterson	Obstruction of justice	320-20-5454	7864 Ellison Crossing	1970-08-16 00:00:00	Lake Belinda, VA 23077	alive
43	Christopher Thomas	Perjury	207-11-2247	12002 Judith Knolls Apt. 789	2007-03-23 00:00:00	Butlerstad, FL 03237-1962	terminated
44	Katelyn Mason	Larceny	837-62-2152	1866 Megan Extensions	2018-01-26 00:00:00	Hardyfort, PW 13977	alive
45	Gerald Dennis	Perjury	451-11-0992	494 Harrison Springs	1970-10-17 00:00:00	Reynoldschester, DC 97072	terminated
46	Kimberly Woods	Perjury	195-60-8590	592 Kelly Grove Apt. 230	2012-11-08 00:00:00	South Manuelville, MS 34615	terminated
47	Thomas Conrad	Vehicular homicide	626-41-8716	624 Moses Meadow Suite 479	2020-12-13 00:00:00	South Tiffany, GU 37709	alive
48	James Brooks	Manslaughter	583-89-0988	7566 Page Streets	1982-05-10 00:00:00	Phyllisville, IL 41026-6196	missing
49	Lauren Gallegos	Larceny	030-41-6953	160 Christine Manors	1979-05-20 00:00:00	South Cassandra, IN 10636-4982	alive
50	Grant Daniels	Check fraud	035-42-6805	73375 Ann Parks Suite 906	1998-10-20 00:00:00	Lloydport, NE 90424-2687	terminated
51	Jesus Robinson	Arson	036-87-2436	914 Benson River	1999-02-24 00:00:00	Joshuaburgh, DE 22457	alive
52	Chase Young	Animal cruelty	700-36-3080	551 Galvan Divide Apt. 331	1993-02-07 00:00:00	Caseyhaven, GU 74280-5296	terminated
53	Cassandra Berg	Perjury	348-73-9420	7594 Evans Overpass Apt. 584	2012-08-14 00:00:00	Fergusonborough, DE 84830-5272	missing
54	Billy Daniel	Obstruction of justice	432-87-3056	9170 Montgomery Vista	1982-09-20 00:00:00	Susanfort, LA 68540	missing
55	Joseph French	Check fraud	899-32-9023	USS Hahn	1983-01-07 00:00:00	FPO AP 17613-8674	alive
56	Cameron Cunningham	Check fraud	235-43-9796	73160 Jones Freeway Apt. 626	1991-09-22 00:00:00	Lake Carmenstad, NE 30061-1206	missing
57	Kristen Cantrell	Animal cruelty	065-42-0930	9195 Washington Key	1988-12-22 00:00:00	Stevenbury, IL 38002-0731	alive
58	Christopher Johnson	Check fraud	037-10-1709	62395 Whitney Courts Apt. 392	1981-06-18 00:00:00	Bryanstad, PA 66787	alive
59	Andrew Chavez	Perjury	741-73-8816	6863 Lane Inlet Apt. 640	1989-06-24 00:00:00	Riggsshire, WY 36216	terminated
60	Kristine Ross	Manslaughter	456-05-4324	84350 King Bridge	2014-03-17 00:00:00	Amyborough, LA 35694-4826	alive
61	Kristen Hart	Manslaughter	129-49-7835	68155 Riley Mill	1984-10-02 00:00:00	Duaneshire, FL 21961	missing
62	Andrea Barr	Tax evasion	036-60-4702	Unit 1174 Box 0639	1999-08-31 00:00:00	DPO AP 54326-4220	terminated
63	Jason Richardson	Larceny	475-02-1208	2573 Nicholas Plaza	2018-06-25 00:00:00	West Billybury, AL 47528-2874	alive
64	Amy Adams	Obstruction of justice	397-51-7551	32681 Harrison Causeway Suite 708	1986-10-03 00:00:00	North Paul, WV 18079-0989	missing
65	Mark Fisher	Perjury	238-94-5929	USCGC Williams	2000-08-19 00:00:00	FPO AE 35186	terminated
66	Lori Wright	Perjury	131-68-4455	91380 Wells Trail Suite 233	2013-02-17 00:00:00	Patrickbury, IL 73559	missing
67	Paul Morris	Obstruction of justice	213-83-4158	54268 Park Circle Apt. 457	2014-12-02 00:00:00	Nicolefort, NH 72058	missing
68	Maria White	Vehicular homicide	279-96-5890	56737 Jacob Stravenue	2009-01-22 00:00:00	Fosterborough, AK 01965-6270	alive
69	Ryan Heath	Vehicular homicide	758-12-6346	10375 Woodward Skyway Apt. 483	1972-10-28 00:00:00	East Adam, OK 13894	missing
70	Angela Jones	Animal cruelty	823-35-0387	PSC 7656, Box 4731	1995-01-24 00:00:00	APO AP 78290-3071	terminated
71	Nicholas Vang	Vehicular homicide	310-33-8369	797 Jones Mount Apt. 554	2003-05-17 00:00:00	Port Williamburgh, NM 93101-0562	alive
72	Diane Walker	Animal cruelty	267-58-2646	45114 Daniel Island Suite 458	1999-04-13 00:00:00	North Paige, OR 38949	alive
\.


--
-- Name: criminal_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.criminal_records_id_seq', 72, true);


--
-- Name: criminal_records criminal_records_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.criminal_records
    ADD CONSTRAINT criminal_records_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


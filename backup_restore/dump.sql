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
1	David Ortiz	Animal cruelty	289-26-6207	USNV Graham	2019-07-30 00:00:00	FPO AA 59539-5794	terminated
2	Kimberly Gonzalez	Larceny	569-37-4541	9253 Stephen Inlet	1981-06-07 00:00:00	West Brittany, AL 37763-7353	terminated
3	Eric Mooney	Vehicular homicide	037-61-5291	6236 Johnson Courts	2004-12-03 00:00:00	Lake Stuart, MT 90809-9618	missing
4	Melanie Vargas	Animal cruelty	360-83-5297	996 Linda Pines Suite 604	2023-12-31 00:00:00	Taylorhaven, MP 07688	missing
5	Jared Roth	Larceny	154-10-1047	020 Howard Haven Apt. 263	1971-03-09 00:00:00	South Timothy, IN 88688-6664	alive
6	Natalie Gonzalez	Animal cruelty	111-12-7936	2905 Hughes Mill Apt. 527	1999-10-18 00:00:00	Floreston, NH 74092	missing
7	Natasha Fields	Vehicular homicide	015-40-0347	USNS Klein	2023-05-25 00:00:00	FPO AA 44474	missing
8	Tracy Pratt	Arson	319-67-7842	19813 Hobbs Forest Suite 547	2014-09-10 00:00:00	Ashleyport, OR 89734-8134	alive
9	Kenneth Allen	Tax evasion	134-54-4335	297 White Mountain	1994-04-04 00:00:00	Robertport, DE 04748	missing
10	Tina Lutz	Manslaughter	898-04-3976	Unit 6421 Box 5592	1988-09-17 00:00:00	DPO AA 56641-8153	terminated
11	Sarah Fields	Larceny	299-58-0137	71725 Mario Valleys Apt. 551	1990-07-24 00:00:00	Port Valerie, SC 80289	terminated
12	Carlos Martin	Vehicular homicide	605-69-7022	61086 Mata Forge	2024-04-14 00:00:00	Cameronfort, SD 98236-1784	terminated
13	Ashley Brown	Manslaughter	413-44-2246	22805 James Parkway Apt. 034	2011-08-28 00:00:00	Lake Victoria, ID 20463-1921	alive
14	David Jones	Larceny	275-46-9919	54483 Peter Courts	1995-11-20 00:00:00	New Tammy, NY 32894-8204	terminated
15	Erin Kent	Vehicular homicide	738-52-4893	15492 Davis Landing Suite 808	1988-06-14 00:00:00	Ericburgh, WY 06007-1552	alive
16	Cheryl Wilkins	Vehicular homicide	855-32-5517	6753 Jeffrey Isle Apt. 160	2021-04-15 00:00:00	Lake Reneeton, CO 34310	alive
17	Amanda Murphy	Animal cruelty	023-43-1554	555 Moore Motorway	2012-04-28 00:00:00	Tiffanyshire, LA 17814	terminated
18	Amy Barnes	Perjury	742-50-8421	PSC 4767, Box 3818	2015-02-02 00:00:00	APO AE 78263	alive
19	Zachary Thomas	Arson	491-88-2784	450 Stacy Squares Apt. 155	1970-06-14 00:00:00	North Tammy, MA 54514	terminated
20	Michele Montgomery	Larceny	336-30-5439	5894 Miller Ridges	2005-07-08 00:00:00	South Lucas, DC 40961	alive
21	Laura Rivers	Arson	691-98-3853	20805 Rodriguez Square	2000-09-17 00:00:00	Port Michaelport, NM 87318	terminated
22	Sherri Hernandez	Animal cruelty	043-81-0069	3767 Lauren Orchard	2017-05-01 00:00:00	Kristinhaven, MO 06223-5426	terminated
23	Curtis Gallegos	Check fraud	595-62-7911	302 Robert Cliff Suite 606	2017-05-12 00:00:00	West Felicia, AR 22594	missing
24	Rebecca Jones	Larceny	481-82-5375	PSC 4069, Box 5607	1976-12-25 00:00:00	APO AP 94249-6843	missing
25	Hannah Duncan	Tax evasion	829-44-6199	19481 Brandy Unions Suite 445	2015-10-03 00:00:00	Schmidtmouth, LA 38868	alive
26	Linda Camacho	Perjury	133-31-4509	USS Nelson	2024-08-08 00:00:00	FPO AE 80777-8480	missing
27	Sara Carter	Check fraud	824-16-0495	6069 Stewart Trace	2008-05-18 00:00:00	West Devonview, MT 47977-1177	terminated
28	Michael Rogers	Vehicular homicide	879-08-1318	843 Brittany Estate	1973-05-30 00:00:00	East Megan, ND 15399-1695	terminated
29	Rachel Boyer	Manslaughter	240-45-5535	864 Cruz Canyon	1997-09-12 00:00:00	Davisbury, CA 01569	alive
30	Judith Rodriguez	Arson	521-34-4303	283 Christopher Ways Suite 554	1986-11-23 00:00:00	Haleport, NY 02738	terminated
31	Mary Montgomery	Check fraud	759-50-5782	0414 Gonzales Throughway	2022-04-17 00:00:00	South Jeremy, ME 52062	alive
32	Daniel Arnold	Larceny	678-67-0331	651 Hamilton Lodge	2005-10-31 00:00:00	East Scottshire, KY 39641	missing
33	Rachel Benson	Tax evasion	502-98-8222	USS Jordan	2005-07-16 00:00:00	FPO AP 40973-1298	terminated
34	April Castro	Obstruction of justice	492-24-8676	9393 Baker Haven Apt. 350	1988-11-03 00:00:00	Riveraville, NV 47926-5835	terminated
35	Michael Bautista	Arson	171-77-3421	8085 Love Extension Apt. 927	2011-06-18 00:00:00	Port Amyburgh, MH 24649-5715	terminated
36	Michelle Pearson	Vehicular homicide	147-10-1536	7825 Shannon Fort	2011-09-15 00:00:00	West Nicholaston, LA 38261-8165	terminated
37	Gloria Coleman	Animal cruelty	138-67-7604	29108 Pierce Field	1989-11-02 00:00:00	Robertmouth, CA 75440-0835	alive
38	Eric Coleman	Larceny	146-60-4323	8495 Lisa Pike	2019-03-12 00:00:00	North Nicole, AS 76007-3470	missing
39	Ronnie Bailey	Check fraud	002-04-8731	970 Lee Square	2000-03-29 00:00:00	West Stephanie, HI 25996	alive
40	Daniel Obrien	Vehicular homicide	405-82-3063	2852 Lisa Mews	2000-03-13 00:00:00	Reevesland, AR 50198	terminated
41	Craig Walker	Manslaughter	656-27-3195	4565 Singleton Knolls Apt. 201	2006-10-19 00:00:00	Paulamouth, IL 08584	terminated
42	Sally Peterson	Perjury	320-20-5454	7864 Ellison Crossing	1970-08-16 00:00:00	Lake Belinda, VA 23077	missing
43	Christopher Thomas	Check fraud	207-11-2247	12002 Judith Knolls Apt. 789	2007-03-23 00:00:00	Butlerstad, FL 03237-1962	missing
44	Katelyn Mason	Perjury	837-62-2152	1866 Megan Extensions	2018-01-26 00:00:00	Hardyfort, PW 13977	alive
45	Gerald Dennis	Perjury	451-11-0992	494 Harrison Springs	1970-10-17 00:00:00	Reynoldschester, DC 97072	alive
46	Kimberly Woods	Check fraud	195-60-8590	592 Kelly Grove Apt. 230	2012-11-08 00:00:00	South Manuelville, MS 34615	terminated
47	Thomas Conrad	Tax evasion	626-41-8716	624 Moses Meadow Suite 479	2020-12-13 00:00:00	South Tiffany, GU 37709	terminated
48	James Brooks	Animal cruelty	583-89-0988	7566 Page Streets	1982-05-10 00:00:00	Phyllisville, IL 41026-6196	alive
49	Lauren Gallegos	Arson	030-41-6953	160 Christine Manors	1979-05-20 00:00:00	South Cassandra, IN 10636-4982	missing
50	Grant Daniels	Animal cruelty	035-42-6805	73375 Ann Parks Suite 906	1998-10-20 00:00:00	Lloydport, NE 90424-2687	missing
51	Jesus Robinson	Perjury	036-87-2436	914 Benson River	1999-02-24 00:00:00	Joshuaburgh, DE 22457	terminated
52	Chase Young	Perjury	700-36-3080	551 Galvan Divide Apt. 331	1993-02-07 00:00:00	Caseyhaven, GU 74280-5296	missing
53	Cassandra Berg	Obstruction of justice	348-73-9420	7594 Evans Overpass Apt. 584	2012-08-14 00:00:00	Fergusonborough, DE 84830-5272	terminated
54	Billy Daniel	Perjury	432-87-3056	9170 Montgomery Vista	1982-09-20 00:00:00	Susanfort, LA 68540	terminated
55	Joseph French	Tax evasion	899-32-9023	USS Hahn	1983-01-07 00:00:00	FPO AP 17613-8674	terminated
56	Cameron Cunningham	Arson	235-43-9796	73160 Jones Freeway Apt. 626	1991-09-22 00:00:00	Lake Carmenstad, NE 30061-1206	missing
57	Kristen Cantrell	Burglary	065-42-0930	9195 Washington Key	1988-12-22 00:00:00	Stevenbury, IL 38002-0731	terminated
58	Christopher Johnson	Vehicular homicide	037-10-1709	62395 Whitney Courts Apt. 392	1981-06-18 00:00:00	Bryanstad, PA 66787	alive
59	Andrew Chavez	Burglary	741-73-8816	6863 Lane Inlet Apt. 640	1989-06-24 00:00:00	Riggsshire, WY 36216	terminated
60	Kristine Ross	Perjury	456-05-4324	84350 King Bridge	2014-03-17 00:00:00	Amyborough, LA 35694-4826	alive
61	Kristen Hart	Arson	129-49-7835	68155 Riley Mill	1984-10-02 00:00:00	Duaneshire, FL 21961	alive
62	Andrea Barr	Burglary	036-60-4702	Unit 1174 Box 0639	1999-08-31 00:00:00	DPO AP 54326-4220	missing
63	Jason Richardson	Animal cruelty	475-02-1208	2573 Nicholas Plaza	2018-06-25 00:00:00	West Billybury, AL 47528-2874	missing
64	Amy Adams	Obstruction of justice	397-51-7551	32681 Harrison Causeway Suite 708	1986-10-03 00:00:00	North Paul, WV 18079-0989	terminated
65	Mark Fisher	Animal cruelty	238-94-5929	USCGC Williams	2000-08-19 00:00:00	FPO AE 35186	terminated
66	Lori Wright	Check fraud	131-68-4455	91380 Wells Trail Suite 233	2013-02-17 00:00:00	Patrickbury, IL 73559	terminated
67	Paul Morris	Animal cruelty	213-83-4158	54268 Park Circle Apt. 457	2014-12-02 00:00:00	Nicolefort, NH 72058	alive
68	Maria White	Burglary	279-96-5890	56737 Jacob Stravenue	2009-01-22 00:00:00	Fosterborough, AK 01965-6270	missing
69	Ryan Heath	Check fraud	758-12-6346	10375 Woodward Skyway Apt. 483	1972-10-28 00:00:00	East Adam, OK 13894	terminated
70	Angela Jones	Arson	823-35-0387	PSC 7656, Box 4731	1995-01-24 00:00:00	APO AP 78290-3071	terminated
71	Nicholas Vang	Perjury	310-33-8369	797 Jones Mount Apt. 554	2003-05-17 00:00:00	Port Williamburgh, NM 93101-0562	terminated
72	Diane Walker	Burglary	267-58-2646	45114 Daniel Island Suite 458	1999-04-13 00:00:00	North Paige, OR 38949	alive
73	Timothy Gonzales	Perjury	180-35-2986	USCGC Banks	1992-02-15 00:00:00	FPO AP 05642	missing
74	Michael Bryant	Check fraud	259-18-4167	78799 Mcfarland Field	2001-11-16 00:00:00	Michaelmouth, AR 35743-3535	terminated
75	Christine Huff	Perjury	502-99-6919	USCGC Bonilla	1981-09-03 00:00:00	FPO AP 24849-8861	terminated
76	Allen Erickson	Manslaughter	400-16-6903	PSC 7552, Box 4666	1971-05-13 00:00:00	APO AP 49412-8188	alive
77	Danny Daniels	Burglary	502-92-9355	143 Garcia Lane	1995-06-05 00:00:00	Port Brandon, IN 98551	terminated
78	Jessica Dixon	Burglary	067-93-0667	6535 Andrews Island	1973-02-01 00:00:00	Lake Johnnymouth, NE 98589	missing
79	Catherine Ramirez	Tax evasion	118-20-9464	162 Victor Rue Suite 005	2009-03-22 00:00:00	North Nicole, KS 99302	missing
80	Ian Wright	Arson	416-66-6531	084 Clark Squares	1990-07-30 00:00:00	Carolchester, WA 63738-5532	terminated
81	Tiffany Butler	Tax evasion	592-33-7040	979 Melissa Burgs Suite 839	2000-10-28 00:00:00	Kramertown, MH 15860	terminated
82	Christopher Church DVM	Manslaughter	732-79-4653	444 Lisa Station Apt. 192	1973-02-15 00:00:00	Bishopbury, WY 87019	alive
83	Stephen Koch	Check fraud	760-54-1044	5781 Tammy Fall Suite 794	1981-07-29 00:00:00	Matthewfort, VT 81270	missing
84	Evelyn Barrett	Check fraud	099-60-9985	7312 Ronald Lane	1972-07-15 00:00:00	Lake Melissahaven, AZ 28102-0628	alive
85	James Martin	Perjury	254-04-0779	6791 Kent Union Apt. 576	2004-09-22 00:00:00	Adamsburgh, VT 30182	terminated
\.


--
-- Name: criminal_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.criminal_records_id_seq', 85, true);


--
-- Name: criminal_records criminal_records_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.criminal_records
    ADD CONSTRAINT criminal_records_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


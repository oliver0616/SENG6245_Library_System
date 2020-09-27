--
-- PostgreSQL database dump
--
-- Database name: libraryDB

SET statement_timeout
= 0;
SET lock_timeout
= 0;
SET idle_in_transaction_session_timeout
= 0;
SET client_encoding
= 'UTF8';
SET standard_conforming_strings
= on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies
= false;
SET client_min_messages
= warning;
SET row_security
= off;

SET default_tablespace
= '';

SET default_with_oids
= false;

---------------------------------------------------------------------------------------------------------------------------------

--
-- Name: Topic; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."Role"
(
    roleid integer NOT NULL,
    roleName text NOT NULL
);

ALTER TABLE public."Role" OWNER TO admin;

--
-- Name: User_userid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."User_userid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."User_userid_seq" OWNER TO admin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."User"
(
    userid bigint DEFAULT nextval('public."User_userid_seq"'::regclass) NOT NULL,
    displayName text NOT NULL,
    email character varying(128) NOT NULL,
    password character varying(128),
    roleid integer NOT NULL
);

ALTER TABLE public."User" OWNER TO admin;

--
-- Name: Book_bookid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Book_bookid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."Book_bookid_seq" OWNER TO admin;

--
-- Name: Book; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."Book"
(
    bookid bigint DEFAULT nextval('public."Book_bookid_seq"'::regclass) NOT NULL,
    name text NOT NULL,
    keywords text NOT NULL,
    timestamp bigint NOT NULL,
    author text NOT NULL,
    bookMetadata text
);

ALTER TABLE public."Book" OWNER TO admin;

--
-- Name: UserBookHistory; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."UserBookHistory"
(
    userid bigint NOT NULL,
    bookid bigint NOT NULL,
    timestamp integer NOT NULL
);

ALTER TABLE public."UserBookHistory" OWNER TO admin;

--
-- Name: UserLikedHistory; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."UserLikedHistory"
(
    userid bigint NOT NULL,
    bookid bigint NOT NULL,
    timestamp integer NOT NULL
);

ALTER TABLE public."UserLikedHistory" OWNER TO admin;

--
-- Name: IssueForm_issueid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."IssueForm_issueid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."IssueForm_issueid_seq" OWNER TO admin;

--
-- Name: IssueForm; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."IssueForm"
(
    issueid bigint DEFAULT nextval('public."IssueForm_issueid_seq"'::regclass) NOT NULL,
    userid bigint NOT NULL,
    description text NOT NULL,
    keywords text NOT NULL,
    priority integer
);

ALTER TABLE public."IssueForm" OWNER TO admin;

--
-- Name: Comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Comment_commentid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."Comment_commentid_seq" OWNER TO admin;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: admin
--
CREATE TABLE public."Comment"
(
    commentid bigint DEFAULT nextval('public."Comment_commentid_seq"'::regclass) NOT NULL,
    bookid bigint NOT NULL,
    userid bigint NOT NULL,
    timestamp integer NOT NULL,
    comemntText text NOT NULL
);

ALTER TABLE public."Comment" OWNER TO admin;

---------------------------------------------------------------------------------------------------------------------------------

--
--Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: admin
--
    INSERT INTO public."Role"
    VALUES
        (0,'user');
    INSERT INTO public."Role"
    VALUES
        (1,'librarian');
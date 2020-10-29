
-- Books
INSERT INTO public."Book"
    VALUES
        (0,'Bible','bible,christian',1604007794,'douay rheims','{}','The Bible is the holy scripture of the Christian religion, purporting to tell the history of the Earth from its earliest creation to the spread of Christianity in the first century A.D. Both the Old Testament and the New Testament have undergone changes over the centuries, including the the publication of the King James Bible in 1611 and the addition of several books that were discovered later.');
INSERT INTO public."Book"
    VALUES
        (1,'Romeo and Juliet','Shakespeare,tragedy',1604007794,'William Shakespeare','{}','Romeo and Juliet is a tragedy written by William Shakespeare early in his career about two young star-crossed lovers whose deaths ultimately reconcile their feuding families. It was among Shakespeares most popular plays during his lifetime and, along with Hamlet, is one of his most frequently performed plays.');
INSERT INTO public."Book"
    VALUES
        (2,'Hamlet','Shakespeare,tragedy',1604007794,'William Shakespeare','{}','The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601. It is Shakespeares longest play with 30,557 words');
INSERT INTO public."Book"
    VALUES
        (3,'Julius Caesar','Shakespeare,roman',1604008186,'William Shakespeare','{}','The Tragedy of Julius Caesar is a history play and tragedy by William Shakespeare first performed in 1599. It is one of four plays written by Shakespeare based on true events from Roman history, the others being Coriolanus, Titus Andronicus, and Antony and Cleopatra');
INSERT INTO public."Book"
    VALUES
        (4,'1984','Shakespeare,big brother,government',1604008186,'George Orwell','{}','Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwells ninth and final book completed in his lifetime');


-- Admin
INSERT INTO public."User" VALUES (0, 'admin', 'admin@admin.com','$2a$10$hoi22pp3KGEBNNW1Xf3FbOaXSndDYgSasPRP/MBEHDDVbx5irOIzS',1);
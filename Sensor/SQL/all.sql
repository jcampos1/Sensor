INSERT INTO role  ( idrl , name )VALUES (1, 'ROLE_USER');
INSERT INTO role  ( idrl , name )VALUES (2, 'ROLE_ADMIN');

INSERT INTO mae1001  ( idus,active,atmt,crte_date,date_acti,frst_name,lang,last_name,phone,user_bloq,user_dltd,user_mail,user_pass,valk) VALUES (1, 1, 0, '2016-11-11 14:03:00', '2016-11-11 14:03:00', 'Eduardo', 0, 'Urra', '4128935204', 0, 0, 'junior.uc.91@hotmail.com', '6b5843ce9d2d0599c3e3ce6d59c1551f', 'rozpMYhQoCuTOBDWlGOERPGiGnULFM');

INSERT INTO rel1001 ( idus, idrl) VALUES (1, 2); 

INSERT INTO mae1016( idco, dsca, number ) VALUES ( 1, "Proagro C.A.", 100);

INSERT INTO micro( idmi, active, baud, bits_char, bits_stop, port_dsca, port_name, prty, tout_read ) VALUES ( 1, 1, 9600, 8, 1, "Puerto Serial COM8", "COM8", 0, 1000);

INSERT INTO par1001 ( idpa, active, cddp, dsca,fech, lastor, lastse, seri,user_idus, pescon, rep_te, company_idco) VALUES (1, 1, "OP", "Una descripción", '2016-11-11 14:03:00',null,null, "54", 1, 1, 0, 1);

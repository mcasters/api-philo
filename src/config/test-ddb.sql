INSERT INTO author (id, firstname, lastname, date_of_birth, date_of_death) VALUES (1 , 'David', 'Hume', '1711-01-01', '1776-01-01');
INSERT INTO author (id, firstname, lastname, date_of_birth, date_of_death) VALUES (2 , 'Emmanuel', 'Kant', '1724-06-28', '1804-07-02');
INSERT INTO author (id, firstname, lastname, date_of_birth, date_of_death) VALUES (3 , 'Jean-Jacques', 'Rousseau', '1712-01-01', '1778-01-01');

INSERT INTO `work` (id, title, `year`, authorid) VALUES (1 , 'Critique de la raison pure', '1781', 2);
INSERT INTO `work` (id, title, `year`, authorid) VALUES (2 , 'Traité de la Nature humaine', '1740', 1);
INSERT INTO `work` (id, title, `year`, authorid) VALUES (3 , 'Critique de la raison pratique', '1788', 2);
INSERT INTO `work` (id, title, `year`, authorid) VALUES (4 , 'Dissertation sur les passions', '1759', 1);
INSERT INTO `work` (id, title, `year`, authorid) VALUES (5 , 'Du contrat social', '1762', 3);
INSERT INTO `work` (id, title, `year`, authorid) VALUES (6 , 'Emile', '1762', 3);

INSERT INTO school (id, title) VALUES (1 , 'Romantisme');
INSERT INTO school (id, title) VALUES (2 , 'Empirisme');
INSERT INTO school (id, title) VALUES (3 , 'Idéalisme allemand');

INSERT INTO author_schools (authorid, schoolid) VALUES (1, 2);
INSERT INTO author_schools (authorid, schoolid) VALUES (2, 3);
INSERT INTO author_schools (authorid, schoolid) VALUES (3, 1);

INSERT INTO notableidea (id, title, authorid) VALUES (1, 'Etat de nature', 3);
INSERT INTO notableidea (id, title, authorid) VALUES (2, 'Contrat social', 3);
INSERT INTO notableidea (id, title, authorid) VALUES (3, 'Jugement synthétique à priori', 2);
INSERT INTO notableidea (id, title, authorid) VALUES (4, 'Induction', 1);
INSERT INTO notableidea (id, title, authorid) VALUES (5, 'Loi du Hume', 1);
INSERT INTO notableidea (id, title, authorid) VALUES (6, 'Impératif catégorique', 2);

INSERT INTO readingsheet (id, html_text, `date`, workid) VALUES (1, "Fiche de lecture L'espace n'est rien d'autre que la forme de tous les phénomènes des sens extérieurs, c'est à dire la condition subjective de la sensibilité", '2019-11-21', 1);
INSERT INTO readingsheet (id, html_text, `date`, workid) VALUES (2, "Fiche de lecture Le souverain, par cela seul qu'il est, est toujours tout ce qu'il doit être Il y a souvent bien de la différence entre la volonté de tous et la volonté générale", '2020-01-19', 5);

INSERT INTO quote (id, text, part, readingsheetid) VALUES (1, "L'espace n'est rien d'autre que la forme de tous les phénomènes des sens extérieurs, c'est à dire la condition subjective de la sensibilité", "L'ethique transcendantale", 1);
INSERT INTO quote (id, text, part, readingsheetid) VALUES (2, "Le souverain, par cela seul qu'il est, est toujours tout ce qu'il doit être", "Livre I", 2);
INSERT INTO quote (id, text, part, readingsheetid) VALUES (3, "Il y a souvent bien de la différence entre la volonté de tous et la volonté générale", '', 2);


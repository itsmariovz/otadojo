-- =============================================================
-- OtaDojo - Seed de Datos Profesional
-- Base de datos: animequiz_db
-- 14 quizzes · 140 preguntas · 3 categorías · 3 niveles
-- Puntos: Fácil=100 · Medio=200 · Difícil=300 por pregunta
-- =============================================================
-- Ejecutar con: mysql -u root animequiz_db < seed.sql
-- =============================================================

-- Añadir columna categoria si no existe
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS categoria VARCHAR(50) NOT NULL DEFAULT 'anime-clasico';

-- =============================================
-- CATEGORÍA: ANIME CLÁSICO
-- =============================================

-- Quiz 1: Dragon Ball Z (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Dragon Ball Z', 'Pon a prueba tus conocimientos sobre el legendario anime de Akira Toriyama. Guerreros Saiyajin, Esferas del Dragón y batallas épicas te esperan.', 'facil', 'anime-clasico');
SET @dbz = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@dbz, '¿Cuántas Esferas del Dragón existen en la Tierra?', 'Cinco', 'Siete', 'Nueve', 'Doce', 'b', 100),
(@dbz, '¿Cuál es el nombre real de Goku?', 'Bardock', 'Kakarroto', 'Raditz', 'Turles', 'b', 100),
(@dbz, '¿Cuál es la técnica más famosa de Goku?', 'Hakai', 'Final Flash', 'Galick Gun', 'Kamehameha', 'd', 100),
(@dbz, '¿Quién fue el maestro de Goku durante su infancia?', 'Piccolo', 'Maestro Roshi', 'Kaio del Norte', 'Dende', 'b', 100),
(@dbz, '¿Cómo se llama el hijo mayor de Goku?', 'Goten', 'Trunks', 'Gohan', 'Pan', 'c', 100),
(@dbz, '¿Cuál es el nombre del Dragón eterno que concede deseos?', 'Porunga', 'Shenlong', 'Zalama', 'Toronbo', 'b', 100),
(@dbz, '¿Cómo se llama el mejor amigo de Goku?', 'Yamcha', 'Tenshinhan', 'Krillin', 'Piccolo', 'c', 100),
(@dbz, '¿En qué planeta nació Goku?', 'Tierra', 'Namekkusei', 'Planeta Vegeta', 'Planeta M2', 'c', 100),
(@dbz, '¿Cómo se llama el hijo de Vegeta y Bulma?', 'Goten', 'Bra', 'Trunks', 'Pan', 'c', 100),
(@dbz, '¿Cuál fue el primer gran villano de Dragon Ball Z?', 'Cell', 'Freezer', 'Raditz', 'Buu', 'c', 100);

-- Quiz 2: Naruto (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Naruto', 'Demuestra cuánto sabes del ninja de la Aldea de la Hoja. Jutsus, clanes y el sueño de convertirse en Hokage te ponen a prueba.', 'facil', 'anime-clasico');
SET @naruto = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@naruto, '¿Cuál es el apellido de Naruto?', 'Uchiha', 'Uzumaki', 'Hyuga', 'Nara', 'b', 100),
(@naruto, '¿Qué bestia de cola está sellada dentro de Naruto?', 'Shukaku (una cola)', 'Matatabi (dos colas)', 'Kurama (nueve colas)', 'Son Goku (cuatro colas)', 'c', 100),
(@naruto, '¿Cuál es la técnica más famosa de Naruto?', 'Chidori', 'Rasengan', 'Amaterasu', 'Tsukuyomi', 'b', 100),
(@naruto, '¿Cómo se llama el equipo de Naruto, Sasuke y Sakura?', 'Equipo 8', 'Equipo 10', 'Equipo 7', 'Equipo Gai', 'c', 100),
(@naruto, '¿Quién fue el Cuarto Hokage y padre de Naruto?', 'Hiruzen Sarutobi', 'Minato Namikaze', 'Tobirama Senju', 'Hashirama Senju', 'b', 100),
(@naruto, '¿Cuál es el sueño de Naruto?', 'Ser el mejor espadachín', 'Destruir Konoha', 'Convertirse en Hokage', 'Encontrar al Uchiha perdido', 'c', 100),
(@naruto, '¿Cómo se llama el sensei del Equipo 7?', 'Maito Guy', 'Asuma Sarutobi', 'Kurenai Yuhi', 'Kakashi Hatake', 'd', 100),
(@naruto, '¿Cuál es el nombre del clan de Sasuke?', 'Uzumaki', 'Hyuga', 'Uchiha', 'Senju', 'c', 100),
(@naruto, '¿Qué rango ninja tiene Naruto al inicio de la serie?', 'Chunin', 'Jonin', 'Genin', 'ANBU', 'c', 100),
(@naruto, '¿Quién enseñó el Rasengan a Naruto?', 'Kakashi Hatake', 'Jiraiya', 'Tsunade', 'Minato', 'b', 100);

-- Quiz 3: One Piece (Medio)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('One Piece', '¿Eres digno de ser parte de la tripulación Sombrero de Paja? Pon a prueba tus conocimientos sobre piratas, Frutas del Diablo y el Gran Line.', 'medio', 'anime-clasico');
SET @op = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@op, '¿Cuál es el nombre completo del protagonista de One Piece?', 'Portgas D. Luffy', 'Monkey D. Luffy', 'Gold D. Luffy', 'Dragon D. Luffy', 'b', 200),
(@op, '¿Qué Fruta del Diablo comió Luffy?', 'Mera Mera no Mi', 'Hana Hana no Mi', 'Gomu Gomu no Mi', 'Ope Ope no Mi', 'c', 200),
(@op, '¿Quién fue el Rey de los Piratas que encontró el One Piece?', 'Whitebeard', 'Shanks', 'Gol D. Roger', 'Monkey D. Dragon', 'c', 200),
(@op, '¿Cómo se llama el cocinero de la tripulación Sombrero de Paja?', 'Usopp', 'Franky', 'Brook', 'Sanji', 'd', 200),
(@op, '¿Cuántas espadas usa Zoro en su estilo definitivo (Santoryu)?', 'Una', 'Dos', 'Tres', 'Cuatro', 'c', 200),
(@op, '¿Cómo se llama el barco actual de la tripulación Sombrero de Paja?', 'Going Merry', 'Oro Jackson', 'Red Force', 'Thousand Sunny', 'd', 200),
(@op, '¿Quién es el hermano adoptivo de Luffy conocido como "As de Espadas"?', 'Sabo', 'Shanks', 'Marco', 'Portgas D. Ace', 'd', 200),
(@op, '¿Cuál es el Haki que permite golpear a usuarios de Frutas del Diablo?', 'Haki de la Observación', 'Haki del Color del Armamento', 'Haki del Color del Rey', 'Haki del Conocimiento', 'b', 200),
(@op, '¿Quién es el médico de la tripulación Sombrero de Paja?', 'Robin', 'Nami', 'Usopp', 'Tony Tony Chopper', 'd', 200),
(@op, '¿En qué mar comienza la aventura de Luffy?', 'Grand Line', 'New World', 'East Blue', 'North Blue', 'c', 200);

-- Quiz 4: Bleach (Difícil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Bleach', 'Solo los verdaderos fans del anime de Tite Kubo superarán este reto. Zanpakutos, Bankais y los secretos de la Sociedad de Almas te esperan.', 'dificil', 'anime-clasico');
SET @bleach = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@bleach, '¿Cuál es el nombre de la Zanpakuto de Ichigo Kurosaki?', 'Senbonzakura', 'Zangetsu', 'Ryujin Jakka', 'Wabisuke', 'b', 300),
(@bleach, '¿Cuál es el número de Espada de Ulquiorra Cifer?', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'b', 300),
(@bleach, '¿Cómo se llama el Bankai de Byakuya Kuchiki?', 'Daiguren Hyorinmaru', 'Senbonzakura Kageyoshi', 'Kamishini no Yari', 'Kinshara Butohdan', 'b', 300),
(@bleach, '¿Quién es el antagonista principal de la saga Thousand Year Blood War?', 'Sosuke Aizen', 'Grimmjow Jaegerjaquez', 'Yhwach', 'Gremmy Thoumeaux', 'c', 300),
(@bleach, '¿Cómo se llama el ejército de Quincys de Yhwach?', 'Gotei 13', 'Sternritter', 'Vandenreich', 'Espada', 'c', 300),
(@bleach, '¿Qué Aspect of Death representa Ulquiorra Cifer?', 'Despair (Desesperación)', 'Greed (Codicia)', 'Nothingness (La Nada)', 'Loneliness (Soledad)', 'c', 300),
(@bleach, '¿Cuál es el número del Hado más destructivo mostrado en la serie?', '63 - Raikouhou', '88 - Hiryugekizokushintenraiho', '90 - Kurohitsugi', '99 - Itto Kaso', 'c', 300),
(@bleach, '¿Qué técnica usa Aizen para controlar los sentidos de sus enemigos?', 'Sokyoku', 'Kyoka Suigetsu', 'Kurohitsugi', 'Fragor', 'b', 300),
(@bleach, '¿Cuál es la forma más poderosa de un Hollow antes de convertirse en Arrancar?', 'Adjuchas', 'Gillian', 'Vasto Lorde', 'Menos Grande', 'c', 300),
(@bleach, '¿Quién entrenó a Ichigo para que lograra el Bankai en solo 3 días?', 'Yoruichi Shihoin', 'Kisuke Urahara', 'Tessai Tsukabishi', 'Genryusai Yamamoto', 'b', 300);

-- Quiz 5: Saint Seiya (Difícil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Saint Seiya - Caballeros del Zodiaco', 'El Cosmo arde en este desafiante quiz sobre los caballeros que protegen a Atenea. ¿Conoces cada armadura, técnica y saga?', 'dificil', 'anime-clasico');
SET @seiya = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@seiya, '¿Cuántas armaduras Doradas existen en Saint Seiya?', 'Diez', 'Doce', 'Trece', 'Ochenta y ocho', 'b', 300),
(@seiya, '¿A qué diosa protegen los Caballeros del Zodiaco?', 'Artemisa', 'Afrodita', 'Atenea', 'Hera', 'c', 300),
(@seiya, '¿Cómo se llama el Caballero de Oro de Sagitario?', 'Aldebaran de Tauro', 'Saga de Géminis', 'Aiolia de Leo', 'Aiolos de Sagitario', 'd', 300),
(@seiya, '¿Cuál es el nivel de Cosmo que alcanzan los Caballeros Dorados?', 'Quinto Sentido', 'Sexto Sentido', 'Séptimo Sentido', 'Octavo Sentido', 'c', 300),
(@seiya, '¿Quién es el verdadero antagonista de la Saga del Santuario?', 'Shura de Capricornio', 'Poseidón', 'Saga de Géminis', 'Hades', 'c', 300),
(@seiya, '¿Cuántos Caballeros de Bronce protagonizan la serie?', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'c', 300),
(@seiya, '¿Cuál es la técnica más famosa de Seiya de Pegaso?', 'Exclamación de Atenea', 'Dragon Fist', 'Nebula Storm', 'Meteoro de Pegaso', 'd', 300),
(@seiya, '¿En qué país se encuentra el Gran Santuario de Atenea?', 'Japón', 'Italia', 'Grecia', 'Egipto', 'c', 300),
(@seiya, '¿Qué Caballero de Bronce porta la armadura del Dragón?', 'Seiya', 'Shiryu', 'Ikki', 'Hyoga', 'b', 300),
(@seiya, '¿Cuántas Casas debe atravesar el protagonista en la Saga del Santuario?', 'Siete', 'Diez', 'Doce', 'Trece', 'c', 300);

-- =============================================
-- CATEGORÍA: ANIME MODERNO
-- =============================================

-- Quiz 6: Attack on Titan (Medio)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Attack on Titan', '¿Puedes sobrevivir al quiz sobre el anime más impactante de la última década? Titanes, murallas y traiciones ponen a prueba tu memoria.', 'medio', 'anime-moderno');
SET @aot = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@aot, '¿Cómo se llama el protagonista de Attack on Titan?', 'Armin Arlert', 'Levi Ackerman', 'Eren Yeager', 'Reiner Braun', 'c', 200),
(@aot, '¿Cuántas murallas protegen a la humanidad dentro de las paredes?', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'b', 200),
(@aot, '¿Cómo se llama el sistema de movilidad que usan los soldados?', 'Sistema de Vuelo ODM', 'Sistema de Lanzas de Trueno', 'Equipo de Maniobras en 3 Dimensiones', 'Sistema Ackerman', 'c', 200),
(@aot, '¿De qué nación son originarios Reiner, Bertholdt y Annie?', 'Eldia', 'Marley', 'Hizuru', 'Liberio', 'b', 200),
(@aot, '¿Quién es el soldado considerado el más fuerte de la humanidad?', 'Erwin Smith', 'Mikasa Ackerman', 'Hange Zoë', 'Levi Ackerman', 'd', 200),
(@aot, '¿Cómo se llama el cuerpo de soldados que explora más allá de las murallas?', 'Policía Militar', 'Guarnición', 'Cuerpo de Exploración', 'Guardia Real', 'c', 200),
(@aot, '¿Qué evento catastrófico planea Eren para proteger a los Eldios?', 'La Gran Purga', 'El Aplastamiento', 'El Estruendo (The Rumbling)', 'El Ataque Final', 'c', 200),
(@aot, '¿Cómo se llama la isla donde viven los protagonistas?', 'Marley', 'Hizuru', 'Liberio', 'Paradis', 'd', 200),
(@aot, '¿Cuál es el nombre de la muralla exterior (la primera en caer)?', 'Sina', 'Rosa', 'María', 'Paradis', 'c', 200),
(@aot, '¿Qué Titán Poderoso posee el "Poder del Titán Fundador"?', 'Historia Reiss', 'Zeke Yeager', 'Eren Yeager', 'Rod Reiss', 'c', 200);

-- Quiz 7: Demon Slayer - Kimetsu no Yaiba (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Demon Slayer - Kimetsu no Yaiba', 'Acompaña a Tanjiro en su aventura para curar a su hermana y derrotar a los demonios. Un quiz accesible para todos los seguidores del anime.', 'facil', 'anime-moderno');
SET @ds = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@ds, '¿Cómo se llama el protagonista de Demon Slayer?', 'Zenitsu Agatsuma', 'Inosuke Hashibira', 'Tanjiro Kamado', 'Genya Shinazugawa', 'c', 100),
(@ds, '¿Por qué Tanjiro se convierte en cazador de demonios?', 'Por fama y gloria', 'Para vengar a su familia y curar a su hermana Nezuko', 'Por dinero', 'Por orden del gobierno', 'b', 100),
(@ds, '¿Cuál es el nombre de la hermana de Tanjiro convertida en demonio?', 'Kanao', 'Aoi', 'Shinobu', 'Nezuko', 'd', 100),
(@ds, '¿Quién es el creador y padre de todos los demonios?', 'Kokushibo', 'Akaza', 'Doma', 'Muzan Kibutsuji', 'd', 100),
(@ds, '¿Cuál es el estilo de respiración principal que usa Tanjiro?', 'Respiración del Relámpago', 'Respiración de la Llama', 'Respiración del Agua', 'Respiración de la Bestia', 'c', 100),
(@ds, '¿Cómo se llama el compañero de Tanjiro que se queda dormido durante el combate?', 'Inosuke', 'Genya', 'Tengen', 'Zenitsu', 'd', 100),
(@ds, '¿Cuántas Lunas Superiores tiene el ejército de demonios de Muzan?', 'Tres', 'Seis', 'Nueve', 'Doce', 'b', 100),
(@ds, '¿Cómo se llaman las espadas especiales que usan los cazadores de demonios?', 'Espadas de Plata', 'Espadas Celestiales', 'Espadas Nichirin', 'Espadas del Sol', 'c', 100),
(@ds, '¿Quién es el Hashira del Agua que encuentra a Tanjiro al inicio?', 'Rengoku Kyojuro', 'Tengen Uzui', 'Sanemi Shinazugawa', 'Giyu Tomioka', 'd', 100),
(@ds, '¿Qué hace especial a Nezuko entre todos los demonios?', 'Tiene poderes de fuego únicos', 'Puede caminar bajo el sol sin quemarse', 'Habla perfectamente con humanos', 'No necesita sangre humana para vivir y puede caminar al sol', 'd', 100);

-- Quiz 8: Jujutsu Kaisen (Medio)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Jujutsu Kaisen', '¿Conoces el mundo de los hechiceros y las maldiciones de Gege Akutami? Energía Maldita, Dominios Expandidos y poderosos Espíritus te desafían.', 'medio', 'anime-moderno');
SET @jjk = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@jjk, '¿Cómo se llama el protagonista de Jujutsu Kaisen?', 'Megumi Fushiguro', 'Nobara Kugisaki', 'Yuta Okkotsu', 'Yuji Itadori', 'd', 200),
(@jjk, '¿Qué Rey de las Maldiciones está sellado dentro de Yuji Itadori?', 'Mahito', 'Jogo', 'Hanami', 'Ryomen Sukuna', 'd', 200),
(@jjk, '¿Cuántos dedos de Sukuna existen en total?', 'Diez', 'Quince', 'Veinte', 'Veinticuatro', 'c', 200),
(@jjk, '¿Qué grado de hechicero es Gojo Satoru?', 'Grado 1', 'Semi-Grado 1', 'Grado Especial', 'Grado 2', 'c', 200),
(@jjk, '¿Cómo se llama la técnica característica de Gojo que lo hace casi invencible?', 'Cuerpo de Piedra', 'Infinito (Infinity)', 'Dominación Absoluta', 'Vacío Eterno', 'b', 200),
(@jjk, '¿Cuál es el tipo de energía que usan los hechiceros de maldición?', 'Chakra', 'Cosmo', 'Energía Maldita (Cursed Energy)', 'Reiatsu', 'c', 200),
(@jjk, '¿Cómo se llama la técnica de Megumi que invoca criaturas divinas con sombras?', 'Técnica de los Diez Tipos de Sombras', 'Ojos de Serpiente', 'Sello de las Bestias', 'Arte Ancestral de Sombras', 'a', 200),
(@jjk, '¿Cuál es el nombre de la institución donde estudia Yuji Itadori?', 'Escuela de Kyoto de Hechicería', 'Universidad de Maldiciones de Japón', 'Escuela Técnica Metropolitana de Hechicería de Tokyo', 'Academia de Hechiceros Jujutsu', 'c', 200),
(@jjk, '¿Qué nombre recibe el territorio que los hechiceros pueden expandir para maximizar sus técnicas?', 'Barrera Maldita', 'Dominio Expandido (Domain Expansion)', 'Espacio Sagrado', 'Campo de Resonancia', 'b', 200),
(@jjk, '¿Quién es el verdadero antagonista detrás de muchos eventos en la serie, que habita el cuerpo de Geto?', 'Sukuna', 'Mahito', 'Kenjaku', 'Choso', 'c', 200);

-- Quiz 9: My Hero Academia (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('My Hero Academia', 'El mundo de los héroes y los Quirks te pone a prueba. ¿Sabes todo sobre Deku, All Might y UA Academy? ¡Demuestra que eres un pro-héroe!', 'facil', 'anime-moderno');
SET @mha = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@mha, '¿Cómo se llama el protagonista de My Hero Academia?', 'Katsuki Bakugo', 'Shoto Todoroki', 'Tenya Iida', 'Izuku Midoriya', 'd', 100),
(@mha, '¿Cómo se llama el superpoder de una persona en este universo?', 'Habilidad Especial', 'Quirk', 'Stand', 'Cosmo', 'b', 100),
(@mha, '¿Quién es el mejor héroe del mundo y mentor de Deku?', 'Endeavor', 'Hawks', 'Gran Torino', 'All Might', 'd', 100),
(@mha, '¿Cuál es el nombre del Quirk que hereda Izuku de All Might?', 'Explosión', 'Half-Cold Half-Hot', 'Zero Gravity', 'One For All', 'd', 100),
(@mha, '¿Cuál es el nombre del villano más poderoso de la serie?', 'Dabi', 'Tomura Shigaraki', 'Overhaul', 'All For One', 'd', 100),
(@mha, '¿Cómo se llama la escuela de héroes donde estudia Deku?', 'Shiketsu', 'Ketsubutsu', 'Seiai Academy', 'UA High School', 'd', 100),
(@mha, '¿Cuál es el Quirk de Katsuki Bakugo?', 'Rayo', 'Fuego', 'Chispa Eléctrica', 'Explosión', 'd', 100),
(@mha, '¿Cuántos usuarios anteriores de One For All existen antes de Deku?', 'Cinco', 'Seis', 'Ocho', 'Nueve', 'c', 100),
(@mha, '¿Cuál es el apodo de Izuku Midoriya?', 'Kacchan', 'Deku', 'Shouto', 'Ingenium', 'b', 100),
(@mha, '¿Qué tipo de Quirk tiene Shoto Todoroki?', 'Control del tiempo', 'Fuego y Hielo (Half-Cold Half-Hot)', 'Solo hielo', 'Teletransportación', 'b', 100);

-- Quiz 10: SPY x FAMILY (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('SPY x FAMILY', 'La familia más peculiar del anime te reta. Un espía, una asesina y una telepática conviven en esta divertida comedia de acción. ¿La conoces bien?', 'facil', 'anime-moderno');
SET @spy = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@spy, '¿Cómo se llama el espía protagonista de SPY x FAMILY?', 'Lloyd Forger', 'Twilight / Loid Forger', 'Agent X', 'Frank Sterling', 'b', 100),
(@spy, '¿Qué poder especial tiene Anya Forger?', 'Ver el futuro', 'Superfuerza', 'Telepatía: puede leer mentes', 'Teletransportación', 'c', 100),
(@spy, '¿Cuál es la misión que obliga a Loid a crear una familia falsa?', 'Operación Amanecer', 'Operación Fantasma', 'Operación Twilight', 'Operación Strix', 'd', 100),
(@spy, '¿Cuál es la profesión secreta de Yor Briar (la madre)?', 'Espía doble', 'Asesina a sueldo', 'Agente de contrainteligencia', 'Médica encubierta', 'b', 100),
(@spy, '¿Para qué organización trabaja Loid como espía?', 'SSS', 'Ostania Intelligence', 'WISE', 'SPEC', 'c', 100),
(@spy, '¿Cuál es el nombre de la escuela de élite a la que debe ingresar Anya?', 'Westalis Academy', 'Berlint International School', 'Eden Academy', 'Royal Prep School', 'c', 100),
(@spy, '¿Cuántas estrellas Stella debe ganar Anya en la escuela para la misión?', 'Cinco', 'Siete', 'Ocho', 'Diez', 'c', 100),
(@spy, '¿Cuál es el nombre del perro de la familia Forger y qué poder tiene?', 'Max, puede leer mentes', 'Rex, tiene superfuerza', 'Bond, puede ver el futuro', 'Buddy, es invisible', 'c', 100),
(@spy, '¿Cómo se llama el hermano de Yor que trabaja en la policía secreta?', 'Franky', 'Damian', 'Becky', 'Yuri Briar', 'd', 100),
(@spy, '¿A qué país ficticio de estilo Guerra Fría recuerda el mundo de SPY x FAMILY?', 'Una versión alternativa de Alemania dividida', 'Una versión alternativa de Japón feudal', 'Una versión alternativa de Francia napoleónica', 'Una versión alternativa de la URSS', 'a', 100);

-- =============================================
-- CATEGORÍA: VIDEOJUEGOS
-- =============================================

-- Quiz 11: Pokémon (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Pokémon', '¡Atraparlos es tu destino! Pon a prueba tus conocimientos sobre el mundo de los Pokémon. Tipos, evoluciones y legendarios te esperan.', 'facil', 'videojuegos');
SET @poke = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@poke, '¿Cuántos Pokémon originales existen en la Primera Generación?', '100', '151', '200', '251', 'b', 100),
(@poke, '¿Cuál es el Pokémon más icónico de la franquicia?', 'Charizard', 'Mewtwo', 'Pikachu', 'Eevee', 'c', 100),
(@poke, '¿Qué tipo tiene Pikachu?', 'Normal', 'Fuego', 'Agua', 'Eléctrico', 'd', 100),
(@poke, '¿Cuál es la evolución final de Charmander?', 'Charmeleon', 'Rapidash', 'Arcanine', 'Charizard', 'd', 100),
(@poke, '¿Quién es el líder de Team Rocket en los juegos originales?', 'James', 'Jessie', 'Butch', 'Giovanni', 'd', 100),
(@poke, '¿Cuántas medallas de gimnasio se necesitan para el Campeonato Pokémon en Kanto?', 'Cuatro', 'Seis', 'Ocho', 'Diez', 'c', 100),
(@poke, '¿Cuál es el Pokémon Legendario creado en un laboratorio mediante experimentos?', 'Mew', 'Arceus', 'Mewtwo', 'Lugia', 'c', 100),
(@poke, '¿Qué objeto especial se usa para atrapar Pokémon?', 'Master Ball', 'Poké Ball', 'Ultra Ball', 'Gran Ball', 'b', 100),
(@poke, '¿Cuál es el nombre del rival de Ash/Red en los juegos de Primera Generación?', 'Brock', 'Gary / Blue', 'Misty', 'Silver', 'b', 100),
(@poke, '¿Cuál es el movimiento más poderoso que puede aprender Pikachu de forma natural?', 'Impactrueno', 'Rayo', 'Voltio Cruel', 'Trueno', 'd', 100);

-- Quiz 12: Final Fantasy VII (Difícil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Final Fantasy VII', 'El RPG que cambió los videojuegos para siempre. Solo los verdaderos fans de Cloud, Sephiroth y Midgar superarán este exigente quiz.', 'dificil', 'videojuegos');
SET @ff7 = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@ff7, '¿Cuál es el nombre completo del protagonista de Final Fantasy VII?', 'Zack Fair', 'Cloud Fair', 'Zack Strife', 'Cloud Strife', 'd', 300),
(@ff7, '¿Cuál es el nombre del antagonista principal de FF7?', 'Genesis Rhapsodos', 'Angeal Hewley', 'Jenova', 'Sephiroth', 'd', 300),
(@ff7, '¿Para qué grupo eco-terrorista trabaja Cloud al inicio del juego?', 'Turks', 'SOLDIER', 'ShinRa', 'AVALANCHE', 'd', 300),
(@ff7, '¿Cómo se llama el material mágico que permite usar habilidades en FF7?', 'Cristal', 'Esfera', 'Materia', 'Orbe de Poder', 'c', 300),
(@ff7, '¿Cuál es el nombre de la última Cetra y principal personaje femenino?', 'Tifa Lockhart', 'Yuffie Kisaragi', 'Elena', 'Aerith Gainsborough', 'd', 300),
(@ff7, '¿Qué le ocurre a Aerith en el Templo de los Antiguos?', 'Es capturada por ShinRa', 'Abandona al grupo de Cloud', 'Se convierte en villana', 'Sephiroth la mata con su Katana', 'd', 300),
(@ff7, '¿Cómo se llama la ciudad natal de Cloud y Tifa?', 'Midgar', 'Kalm', 'Nibelheim', 'Costa del Sol', 'c', 300),
(@ff7, '¿Cuál es el nombre de la invocación más poderosa del juego original?', 'Bahamut ZERO', 'Knights of the Round', 'Neo Bahamut', 'Odin', 'b', 300),
(@ff7, '¿A qué unidad militar de élite de ShinRa pertenecían Cloud y Sephiroth?', 'Turks', 'Guardia ShinRa', 'SOLDIER', 'Ejército Regular', 'c', 300),
(@ff7, '¿Cuál es el nombre del hechizo meteorológico que Sephiroth invoca para destruir el planeta?', 'Ultima', 'Comet', 'Supernova', 'Meteor', 'd', 300);

-- Quiz 13: The Legend of Zelda (Medio)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('The Legend of Zelda', 'Recorre Hyrule, empuña la Espada Maestra y demuestra que conoces la franquicia de Nintendo que lleva más de 35 años marcando la historia.', 'medio', 'videojuegos');
SET @zelda = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@zelda, '¿Cuál es el nombre del protagonista de la mayoría de juegos de Zelda?', 'Zelda', 'Ganon', 'Navi', 'Link', 'd', 200),
(@zelda, '¿Cuántos triángulos forman el Triforce?', 'Uno', 'Dos', 'Tres', 'Cuatro', 'c', 200),
(@zelda, '¿Cuál es el arma más icónica de Link?', 'El Bastón de Fuego', 'El Martillo', 'La Espada Maestra (Master Sword)', 'La Lanza del Cielo', 'c', 200),
(@zelda, '¿Quién es el principal antagonista de la franquicia Zelda?', 'Zant', 'Ghirahim', 'Vaati', 'Ganondorf', 'd', 200),
(@zelda, '¿Cuál es el nombre del instrumento que toca Link en Ocarina of Time?', 'Arpa de los Tiempos', 'Laúd del Viento', 'Ocarina del Tiempo', 'Flauta de los Dioses', 'c', 200),
(@zelda, '¿En qué reino/continente transcurren la mayoría de juegos de Zelda?', 'Termina', 'Holodrum', 'Labrynna', 'Hyrule', 'd', 200),
(@zelda, '¿Quién es el hada compañera de Link en Ocarina of Time?', 'Tatl', 'Tael', 'Ciela', 'Navi', 'd', 200),
(@zelda, '¿Cuántos santuarios debe completar Link en Breath of the Wild?', '40', '80', '120', '200', 'c', 200),
(@zelda, '¿Cuál fue el primer juego de The Legend of Zelda (año de lanzamiento)?', '1984 - Famicom Disk System', '1986 - Famicom Disk System', '1988 - NES', '1990 - Super Nintendo', 'b', 200),
(@zelda, '¿Qué fragmento del Triforce posee Ganondorf?', 'Triforce de la Sabiduría', 'Triforce del Valor', 'Los tres fragmentos', 'Triforce del Poder', 'd', 200);

-- Quiz 14: Super Mario (Fácil)
INSERT INTO quizzes (titulo, descripcion, dificultad, categoria) VALUES
('Super Mario', 'El fontanero más famoso del mundo te desafía. Champiñones, castillos y mundos de plataformas. ¿Puedes superar este quiz de la franquicia de Nintendo?', 'facil', 'videojuegos');
SET @mario = LAST_INSERT_ID();
INSERT INTO questions (quiz_id, texto_pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, puntos_base) VALUES
(@mario, '¿A quién rescata Mario en la mayoría de sus aventuras?', 'Yoshi', 'Luigi', 'Toad', 'La Princesa Peach', 'd', 100),
(@mario, '¿Cuál es el nombre del villano principal de la franquicia Mario?', 'Wario', 'Waluigi', 'Kamek', 'Bowser', 'd', 100),
(@mario, '¿Cómo se llama el hermano verde de Mario?', 'Wario', 'Waluigi', 'Luigi', 'Toad', 'c', 100),
(@mario, '¿Cuál es el nombre del dinosaurio que monta Mario?', 'Rex', 'Koopa', 'Birdo', 'Yoshi', 'd', 100),
(@mario, '¿En qué reino transcurren las aventuras de Mario?', 'Reino Koopa', 'Galaxia Mario', 'Reino Nintendo', 'Reino Champiñón', 'd', 100),
(@mario, '¿Qué objeto hace crecer a Mario?', 'Champiñón de Fuego', 'Estrella Invencible', 'Flor de Fuego', 'Super Champiñón', 'd', 100),
(@mario, '¿Cuántas estrellas tiene Super Mario 64 en total?', '60', '70', '120', '150', 'c', 100),
(@mario, '¿En qué año se lanzó el primer Super Mario Bros para NES?', '1983', '1985', '1987', '1989', 'b', 100),
(@mario, '¿Cuál es el poder especial de la Flor de Fuego?', 'Volar', 'Hacerse invisible', 'Duplicarse', 'Lanzar bolas de fuego', 'd', 100),
(@mario, '¿Cómo se llaman los enemigos con caparazón de tortuga?', 'Goombas', 'Thwomps', 'Hammer Bros', 'Koopa Troopas', 'd', 100);

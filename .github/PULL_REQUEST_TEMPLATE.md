   ## Información Estudiantes

   - **Nombre completo Integrantes**: Judit Escoda Matas i Alba Colomer Soler
   - **Grupo de prácticas**: 24
   - **Correos electrónicos**: 1665391@uab.cat, 1667615@uab.cat
   - **NIUs**: 1667615, 1665391

   ## Resumen de la Entrega

   Ens hem basat en el cas d'us d'una app de recomanacions de restaurants on l'usuari pot cercar restaurants propers, classificant-los per qualificacions i també consultar-ne les inspeccions. 
   Analitzant l'estructura de les dades hem determinat que la relació entre restaurants i inspeccions és One-To-Few, tot i això el nombre de inspeccions associades a un restaurant pot crèixer notablement, per això creiem que fer servir referències com restaurant_id ens optimitza la cerca i la gestió de dades.
   El disseny del esquema de validació de restaurants l'hem enfocat de manera que puguem assegurar la identificació i localització d'un restaurant i tota la seva informació bàsica, i en el de inspeccions hem prioritzat que tota inspecció quedi ben identificada i vinculada al restaurant pertinent.
   En la part avançada hem implementat indexs clau per millorar la cerca de les consultes més freqüents, hem utilitzat com a claus de shard restaurant_id (inspeccions) i adress_line_2 (restaurants) i em decidit fer un replica set amb 3 nodes.

   ## Lista de Verificación

   - [x] He diseñado un esquema adecuado para las colecciones
   - [x] He implementado todas las consultas requeridas
   - [x] He optimizado el rendimiento con índices
   - [x] He documentado todas mis decisiones técnicas
   - [x] He incluido capturas de pantalla de los resultados
   - [x] He creado la memoria técnica en formato PDF
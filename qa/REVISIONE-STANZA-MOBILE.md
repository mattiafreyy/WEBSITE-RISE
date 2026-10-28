# Stanza cinema — TV verticale e camera in movimento

La variante mobile usa una TV reale in formato 9:16, ricostruita nel modello Blender con apertura 3×5,333 m e cornice corrispondente. Il video è il film verticale originale DELREY; il fotogramma rimane completo. La scultura e il piedistallo originali sono ricomposti nella scena mobile. Asset, camera, video e movimento desktop restano invariati.

Lo scorrimento mobile parte vicino al televisore, poi la camera arretra da scala 1,8 a 1 e sposta gradualmente l'inquadratura per rivelare la scultura. Il movimento è distribuito lungo tutta la scena, invece del precedente zoom quasi fermo del 2%. Lo schermo passa da circa il 75% al 42% della larghezza, mantenendo margini laterali.

Render dedicato: 720×1440 px, 80 campioni Cycles, focale 65 mm. Il browser lo seleziona fino a 700px tramite picture/source. Le coordinate dell'apertura sono proiettate dalla camera Blender e riportate in mobile-room-aperture.json. Per rigenerare usare room-source/render_mobile.py con il file .blend originale fornito.

## Verifiche

- 3 controlli pixel confermano che la cornice renderizzata segue l’apertura verticale, senza conservare la vecchia larghezza orizzontale.
- 3284 controlli dedicati: quattro formati telefono per 101 posizioni; formato 9:16, margini del televisore, movimento continuo, nessun bordo vuoto, scultura e piedistallo completamente rivelati nella fase finale.
- 3093 controlli esistenti passati, aggiornando le attese del film mobile al formato verticale.
- 404 campioni della camera desktop identici alla versione precedente.
- Chromium: 360×740, 390×844, 430×932; movimento avanti e indietro reversibile, proporzioni del film, controllo audio e nessun errore JavaScript.
- Verificati anche desktop 1180×757 e movimento ridotto su mobile. Con movimento ridotto la composizione finale resta statica.
- Safari e dispositivi fisici non verificati. Nessuna pubblicazione sul sito live effettuata dalla sessione.

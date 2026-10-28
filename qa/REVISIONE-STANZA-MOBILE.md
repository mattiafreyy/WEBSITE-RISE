# Stanza cinema — inquadratura mobile

La scena mobile usa un render verticale dedicato della stessa stanza Blender: camera orizzontale a x=-1,1 m, focale 46 mm, 720×1440 px, 80 campioni Cycles. La camera desktop e il relativo asset restano invariati.

Il televisore occupa circa il 55–56% della larghezza dello schermo nei formati verificati; la scultura originale e il piedistallo rimangono interamente visibili a sinistra. Lo zoom mobile è limitato al 2%. Il video mantiene il fotogramma completo 16:9 e il controllo audio esistente.

Il browser sceglie il render verticale tramite picture/source solo fino a 700px. Le coordinate dell'apertura video provengono dalla proiezione della camera Blender, riportata in mobile-room-aperture.json. Il file room-source/render_mobile.py permette di rigenerare immagine e metadati caricando il .blend originale fornito.

## Verifiche

- 3232 controlli dedicati: quattro dimensioni telefono per 101 posizioni della camera; scultura e piedistallo entro il viewport, margini del televisore, proporzione 16:9 e registrazione dell'apertura.
- 3093 controlli esistenti passati.
- 404 campioni della camera desktop identici alla versione precedente.
- Chromium: 360×740, 390×844, 430×932, desktop 1180×757; nessun errore JavaScript, video completo e controllo audio funzionante.
- Verificata anche la modalità movimento ridotto su mobile.
- Safari e dispositivi fisici non verificati. Il sito live non è stato pubblicato da questa sessione.

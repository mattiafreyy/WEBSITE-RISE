# Revisione mirata: logo e metodo

- La lente del logo rivela esclusivamente hero-chrome.webp; il raggio nero è limitato a 35,84–69,44 px in base al viewport, contro il precedente raggio di circa 0,252 × larghezza schermo. Nessuna deformazione organica o rotazione di materiali.
- La sezione metodo passa da 360svh a 200svh: corsa della scena sticky ridotta da 260svh a 100svh (circa 62%).
- Indice laterale con quattro pulsanti e pannelli scuri con ingresso dal basso e lieve prospettiva. Si può scegliere direttamente ogni fase; scorrimento reversibile.
- Testi originali preservati. Sezioni restanti e pagina Studio invariate. La sezione home resta nascosta su mobile come prima.
- Movimento ridotto: quattro pannelli statici leggibili senza animazioni.

## Verifiche

- Sintassi JavaScript e 3093 controlli esistenti passati.
- Chromium: 1440×1000, 1180×757, 768×1024; quattro fasi avanti/indietro, pulsanti di selezione diretta, nessun testo tagliato, nessuno sconfinamento orizzontale e nessun errore JavaScript.
- Tre ingressi consecutivi sul logo: sempre acciaio, un solo materiale nel DOM, raggio entro il limite.
- Mobile 390×844 con e senza movimento ridotto: comportamento esistente conservato.
- Desktop con movimento ridotto: tutti e quattro i pannelli visibili.

Le immagini anteprima-acciaio.png e anteprima-metodo.png sono catture reali di Chromium. Non è stata eseguita una pubblicazione sul sito live.

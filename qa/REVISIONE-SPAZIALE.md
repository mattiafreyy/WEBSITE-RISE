# DELREY — revisione spaziale

## Modifiche
- Fondo avorio, margini più ampi, titoli grandi e composizione editoriale del portfolio.
- Layout progetti fluido: eliminate le coordinate assolute legate a un viewport specifico.
- Nuovo ingresso al cinema 3D: «Non solo immagini. Spazi da sentire.»
- Inerzia delle scene legata al tempo; deformazione dei progetti ridotta; transizioni più morbide.
- Geometria dei testi misurata al ridimensionamento invece che a ogni fotogramma.
- Contenuto introduttivo presente anche su mobile, navigazione interna corretta e preferenza di movimento ridotto applicata dall'avvio.

## Verifica eseguita
- 2962 controlli matematici, 97 controlli interazioni DOM, 34 controlli lifecycle del simbolo: passati.
- Chromium desktop 1440×1000 e mobile 390×844: menu, navigazione verso contatti e download del brief verificati; nessun errore JavaScript.
- Pacchetto dist verificato anche a 1180×757, 768×1024 e 360×740 con movimento ridotto: nessuno sconfinamento orizzontale o sovrapposizione tra progetti; link interno funzionante, footer leggibile.
- Controllo visivo delle schermate hero, portfolio, ingresso cinema e stanza 3D.
- Safari, dispositivi reali e prestazioni su hardware mobile non verificati. Non si dichiara un framerate garantito.

## Avvio
Dalla cartella del sito: `python3 -m http.server 4173`.
Aprire il sito tramite HTTP; non direttamente come file locale.
Dopo modifiche ai sorgenti JS: `python3 checks/stage-dist.py` rigenera site.js e dist/.

## Pubblicazione e contatti
La cartella dist contiene il sito statico aggiornato. Nessuna pubblicazione eseguita.
Il form continua a scaricare un brief locale; nessun messaggio viene inviato allo studio.

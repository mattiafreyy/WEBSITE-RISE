# DELREY Studio — archivio sorgenti v11

I due ZIP sono complementari e si estraggono nella stessa cartella.

1. DELREY-STUDIO-v11-sito.zip: sito completo e subito eseguibile dalla cartella principale, con codice modificabile, font, vettori, immagini e video.
2. DELREY-STUDIO-v11-sorgenti-3D.zip: sorgenti opzionali della stanza 3D, inclusi Blender e script, piu il vettore necessario per ricrearla. Non serve per aprire il sito.

Per aprire il sito: `python3 -m http.server 8000`, quindi http://localhost:8000/.

La cartella di pubblicazione `dist/` duplicava i file del sito ed e stata omessa per ridurre il peso. Si ricrea senza scaricare nulla con `python3 checks/stage-dist.py`. Tutti i file omessi sono stati confrontati byte per byte con quelli sorgente corrispondenti.

Leggi CODEX_HANDOFF.md per istruzioni complete. I file del sito sono invariati rispetto alla versione 11, commit dfcf600c4f3a17a21ddbf53d8c6b6953fe50df20. GitHub non e collegato.

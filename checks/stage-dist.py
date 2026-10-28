"""Stage the static application from retained source; no publication or network activity."""
from pathlib import Path
import shutil,json,hashlib
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
(root/'site.js').write_text('/* Generated from brand-scene.js, motion.js and app.js. */\n'+'\n'.join((root/f).read_text() for f in ['brand-scene.js','motion.js','app.js']))
files=['index.html','style.css','site.js']
assets=['NimbusSans-Regular.otf','NimbusSans-Bold.otf','NimbusMonoPS-Regular.otf','LICENZA_URW.txt','DELREY_Icona_nero.svg','DELREY_Icona_bianco.svg','DELREY_Logo_nero.svg','DELREY_Logo_bianco.svg','DELREY_Wordmark_nero.svg','DELREY_Wordmark_bianco.svg','hero-chrome.webp','hero-puffy.webp','hero-candy.webp','hero-symbol-mesh.json','hero-symbol-poster.webp','hero-symbol-rotation-atlas.webp','cinematic-room.webp','stationery.webp','stationery-white.webp','origin.webp','aura.webp','matter.webp','film.mp4','film-poster.webp','film-compact.mp4','film-portrait.mp4','film-portrait-poster.webp','wordmark.mp4','green-film.mp4','green-portrait.mp4','green-portrait-poster.webp']
for f in files+[f'assets/{a}' for a in assets]:
 if not (root/f).is_file():raise FileNotFoundError(f)
shutil.rmtree(dist,ignore_errors=True);(dist/'assets').mkdir(parents=True)
manifest=[]
for f in files+[f'assets/{a}' for a in assets]:
 shutil.copy2(root/f,dist/f)
 b=(dist/f).read_bytes();manifest.append({'file':f,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
(root/'qa'/'staged-files.json').write_text(json.dumps({'deployment':'not performed','browserQA':False,'files':manifest,'bytes':sum(f['bytes'] for f in manifest)},indent=2))
print(json.dumps({'files':len(manifest),'bytes':sum(f['bytes'] for f in manifest),'directory':str(dist),'deployment':'not performed'},indent=2))

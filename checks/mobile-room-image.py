"""Validate the rendered vertical bezel against the exported video aperture."""
from pathlib import Path
import json
from PIL import Image
root=Path(__file__).resolve().parents[1]
meta=json.loads((root/'qa/mobile-room-aperture.json').read_text())
im=Image.open(root/'assets/cinematic-room-mobile.webp').convert('RGB')
b=meta['screen']
x=round((b['x']+b['w']/2)*im.width)
y=round((b['y']+b['h']/2)*im.height)
def extent(axis):
 pos=x if axis==0 else y
 limit=im.width if axis==0 else im.height
 def dark(i): return max(im.getpixel((i,y) if axis==0 else (x,i)))<65
 left=right=pos
 while left>0 and dark(left):left-=1
 while right<limit-1 and dark(right):right+=1
 return right-left
w,h=extent(0),extent(1)
assert b['w']*im.width-5<w<b['w']*im.width+30,'Housing must fit the vertical aperture horizontally'
assert b['h']*im.height-5<h<b['h']*im.height+30,'Housing must fit the vertical aperture vertically'
assert h/w>1.6,'Rendered TV housing must be portrait'
print(json.dumps({'passed':3,'rendered_bezel_width':w,'rendered_bezel_height':h,'asset':meta['asset']}))

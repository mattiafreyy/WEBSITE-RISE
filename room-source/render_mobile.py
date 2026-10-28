# Run with the supplied original .blend: blender -b /path/to/delrey-cinema-room.blend --python room-source/render_mobile.py
import bpy,json
from pathlib import Path
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view
s=bpy.context.scene
cam=s.camera
cam.location.x=-.8
cam.data.lens=65
cam.data.sensor_fit='HORIZONTAL'
# A genuine 9:16 screen and bezel, built from the existing scene geometry.
width=3.0;height=width*16/9;center_z=2.75
for name,extra in [('Screen shadow housing',.14),('Screen outer brushed bezel',.075)]:
 o=bpy.data.objects[name];o.dimensions=(width+extra,o.dimensions.y,height+extra)
aperture=bpy.data.objects['Exact screen aperture']
for v in aperture.data.vertices:
 v.co.x*=width/5.56
 v.co.z=center_z+(v.co.z-center_z)*(height/(5.56*9/16))
# Bring the original sculpture and its plinth into the portrait composition.
for o in s.objects:
 if o.name.startswith(('DELREY exact supplied icon','Monolithic cast pedestal','Pedestal 12 mm','Sculpture pin')):o.location.x+=1.8
light=bpy.data.objects.get('Warm quiet sculpture edge')
if light:light.location.x+=1.8
s.render.resolution_x=720
s.render.resolution_y=1440
s.render.resolution_percentage=100
s.render.threads_mode='FIXED'
s.render.threads=5
s.render.engine='CYCLES'
s.cycles.samples=80
s.cycles.use_denoising=False
s.cycles.adaptive_threshold=.04
s.render.image_settings.file_format='PNG'
output=Path(__file__).resolve().parent
s.render.filepath=str(output/'room-mobile.png')
bpy.context.view_layer.update()
aperture=bpy.data.objects['Exact screen aperture']
coords=[world_to_camera_view(s,cam,aperture.matrix_world@v.co) for v in aperture.data.vertices]
xs=[c.x for c in coords];ys=[1-c.y for c in coords]
box={'x':min(xs),'y':min(ys),'w':max(xs)-min(xs),'h':max(ys)-min(ys)}
meta={'asset':'assets/cinematic-room-mobile.webp','width':720,'height':1440,'screen':box,'camera_x':cam.location.x,'lens':cam.data.lens}
items=[o for o in s.objects if o.name.startswith(('DELREY exact supplied icon','Monolithic cast pedestal'))]
points=[world_to_camera_view(s,cam,o.matrix_world@Vector(c)) for o in items for c in o.bound_box]
meta['sculpture_bounds']={'x':min(c.x for c in points),'y':min(1-c.y for c in points),'w':max(c.x for c in points)-min(c.x for c in points),'h':max(c.y for c in points)-min(c.y for c in points)}
(output/'mobile-aperture.json').write_text(json.dumps(meta,indent=2))
print('MOBILE_APERTURE',json.dumps(meta),flush=True)
bpy.ops.render.render(write_still=True)

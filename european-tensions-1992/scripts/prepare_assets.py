import io,json,os,urllib.request,urllib.parse,urllib.error,time,random
from PIL import Image
os.makedirs('public/archive',exist_ok=True)
def get(url):
 req=urllib.request.Request(url,headers={'User-Agent':'DocumentaryRemotion/1.0 (archive research; contact github.com/hubgit25-25/MuscleGain6LBS)'})
 for attempt in range(7):
  try:
   with urllib.request.urlopen(req,timeout=40) as response:return response.read()
  except urllib.error.HTTPError as exc:
   if exc.code not in (429,500,502,503,504) or attempt==6:raise
   retry=exc.headers.get('Retry-After')
   delay=min(90,max(8, int(retry) if retry and retry.isdigit() else 12*(attempt+1)))
   print('Rate limited, waiting',delay,'seconds',flush=True)
   time.sleep(delay+random.random()*2)
  except (TimeoutError,ConnectionError):
   if attempt==6:raise
   time.sleep(8*(attempt+1))
# Genuine archival images of the Maastricht treaty signatories from Wikimedia Commons.
# Note: Denmark, Italy, France photos show their 1992 signatories, not the referendums or lira crisis.
sources={
 'maastricht':'Maastricht Signature Great Britain.jpg',
 'denmark':'Maastricht - Danmarks underskrift.jpg',
 'italy':'Maastricht Signature Italy.jpg',
 'france':'Maastricht Signature France.jpg',
}
for key,name in sources.items():
 url='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+urllib.parse.quote(name)
 raw=get(url)
 im=Image.open(io.BytesIO(raw)).convert('RGB')
 im.save('public/archive/'+key+'.jpg',quality=92)
 print(key,im.size,url)
 time.sleep(5)
# True Natural Earth country borders; Shapely clips polygons without corrupting coastlines.
from shapely.geometry import shape,box,Polygon
from shapely.validation import make_valid
geo=json.loads(get('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'))
region=box(-12,34,36,72)
result=[]
for feature in geo['features']:
 props=feature['properties']
 iso=props.get('ISO3166-1-Alpha-3') or props.get('ISO_A3') or props.get('ADM0_A3') or ''
 geom=feature.get('geometry')
 if not geom:continue
 raw=make_valid(shape(geom))
 if not raw.intersects(region):continue
 clipped=raw.intersection(region)
 pieces=list(clipped.geoms) if hasattr(clipped,'geoms') else [clipped]
 polys=[]
 for piece in pieces:
  if not isinstance(piece,Polygon) or piece.area<.008:continue
  piece=piece.simplify(.012,preserve_topology=True)
  ring=list(piece.exterior.coords)
  pts=[[round((lon-12)*.43,4),round((lat-52)*.43,4)] for lon,lat in ring[:-1]]
  if len(pts)>=3:polys.append(pts)
 if polys:result.append({'id':iso,'polygons':polys})
assert len(result)>25,'Europe map missing'
assert all(any(c['id']==x for c in result) for x in ['DNK','ITA','FRA','NLD']), 'Country IDs missing'
with open('src/europe-data.ts','w') as out:
 out.write('export const countries: {id:string;polygons:number[][][]}[] = '+json.dumps(result,separators=(',',':'))+';\n')
print('Accurate European countries:',len(result))

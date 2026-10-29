import io,json,os,urllib.request,urllib.parse
from PIL import Image
os.makedirs('public/archive',exist_ok=True)
def get(url):
 req=urllib.request.Request(url,headers={'User-Agent':'DocumentaryRemotion/1.0 (archive research; contact github.com/hubgit25-25/MuscleGain6LBS)'})
 return urllib.request.urlopen(req,timeout=40).read()
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
# Geographically sourced outlines: Natural Earth GeoJSON dataset, reprojected into a flat map plane.
geo=json.loads(get('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'))
result=[]
for feature in geo['features']:
 props=feature['properties'];id=props.get('ISO3166-1-Alpha-3') or props.get('ISO_A3') or props.get('ADM0_A3') or ''
 geom=feature.get('geometry') or {};typ=geom.get('type');coords=geom.get('coordinates') or []
 polys=[coords] if typ=='Polygon' else coords if typ=='MultiPolygon' else []
 processed=[]
 for polygon in polys:
  ring=polygon[0] if polygon else []
  if not ring:continue
  # avoid far-off overseas islands and regions, keep geographic Europe
  points=[[round((lon-13)*.44,3),round((lat-51)*.55,3)] for lon,lat in ring if -12<=lon<=36 and 34<=lat<=72]
  if len(points)>=3:
   # remove duplicate consecutive coordinates
   dedup=[]
   for xy in points:
    if not dedup or dedup[-1]!=xy:dedup.append(xy)
   if len(dedup)>=3:processed.append(dedup[::max(1,len(dedup)//220)])
 if processed:result.append({'id':id,'polygons':processed})
assert len(result)>25, 'Map geometry missing'
assert all(any(c['id']==x for c in result) for x in ['DNK','ITA','FRA','NLD']), 'Country identifiers missing'
with open('src/europe-data.ts','w') as out:
 out.write('export const countries: {id:string;polygons:number[][][]}[] = '+json.dumps(result,separators=(',',':'))+';\n')
print('Prepared',len(result),'European countries')

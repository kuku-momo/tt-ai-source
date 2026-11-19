const fs=require('fs'),path=require('path');
const src=process.argv[2], out=process.argv[3];
if(!src||!out){console.error('usage: node unasar.js <app.asar> <outdir>');process.exit(1);}
const fd=fs.openSync(src,'r');
const head=Buffer.alloc(16); fs.readSync(fd,head,0,16,0);
const pickleSize=head.readUInt32LE(4);          // header pickle total size
const jsonSize=head.readUInt32LE(12);           // json length
const jsonBuf=Buffer.alloc(jsonSize);
fs.readSync(fd,jsonBuf,0,jsonSize,16);
const header=JSON.parse(jsonBuf.toString('utf8'));
const baseOff=8+pickleSize;
fs.mkdirSync(out,{recursive:true});
let nFile=0,nDir=0,total=0;
function walk(node,rel){
  for(const [name,entry] of Object.entries(node.files)){
    const rp=rel?rel+'/'+name:name;
    if(entry.files){ walk(entry,rp); }
    else {
      const dest=path.join(out,rp);
      fs.mkdirSync(path.dirname(dest),{recursive:true});
      if(entry.unpacked){ nFile++; continue; }
      const len=Number(entry.size);
      const buf=Buffer.alloc(len);
      fs.readSync(fd,buf,0,len,baseOff+Number(entry.offset));
      fs.writeFileSync(dest,buf);
      nFile++; total+=len;
    }
  }
}
walk(header,'');
console.log(JSON.stringify({files:nFile,bytes:total,baseOff,unpacked:header.files&&Object.keys(header.files)}) );

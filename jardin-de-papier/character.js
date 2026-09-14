function path(points,fill,stroke='#4d4b40',width=2){ctx.beginPath();points(ctx);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}}
function ellipse(x,y,rx,ry,fill,stroke){path(c=>c.ellipse(x,y,rx,ry,0,0,Math.PI*2),fill,stroke)}
function star(x,y,r,fill){path(c=>{for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,rr=i%2?r*.45:r;const xx=x+Math.cos(a)*rr,yy=y+Math.sin(a)*rr;i?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.closePath()},fill,'#a98c39',1.4)}
function character(x,y,s=1){const walk=Math.sin(time*12)*Math.min(1,Math.abs(player.vx)/100),bob=player.onGround?Math.abs(walk)*3:0;ctx.save();ctx.translate(x,y-bob);ctx.scale(s*player.face,s);ctx.rotate(player.onGround?walk*.025:player.vy*.00008);
// Retraced from the supplied drawing: long body, curled tail, huge uneven eyes and floppy ears.
path(c=>{c.moveTo(-10,-58);c.bezierCurveTo(-38,-61,-27,-29,-54,-29);c.bezierCurveTo(-83,-27,-72,-8,-42,-21);c.bezierCurveTo(-21,-25,-26,-42,-13,-43)},'#f6f1df');
path(c=>{c.moveTo(-13,-94);c.bezierCurveTo(-21,-65,-24,-22,-11,-8);c.bezierCurveTo(5,10,21,-6,20,-32);c.lineTo(12,-96);c.closePath()},'#f4efdd');
path(c=>{c.moveTo(14,-62);c.lineTo(37,-49-walk*5);c.moveTo(20,-55);c.lineTo(31,-72-walk*5)},null);
ctx.save();ctx.translate(0,-105);ctx.rotate(Math.sin(time*2.5)*.04);
path(c=>{c.moveTo(-47,-22);c.bezierCurveTo(-69,-35,-69,19,-48,22);c.bezierCurveTo(-40,20,-48,-9,-47,-22)},'#e6e1ce');
path(c=>{c.moveTo(44,-34);c.bezierCurveTo(65,-57,69,9,57,13);c.bezierCurveTo(46,22,48,-8,44,-34)},'#e6e1ce');
path(c=>{c.moveTo(-48,-19);c.lineTo(-39,-43);c.bezierCurveTo(-22,-69,1,-58,23,-55);c.bezierCurveTo(43,-53,47,-36,52,-13);c.bezierCurveTo(63,17,23,48,0,43);c.bezierCurveTo(-24,46,-49,24,-48,-19)},'#f7f1de','#4d4b40',2.5);
const blink=Math.sin(time*.85)>.994;ctx.save();ctx.translate(0,0);if(blink){path(c=>{c.moveTo(-23,6);c.lineTo(-6,8);c.moveTo(14,0);c.lineTo(33,0)},null,undefined,3)}else{
path(c=>{c.moveTo(-26,-13);c.lineTo(-15,-19);c.quadraticCurveTo(1,-16,0,23);c.lineTo(-22,25);c.closePath()},'#fffaf0');
path(c=>{c.moveTo(12,9);c.bezierCurveTo(12,-29,31,-32,34,-10);c.lineTo(35,8);c.quadraticCurveTo(27,23,12,9)},'#fffaf0');
ellipse(-12,16,9,10,'#504e43',null);ellipse(24,6,10,9,'#504e43',null);ellipse(-10,12,2,3,'#fff9e7',null);ellipse(27,3,2,3,'#fff9e7',null);
for(let i=0;i<4;i++){path(c=>{c.moveTo(-20+i*4,9);c.lineTo(-19+i*4,23);c.moveTo(16+i*4,1);c.lineTo(17+i*4,13)},null,'#f0e8d450',1)}}ctx.restore();
path(c=>{c.moveTo(-19,42);c.quadraticCurveTo(-5,20,1,41);c.closePath()},'#514d40');path(c=>{c.moveTo(-16,-58);c.quadraticCurveTo(-10,-68,1,-65)},null);ctx.restore();ctx.restore()}

export default function Charts({history}){
 const food=history.filter(i=>i.need==="food").length;
 const medical=history.filter(i=>i.need==="medical").length;
 return (
  <div className="grid grid-cols-2 gap-4">
   <div className="bg-slate-800 p-6 rounded-xl">Food Requests: {food}</div>
   <div className="bg-slate-800 p-6 rounded-xl">Medical Requests: {medical}</div>
  </div>
 )
}
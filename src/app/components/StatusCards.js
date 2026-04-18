export default function StatusCards({history}){
 const high=history.filter(i=>i.urgency==="high").length;
 return (
  <div className="grid grid-cols-3 gap-4">
   <div className="bg-slate-800 p-4 rounded-xl">Requests: {history.length}</div>
   <div className="bg-slate-800 p-4 rounded-xl">High Priority: {high}</div>
   <div className="bg-slate-800 p-4 rounded-xl">Active Areas: {new Set(history.map(i=>i.area)).size}</div>
  </div>
 )
}
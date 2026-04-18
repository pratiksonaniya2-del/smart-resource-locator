"use client";
export default function RequestForm({addRequest}){
 function submit(e){
  e.preventDefault();
  const item={
   area:e.target.area.value,
   need:e.target.need.value,
   urgency:e.target.urgency.value,
   time:new Date().toLocaleTimeString()
  };
  addRequest(item);
  e.target.reset();
 }
 return (
  <form onSubmit={submit} className="bg-slate-800 p-6 rounded-xl space-y-4">
   <input name="area" placeholder="Enter Area" required className="w-full p-3 rounded bg-slate-700" />
   <select name="need" className="w-full p-3 rounded bg-slate-700">
    <option>food</option>
    <option>medical</option>
   </select>
   <select name="urgency" className="w-full p-3 rounded bg-slate-700">
    <option value="low">low</option>
    <option value="high">high</option>
   </select>
   <button className="w-full bg-emerald-500 p-3 rounded">Allocate</button>
  </form>
 )
}
export default function RequestTable({history}){
 return (
  <div className="bg-slate-800 p-6 rounded-xl overflow-auto">
   <h2 className="font-bold mb-4">Requests</h2>
   <table className="w-full text-left">
    <thead>
     <tr className="text-slate-400">
      <th>Area</th><th>Need</th><th>Priority</th><th>Time</th>
     </tr>
    </thead>
    <tbody>
     {history.map((i,idx)=>(
      <tr key={idx} className="border-t border-slate-700">
       <td>{i.area}</td>
       <td>{i.need}</td>
       <td>{i.urgency}</td>
       <td>{i.time}</td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 )
}
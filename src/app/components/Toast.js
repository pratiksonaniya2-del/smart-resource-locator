export default function Toast({message}){
 if(!message) return null;
 return (
  <div className="fixed bottom-5 right-5 bg-emerald-500 px-4 py-2 rounded-lg text-white shadow-lg">
   {message}
  </div>
 )
}
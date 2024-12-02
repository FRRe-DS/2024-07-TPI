import { TableUser } from "../../components/TableUser";
import Search from "../../components/Search";
import { Suspense } from "react";
import TableUserSkeleton from "@bienal/app/ui/skeletons/UserTableSkeleton";



export default function Page({searchParams}: {
  searchParams:{search? :string, page?:string}
}){
  const search = searchParams?.search || ''

  return (

    
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dar de Alta un Escultor</h1>
      <Search/>
      <TableUser params={search}/>
      {
        /*
        <Suspense fallback={<TableUserSkeleton/>}>
        
        </Suspense>
        */
      }
    </div>
  )
}

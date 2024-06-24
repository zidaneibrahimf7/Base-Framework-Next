export const columnsProductDatas = [
     {
          header: 'Title',
          accessorKey: 'title',
          size: 300,
          cell: (key) => {
               const keyData = key.row.original
               // console.log(keyData)
               return (
                    <>
                    <div className="flex gap-2">
                         {/* <Image src={keyData.images[0]} width={30} height={30} alt={keyData.title} /> */}
                         <span className="mt-2">{keyData.title}</span>
                    </div>
                    
                    </>
               )
          }
     },
     {
          header: 'Brand',
          accessorKey: 'brand',
     },
     {
          header: 'Stock',
          accessorKey: 'stock'
     },
]
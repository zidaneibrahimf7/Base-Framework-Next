export async function GET(req) {
     // const apiUrl = 'https://picsum.photos/id/12/500/500' // image url
     try {
        const apiUrl = `${process.env.API_SELF_LEARN}/product/getAllProducts`
         console.log(apiUrl, 'apiisssss')
         const response = await fetch(apiUrl, {
             next: { revalidate: 3600 }
         })
    
     //     console.log(response, 'SSSS')
         const data = await response.json()
         // return response    
         return new Response(JSON.stringify({
               code: 0,
               content: data,
               message: 'show all products'
          }))
         
     } catch (error) {
        console.error('Error Message:', error)
     }
 }
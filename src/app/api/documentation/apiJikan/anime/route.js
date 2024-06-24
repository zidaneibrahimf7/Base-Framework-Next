export async function GET() {
     // const apiUrl = 'https://picsum.photos/id/12/500/500' // image url
     try {
        const apiUrl = `${process.env.API_JIKAN_API}/anime`
        //  console.log(apiUrl, 'apiisssss')
         const response = await fetch(apiUrl, {
             next: { revalidate: 3600 }
         })
    
         // console.log(response, 'SSSS')
         const data = await response.json()
         // return response    
         return new Response(JSON.stringify(data))
         
     } catch (error) {
        console.error('Error Message:', error)
     }
 }
 
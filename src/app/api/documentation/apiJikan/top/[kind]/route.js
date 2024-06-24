export async function GET(req, {params}) {
    // const { searchParams } = new URL(req.url);
    // console.log(searchParams, ':::::')
    // console.log(params, '::params::')
     try {
        const apiUrl = `${process.env.API_JIKAN_API}/top/${params.kind}`
        //  console.log(apiUrl, 'apiisssss')
         const response = await fetch(apiUrl, {
             next: { revalidate: 3600 }
         })
    
        //  console.log(response, 'SSSS')
         const data = await response.json()
         // return response    
         return new Response(JSON.stringify(data))
         
     } catch (error) {
        console.error('Error Message:', error)
     }
 }
 
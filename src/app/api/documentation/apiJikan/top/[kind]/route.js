export async function GET(req, {params}) {
    const { searchParams } = new URL(req.url);
    // console.log(searchParams, ':::::')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')
    // console.log(params, '::params::')
     try {
        if(limit && page) {
             const apiUrl = `${process.env.API_JIKAN_API}/top/${params.kind}?limit=${limit}&page=${page}`
        } 
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
 
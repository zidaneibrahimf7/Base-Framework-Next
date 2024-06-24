export async function GET(req) {
    // console.log(req.url, '::req::')
    const { searchParams } = new URL(req.url)
    // console.log(searchParams, '::searchParams')
    const sortBy = searchParams.get('sortBy')
    // console.log(sortBy, '::sortBy::')
    const order = searchParams.get('order')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')

    let orderVal
    if(order === '1'){
        orderVal = 'asc'
    } else {
        orderVal = 'desc'
    }
     try {
        const apiUrl = `${process.env.DUMMY_JSON_API}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}?order=${orderVal}`
        // const apiUrl = `${process.env.DUMMY_JSON_API}/products`
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
 
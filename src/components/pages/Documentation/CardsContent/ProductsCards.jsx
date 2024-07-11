'use client'

import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import Cards from '@/components/custom/Cards'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/custom/Modal/modal'
import { Badge } from '@/components/ui/badge'
import Expandable from '@/helpers/Expandable'
import { truncate } from '@/helpers/Helpers'
import Tooltip from '@/components/custom/Tooltip'
import { SkeletonBadgeWithBorder } from '@/components/custom/Skeleton'
import moment from 'moment'

export default function ProductsCards(){
     const url = `/api/documentation/dummyJson/products?limit=6&skip=6`
     const {data, error} = useQuery({
          queryKey: ['products'],
          queryFn: async () => {
               // await fetch(url)
               const response = await fetch(url)
               const result = await response.json()
               // console.log(result, '::result::')
               return result
          }
     })

     const renderRating = (rating) => {
          return '⭐️'.repeat(rating);
     };

     return (
          <>
               {
                    // console.log(data, '::data::')
                    data?.products.length > 0 ?
                         data.products.map((val, ind) => {
                              // console.log(val, ind)
                              const imageProducts = val.images[0]
                              const availableStock = val.availabilityStatus
                              const qrCodeImage = val.meta.qrCode
                              let imageShowTrigger
                              let imageShowContent

                              if(imageProducts){
                                   imageShowTrigger = <Image src={imageProducts} width={50} height={50} alt={val.title} />
                                   imageShowContent = <Image src={imageProducts} width={200} height={200} alt="default" />
                              } else {
                                   imageShowTrigger = <Image src={'/assets/default.png'} width={70} height={70} alt={'default'} />
                                   imageShowContent = <Image src={'/assets/default.png'} width={200} height={200} alt={'default'} />
                              }

                              let conditionStock
                              if(availableStock === 'In Stock'){
                                   conditionStock = 'border-success'
                              } else if(availableStock === 'Low Stock'){
                                   conditionStock = 'border-warning'
                              } else {
                                   conditionStock = 'border-danger'
                              }

                              return (
                                   <Fragment key={val.title || ind}>
                                        <Cards
                                             title={
                                                  <div className="flex gap-2">
                                                       <Modal 
                                                            Trigger={<div className='cursor-pointer'>{imageShowTrigger}</div>}
                                                            Title={`Photo Products ${val.title}`}
                                                            FontTitle={'20px'}
                                                            // className={'cursor-pointer'}
                                                            Content={
                                                                 <div className='flex justify-center items-center'>
                                                                     {imageShowContent}
                                                                 </div>
                                                            }
                                                       />
                                                       <div>
                                                            <Tooltip trigger={truncate(val.title, 19)} content={val.title} />
                                                            <h5 className='text-sm italic'>{val.brand}</h5>
                                                            <span className='font-light text-sm'>{val.rating}/5.00</span>
                                                            <h1>{val.price} $</h1>
                                                       </div>
                                                  </div>
                                                  }
                                             content={
                                                  <div>
                                                       <p>{<Expandable children={val.description} maxChars={120} />}</p>
                                                       {/* <p><Tooltip trigger={truncate(val.description, 100)} content={val.description} /></p> */}
                                                       <div className='flex gap-1 mt-1'>
                                                            {
                                                                 val.tags.map((v, i) => (
                                                                      <Fragment key={i} className="px-2">
                                                                           <span className='italic text-xs'>#{v}</span>
                                                                      </Fragment>
                                                                 ))
                                                            }
                                                       </div>
                                                       <div className='flex gap-2'>
                                                            <fieldset className={`border rounded-lg ${conditionStock} flex mt-3 p-1`}>
                                                                 <legend className='text-xs'>Available Stock</legend>
                                                                 <span className='text-sm'>{val.availabilityStatus}</span>
                                                            </fieldset>
                                                            <fieldset className='border rounded-lg flex gap-2 mt-3 p-1'>
                                                                 <legend className='text-xs'>Stock</legend>
                                                                 <span className='text-sm flex justify-center mx-3'>{val.stock}</span>
                                                            </fieldset>
                                                            <fieldset className='border rounded-lg flex gap-2 mt-3 p-1'>
                                                                 <legend className='text-xs'>SKU</legend>
                                                                 <span className='text-xs italic'>{val.sku}</span>
                                                            </fieldset>
                                                       </div>
                                                  </div>
                                             }
                                             footer={
                                                  <div className='grid grid-cols-7 gap-1'>
                                                       <Modal 
                                                            Trigger={<Button className="col-span-3">Testimoni</Button>}
                                                            Title={`Review Product ${val.title} from Costumer`}
                                                            Content={
                                                                 <>
                                                                 {
                                                                      val.reviews.map((v, i) => (
                                                                           <Fragment key={v.comment || i}>
                                                                                <div className='border border-1 p-2 rounded-lg'>
                                                                                     <div>
                                                                                          <h1>{v.reviewerName}</h1>
                                                                                          <span className='text-xs font-light'>{moment.utc(v.date).format('dddd, DD MMM YYYY')}</span>
                                                                                          <p>{renderRating(v.rating)}</p>
                                                                                     </div>
                                                                                     <div className='mt-3'>
                                                                                          <p>{v.comment}</p>
                                                                                     </div>
                                                                                </div>
                                                                           </Fragment>
                                                                      ))
                                                                 }
                                                                 </>
                                                            }
                                                       />
                                                       {/* <Button className="col-span-3">View Ratings</Button> */}
                                                       {/* <Button variant="danger" className="col-span-2">Delete</Button> */}
                                                       <Modal 
                                                            Trigger={<Button variant="success" className="col-span-2">Buy</Button>}
                                                            Title={`QR CODE Product ${val.title}`}
                                                            Content={
                                                                  <div className='flex justify-center items-center'>
                                                                     <Image src={qrCodeImage} width={50} height={50} alt={val.title} />
                                                                 </div>
                                                            }
                                                       
                                                       />
                                                  </div>
                                             }
                                             // className={'w-auto h-auto'}
                                       /> 
                                   </Fragment>
                              )
                         })
                   :
                   <SkeletonBadgeWithBorder />

               }
          </>
     )
}
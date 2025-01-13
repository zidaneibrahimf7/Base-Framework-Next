'use client'
import { Form, Input, Label } from '@/components/custom/Form'
import { Select } from '@/components/custom/Form/select'
import { Loading } from '@/components/custom/Loading'
import Confirmation from '@/components/custom/Modal/confirmation'
import { Modal } from '@/components/custom/Modal/modal'
import { ToasterSuccess } from '@/components/custom/Toast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toBase64 } from '@/helpers/Helpers'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusCircleIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import toast from 'react-hot-toast'

export default function TryHitApi(){
     const url = `/api/product`
     const {data, isLoading} = useQuery({
          queryKey: ['learnHitApiPrisma'],
          queryFn: async () => {
               const response = await fetch(url)
               const result = await response.json()
               // console.log(result, '::ress')
               return result
          }
     })

     const [openModal, setOpenModal] = useState(false)

     const client = useQueryClient()
     const {mutate, ispending} = useMutation({
          mutationFn: async (id) => {
               const url = '/api/product'
               const params = {id}
               const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(params),
                    cache: 'default'
               })

               const result = await response.json()
               console.log(result)

               return result
          },
          onSuccess: (data) => {
               if(data.code === 0){
                    client.invalidateQueries({queryKey: ['learnHitApiPrisma']})
                    ToasterSuccess(data.message)
               }
          }
     })


     return (
     <>
          {
               isLoading ?
               <div className='flex justify-center'>
                    <Loading />
               </div>
               :
               <>
                <div className='flex gap-2 justify-end'>
                    <Modal
                         open={openModal}
                         onOpenChange={setOpenModal}
                         Trigger={<Button onClick={() => setOpenModal(true)} className="flex gap-2"><PlusCircleIcon /> Add Product</Button>}
                         Title={'Add Products'}
                         Content={<AddProducts onClose={() => setOpenModal(false)}  />}
                         FontTitle={'text-2xl'}
                         // Size={'max-w-[20rem]'}
                         // className={'dark:bg-white'}
                    />
               </div>
               <div className='flex justify-normal gap-2'>
                     <>
                         {
                              data?.content?.length > 0 ?
                              <>
                              {
                                   data.content.map((v, i) => {
                                        console.log(v, 'Values')
                                        return (
                                             <Fragment key={i}>
                                             <Card>
                                                  <CardHeader>
                                                       <div className='flex justify-end gap-2'>
                                                            <Confirmation 
                                                                 trigger={ <button className="rounded-full p-0.5 cursor-pointer"><XCircleIcon className='text-danger hover:text-danger/50 cursor-pointer' /></button>}
                                                                 title={`Are you sure want to delete ${v.title}`}
                                                                 buttonConfirmation={'delete'}
                                                                 onClickButton={() => mutate(v.id)}
                                                            
                                                            />
                                                            {/* <button onClick={() => console.log('circle x')} className="rounded-full p-0.5 cursor-pointer"><XCircleIcon className='text-danger hover:text-danger/50 cursor-pointer' /></button> */}
                                                       </div>
                                                       <CardTitle>{v.title}</CardTitle>
                                                  </CardHeader>
                                                  <CardContent>
                                                       <h1>{v.price}</h1>
                                                       <Image 
                                                            src={v.image}
                                                            width={80}
                                                            height={80}
                                                            alt='v'
                                                       
                                                       />
                                                       <Badge> <p>{v.category}</p></Badge>
                                                  </CardContent>
                                             </Card>
                                             </Fragment>
                                        )
                                   })
                              }
                              </>
                              :
                              'No data available'
                         }
                    </>
               </div>

               </>
          }
     </>
     )
}



export const AddProducts = ({onClose}) => {
     const [imagePreview, setImagePreview] = useState(null)

     const form = useForm({
          defaultValues: ({
               title: '',
               price: '',
               category: 'smartphone' ,
               image: ''
          }),
          onSubmit: async ({value}) => {
               // return console.log(value, "::value::")
               const params = {
                    title: value.title,
                    price: +value.price,
                    category: value.category,
                    image: value.image
               }

               // return console.log(params, '::params')

               mutate(params)
          }
     })

     const client = useQueryClient()
     const { mutate } = useMutation({
          mutationFn: async (params) => {
               // console.log(params, 'Paramss,,,')
              const url = `/api/product`
              const response = await fetch(url, {
                    method: "POST",
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(params),
                    cache: 'default'
              })

              const result = await response.json()

              return result
          },
          onSuccess: (data) => {
               if(data.code === 0){
                    client.invalidateQueries({queryKey: ['learnHitApiPrisma']})
                    toast.success(data.message)
                    onClose()
               } else {
                    toast.message(data.message)
               }
          }
     })

     const handleUploadPhoto =  async (e, field) => {
          const file = e?.currentTarget?.files[0];
          // console.log(file)
          const reader = new FileReader();
          // console.log(file, 'file')
          // console.log(reader, 'reader')
          // console.log(field, 'field')

          //    reader.onload = (event) => {
          //        const fileContent = event.target.result.split(',');
          //        // console.log(fileContent, 'www')
          //        // setFieldValue('contentValue.data', fileContent[1]);
          //      };

               reader.onloadend = () => {
                    // console.log(reader.result, 'asdadasd')
                    setImagePreview(reader.result);
               }

             if (file) {
                 reader.readAsDataURL(file);
                 try {
                     const base64DataUpload = await toBase64(file);
                    //  console.log(base64DataUpload, 'woww')
                     field.setValue(`data:${base64DataUpload.type};base64,${base64DataUpload.value}`)
                    //  onChangeUpload(base64DataUpload)
                     // setErrorMessagePhoto('')
                 } catch (error) {
                     console.error("Error converting to base64:", error);
                     // setErrorMessagePhoto('This file is required')
                 }
             } else {
                    console.log('picture not set')
             }
    }


     return (
          <>
               <Form form={form}>
                    <form.Field 
                         name="title"
                         children={(field) => {
                              return (
                                   <div>
                                        <div className="grid gap-2">
                                             <Label htmlFor={field.name} value="Product Name" isRequired={false} />
                                            <Input
                                                  id={field.name}
                                                  name={field.name}
                                                  // className="focus-visible:ring-offset-1 focus-visible:ring-1 focus-visible:ring-blue-400"
                                                  value={field.state.value}
                                                  onBlur={field.handleBlur}
                                                  onChange={(e) => field.handleChange(e.target.value)}
                                                  placeholder="Enter product's name..."
                                             />
                                        </div>
                                   </div>
                              )
                         }}
                    />
                    <form.Field 
                         name="price"
                         children={(field) => {
                              return (
                                   <div>
                                        <div className="grid gap-2">
                                             <Label htmlFor={field.name} value="Price" isRequired={false} />
                                             <Input
                                                  type="number"
                                                  id={field.name}
                                                  name={field.name}
                                                  // className="focus-visible:ring-offset-1 focus-visible:ring-1 focus-visible:ring-blue-400"
                                                  value={field.state.value}
                                                  onBlur={field.handleBlur}
                                                  onChange={(e) => field.handleChange(e.target.value)}
                                                  placeholder="Enter the price..."
                                             />
                                        </div>
                                   </div>
                              )
                         }}
                    />
                    <form.Field 
                         name="category"
                         children={(field) => {
                              return (
                                   <div>
                                        <div className="grid gap-2">
                                             <Label htmlFor={field.name} value="Category" isRequired={false} />
                                             <Select
                                                  id={field.name}
                                                  name={field.name}
                                                  onBlur={field.handleBlur}
                                                  onValueChange={(val) => field.handleChange(val) || "smartphone"}
                                                  // placeholder={'Select Category'}
                                                  defaultValue={'smartphone'}
                                                  options={[
                                                       {
                                                            value: 'smartphone',
                                                            text: 'Smartphone'
                                                       },
                                                       {
                                                            value: 'electronic',
                                                            text: 'Electronic'
                                                       },
                                                  ]}
                                                  className={''}        
                                             />
                                        </div>
                                   </div>
                              )
                         }}
                    />

                    <form.Field 
                         name="image"
                         children={(field) => {
                              return (
                                   <div>
                                        <div className="grid gap-2">
                                             <Label htmlFor={field.name} value="Image" isRequired={true} />
                                             <Input 
                                                  type="file"
                                                  id={field.name}
                                                  name={field.name}
                                                  onBlur={field.handleBlur}
                                                  onChange={(e) => handleUploadPhoto(e, field)}
                                             
                                             />
                                             
                                        </div>
                                   </div>
                              )
                         }}
                    
                    
                    />

                    <div className="flex justify-end">
                         <form.Subscribe
                              selector={(state) => [state.canSubmit, state.isSubmitting]}
                              children={([canSubmit, isSubmitting]) => {
                                        return (
                                             <Button type="submit" variant="success" disabled={!canSubmit}>
                                                  Submit
                                                  {/* { isSubmittingValue ? <div className="flex gap-2">Loading....<LoadingCustom size="20px" /></div>: <div className="flex gap-2"><Send size='20' />Submit</div>} */}
                                             </Button>
                                        )}}
                                   >
                         </form.Subscribe>
                    </div>
               </Form>
          </>
     )
}
'use client'

import { useState } from "react"
import ThemeComponents from "@/components/layout/ThemeComponents"

import { Modal } from "@/components/custom/Modal/modal/index"
import { SkeletonAvatar, SkeletonBadge, SkeletonBadgeWithBorder, SkeletonText } from "@/components/custom/Skeleton"
import { firstCase } from "@/helpers/Helpers"
import { DefaultLoading, LoadingCustom, LoadingV2 } from "@/components/custom/Loading"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/custom/Form/label"
import { Input } from "@/components/custom/Form/input"

import { CircleX, Send, X, Trash2 } from "lucide-react"

import { useForm } from "@tanstack/react-form"
import { Form } from "@/components/custom/Form/index"
import { FieldInfo } from "@/lib/validators/FieldInfo"
import { valid_msisdn, valid_name } from "@/lib/validators/Validator"
import { yupValidator } from "@tanstack/yup-form-adapter"
import { Select } from "@/components/custom/Form/select"

import FormDocumentation from "@/components/pages/Documentation/FormDocumentation"
import TableProducts from "@/components/pages/Documentation/Table/TableProducts"
import TableAnime from "@/components/pages/Documentation/Table/TableAnime"
import TableProductsDat from "@/components/pages/Documentation/Table/TableProductsDat"
import Confirmation from "@/components/custom/Modal/confirmation"
import TableAnimeTopDat from "@/components/pages/Documentation/Table/TableAnimeTopDat"
import ProductsCards from "@/components/pages/Documentation/CardsContent/ProductsCards"
import Carousel from "@/components/custom/Carousel"
import CarouselAutoPlay from "@/components/custom/Carousel/CarouselAutoPlay"
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'
import CarouselAutoScroll from "@/components/custom/Carousel/CarouselAutoScroll"
import DropdownMenu from "@/components/custom/DropdownMenu"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { IoMenu } from "react-icons/io5";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TagsInput } from "react-tag-input-component"



export default function Documentation(){
     const [open, setOpen] = useState(false)
     const [openEscapeDown, setOpenEscapeDown] = useState(false)
     const [openInteractOutside, setOpenInteractOutside] = useState(false)

     const [themeName, setThemeName] = useState('System')
     const handleThemes = (e) => setThemeName(firstCase(e))

     const [isSubmittingValue, setIsSubmittingValue] = useState(false);
     

     const form = useForm({
          validatorAdapter: yupValidator,
          defaultValues: {
               name: "",
               msisdn: "",
               country: "",
               hobbies: []
          },
          onSubmit: async ({value}) => {
               // console.log(value, '::values::')
               setIsSubmittingValue(true);
               await new Promise(resolve => setTimeout(resolve, 1000));
               console.log(value, '::values::');
               setIsSubmittingValue(false);
          }
     })

     const handleKeyDown = (e, field) => {
          const keyboardInput = e.key;
          const valueStringHashtags = e.target.value.trim();
      
          if (keyboardInput === ',' && valueStringHashtags) {
            field.pushValue(valueStringHashtags);
            console.log(field, '::Stringg::')
            e.target.value = '';
            e.preventDefault();
          }
        };

        const [toBeRemoved, setToBeRemoved] = useState(null);
        const handleRemove = (index, field) => {
          setToBeRemoved(index);
          setTimeout(() => {
              field.removeValue(index);
              setToBeRemoved(null);
          }, 300); // Sesuaikan durasi delay sesuai dengan durasi transisi
      };

      const router = useRouter()

     return (
          <>
          <main className="m-3 p-3">
               <header className="flex justify-between">
                    <h1 className="text-3xl">Documentation Page</h1>
                    <div className="flex gap-2">
                         <ThemeComponents themeName={handleThemes} />      
                    </div>
               </header>
               <fieldset className ='border rounded-lg flex gap-2 mt-3 py-5 p-4'>
                    <legend>Button</legend>
                    <Button variant="">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant='danger'>Error</Button>
                    <Button disabled={true}>Disabled</Button>
                    <Button variant="info">Info</Button>
               </fieldset>
               <fieldset className='border rounded-lg flex gap-2 mt-3 py-5 p-4'>
                    <legend>Badge</legend>
                    <Badge>Primary</Badge>
                    <Badge variant={'secondary'}>Secondary</Badge>
                    <Badge variant={'outline'}>Outline</Badge>
                    <Badge variant={'success'}>Success</Badge>
                    <Badge variant={'warning'}>Warning</Badge>
                    <Badge variant={'danger'}>Danger</Badge>
                    <Badge variant={'info'}>Info</Badge>
               </fieldset>
               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Skeleton</legend>
                         <div className="">
                              <SkeletonAvatar />    
                              {/* <Label className="italic">Skeleton Avatar</Label> */}
                              <Label value={'Skeleton Avatar'} isRequired={false} />
                              
                         </div>
                         <div className="">
                              <SkeletonText />    
                              {/* <Label className="italic">Skeleton Text</Label> */}
                              <Label value={'Skeleton Text'} isRequired={false} />
                         </div>
                         <div className="">
                              <SkeletonBadge />    
                              {/* <Label className="italic">Skeleton Badge</Label> */}
                              <Label value={'Skeleton Badge'} isRequired={false} />
                         </div>
                         <div className="">
                              <SkeletonBadgeWithBorder />    
                              {/* <Label className="italic">Skeleton Badge With Border</Label> */}
                              <Label value={'Skeleton Badge With Border'} isRequired={false} />
                         </div>
               </fieldset>
               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Modal</legend>
                    <Modal 
                         Trigger={<Button>Open Modal Size XS</Button>}
                         Title={'Playground Modal'}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         // className={''}
                         Size={'xs'}
                    />
                    <Modal 
                         Trigger={<Button>Open Modal Size SM</Button>}
                         Title={'Playground Modal'}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         // className={''}
                         Size={'sm'}
                    />
                    <Modal 
                         Trigger={<Button>Open Modal Size MD</Button>}
                         Title={'Playground Modal'}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         // className={''}
                         Size={'md'}
                    />
                    <Modal 
                         Trigger={<Button>Open Modal Size LG</Button>}
                         Title={'Playground Modal'}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         // className={''}
                         Size={'lg'}
                    />
                    <Modal 
                         Trigger={<Button>Open Modal Size XL</Button>}
                         Title={'Playground Modal'}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         // className={''}
                         Size={'xl'}
                    />
                    <Modal 
                         open={open}
                         onOpenChange={setOpen}
                         Trigger={<Button onClick={() => setOpen(true)}>Open Modal Content</Button>}
                         Title={'Playground Modal'}
                         Content={<Button variant='danger' onClick={() => setOpen(false)}>Cancel</Button>}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         Size={'max-w-[400px]'}
                         className={'dark:bg-blue-300'}
                    />
                    <Modal 
                         open={openEscapeDown}
                         onOpenChange={setOpenEscapeDown}
                         onEscapeKeyDown={(e) => {
                              e.preventDefault()
                              if(e.key === 'Escape') setOpenEscapeDown(true)}
                         }
                         Trigger={<Button onClick={() => setOpenEscapeDown(true)}>Open Modal Content Key Escape Down</Button>}
                         Title={'Playground Modal'}
                         Content={<Button variant='danger' onClick={() => setOpenEscapeDown(false)}>Cancel</Button>}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         Size={'max-w-[20rem]'}
                         className={'dark:bg-slate-300'}
                    />
                    <Modal 
                         open={openInteractOutside}
                         onOpenChange={setOpenInteractOutside}
                         onInteractOutside={(e) => {
                              e.preventDefault()
                              if(e.timestamp){
                                   setOpenInteractOutside(true)
                              }
                              }
                         }
                         Trigger={<Button onClick={() => setOpenInteractOutside(true)}>Open Modal Content Interact Outside</Button>}
                         Title={'Playground Modal'}
                         Content={<Button variant='danger' onClick={() => setOpenInteractOutside(false)}>Cancel</Button>}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         Size={'max-w-[20rem]'}
                         className={'dark:bg-slate-300'}
                    />

               </fieldset>

               <section className="grid grid-cols-2 gap-2">
                    <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                         <legend>Alert Dialog</legend>
                              <Confirmation 
                                   trigger={<Button variant="danger"><Trash2 />Delete</Button>}
                                   buttonConfirmation={'delete'}
                                   title={'Are you sure want to delete this?'}
                                   onClickButton={() => console.log('kedelete nih')}
                              />
                              <Confirmation 
                                   trigger={<Button variant="success">Submit</Button>}
                                   title={'Login'}
                                   subTitle={' '}
                                   buttonConfirmation={'submit'}
                                   onClickButton={() => console.log('kesubmit nih')}
                              />
                    </fieldset>
                    <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                          <legend>Dropdown Menu</legend>
                          <DropdownMenu
                              trigger={<Button>Open Dropdown Menu</Button>}
                              // title={'My Account'}
                              content={{
                                   // menu1: 'Go'
                                   menu1: <Button variant="link" onClick={() => console.log('GO')}>Go</Button>,
                                   menu2: <Button variant="link" onClick={() => router.push('/')}>Home</Button>
                              }}
                          />
                          <DropdownMenu
                              trigger={<button className="text-center flex justify-center"><IoMenu size={30} /></button>}
                              // title={'My Account'}
                              classNameBox={'bg-blue-100'}
                              classNameMenu={'focus:bg-warning'}
                              content={{
                                   menu1: <Button>Yuhu</Button>,
                                   menu2: <Link href="/" className={cn(buttonVariants({variant: 'danger'}))}>Home</Link>
                              }}
                          />
                    </fieldset>
               </section>

               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Loading</legend>
                    <section className="flex gap-5">
                         <div>
                              <DefaultLoading />
                              <span className="italic">Default Loading</span>
                         </div>
                         <div>
                              <div className="flex justify-center"><LoadingCustom className="text-primary" size="40px" /></div>
                              <span className="italic">Loader With Classname Custom</span>
                         </div>
                         <div>
                              <div className="flex justify-center"><LoadingV2 className="text-warning" size="40px" /></div>
                              <span className="italic">Another Loader...</span>
                         </div>
                    </section>
               </fieldset>

               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Cards</legend>
                    <ProductsCards />
               </fieldset>

               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Carousel</legend>
                    <div className="grid grid-cols-10">
                         <div className='col-span-2 col-start-1' name="Carousel Horizontal">
                              <h1>Carousel Default Horizontal</h1>
                              <Carousel
                                   view={'horizontal'}
                                   classNameContent={''}
                                   usingCard={true}
                                   classNameCarouselContent={''}
                                   content={{
                                        carousel1:  'Gambar 1',
                                        carousel2: <span>3</span>
                                   }}
                              />
                         </div>
                         <div className="col-span-2 col-start-3"  name="Carousel Vertical">
                                <h1>Carousel Default Vertical</h1>
                               <Carousel
                                   view={'vertical'}
                                   // className={'w-full max-w-xs'}
                                   classNameContent={'-mt-1 h-[320px]'}
                                   content={
                                        Array.from({ length: 5 }).map((_, index) => (
                                                  <CarouselItem key={index} className="pt-1 md:basis-1/2">
                                                  <div className="p-1">
                                                  <Card>
                                                       <CardContent className="flex aspect-square items-center justify-center p-1">
                                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                                       </CardContent>
                                                  </Card>
                                                  </div>
                                                  </CarouselItem>
                                             ))
                                   }
                              />
                              
                         </div>
                         <div className="col-span-2 col-start-5">
                                <h1>Carousel With Delay</h1>
                               <CarouselAutoPlay
                                   view={'horizontal'}
                                   classNameContent={''}
                                   content={
                                        Array.from({ length: 5 }).map((_, index) => (
                                                  <CarouselItem key={index} className="">
                                                  <div className="p-1">
                                                  <Card>
                                                       <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                                       </CardContent>
                                                  </Card>
                                                  </div>
                                                  </CarouselItem>
                                             ))
                                   }
                              />
                              
                         </div>
                         <div className="col-span-2 col-start-7">
                                <h1>Carousel With Auto Scroll</h1>
                               <CarouselAutoScroll
                                   view={'horizontal'}
                                   classNameContent={''}
                                   content={
                                   Array.from({ length: 5 }).map((_, index) => (
                                             <CarouselItem key={index} className="">
                                             <div className="p-1">
                                             <Card>
                                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                                       <span className="text-4xl font-semibold">{index + 1}</span>
                                                  </CardContent>
                                             </Card>
                                             </div>
                                             </CarouselItem>
                                        ))
                                   }
                              />
                              
                         </div>
                    {/* <ProductsCarousel /> */}
                    </div>
               </fieldset>

               <section className="grid grid-cols-2 gap-3">
                    <div>
                         <fieldset className="border rounded-lg mt-3 py-5 p-4">
                              <legend>Form</legend>
                              <Form form={form}>
                                   <form.Field
                                        name="name"
                                        validators={{
                                             onChange: ({value}) => 
                                                  !value
                                                       ? 'A first name is required'
                                                       : value.length < 3
                                                            ? 'First name must be at least 3 characters'
                                                            : undefined,
                                        }}
                                        children={(field) => {
                                             return (
                                                  <div>
                                                       <div className="grid gap-2">
                                                            <Label htmlFor={field.name} value={'Name'} isRequired={false} />
                                                            <Input 
                                                                 id={field.name}
                                                                 name={field.name}
                                                                 value={field.state.value}
                                                                 onBlur={field.handleBlur}
                                                                 onChange={(e) => field.handleChange(e.target.value)}
                                                                 className="focus-visible:ring-offset-1 focus-visible:ring-1 focus-visible:ring-blue-400"
                                                                 placeholder="Enter name...."
                                                            
                                                            />
                                                       </div>
                                                       {/* <FieldInfo field={field} /> */}
                                                       {field.state.meta.touchedErrors ? (
                                                            <p className="text-sm text-danger mt-1">{field.state.meta.touchedErrors}</p>
                                                       ) : null}
                                                  </div>
                                             )
                                        }}
                                   />

                                   <form.Field
                                        name="msisdn"
                                        validators={{
                                             onChange: valid_msisdn(true)
                                        }}
                                        children={(field) => {
                                             return (
                                             <div>
                                                  <div className="grid gap-2">
                                                       <Label htmlFor={field.name} value="Phone Number" isRequired={true} />
                                                       <Input
                                                            id={field.name}
                                                            name={field.name}
                                                            // className="focus-visible:ring-offset-1 focus-visible:ring-1 focus-visible:ring-blue-400"
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            placeholder="Enter phone number..."
                                                       />
                                                  </div>
                                                  <FieldInfo field={field} />
                                             </div>
                                             )
                                        }}
                                   />

                                   <form.Field 
                                        name='country'
                                        validators={{onChange: valid_name()}}
                                        children={(field) => {
                                             return (
                                                  <div>
                                                       <div className="grid gap-2">
                                                            <Label htmlFor={field.name} value="Country" />
                                                            <Select 
                                                                 id={field.name}
                                                                 name={field.name}
                                                                 onBlur={field.handleBlur}
                                                                 onValueChange={(val) => field.handleChange(val)}
                                                                 placeholder={'Select Country'}
                                                                 options={[
                                                                      {
                                                                           value: 'indonesia',
                                                                           text: 'indonesia'
                                                                      },
                                                                      {
                                                                           value: 'belanda',
                                                                           text: 'belanda'
                                                                      },
                                                                      {
                                                                           value: 'jerman',
                                                                           text: 'jerman'
                                                                      }
                                                                 ]}
                                                                 className={''}
                                                            
                                                            />
                                                       </div>
                                                  </div>
                                             )
                                        }}
                                   />

                                   <form.Field
                                        name="hobbies"
                                        mode="array"
                                        children={(field) => (
                                             <div>
                                                  <Label htmlFor={field.name} value="Hobbies" isRequired={true} />
                                                  {/* Using library React Tag Input */}
                                                  <TagsInput
                                                       name={field.name}
                                                       id={field.name}
                                                       value={field.state.value}
                                                       onChange={(val) => field.handleChange(val)}
                                                       placeHolder="enter hobbies"
                                                       classNames={{
                                                            input: ''
                                                       }}
                                                  />
                                                  {/* Manual Imput */}
                                                  {/* <div className="mb-3">
                                                       <div className="w-full p-1.5 text-center items-center gap-1 text-xs px-1 flex flex-wrap bg-gray-50/50 dark:bg-transparent text-sm rounded-lg rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors dark:focus:border-white">
                                                            {field.state.value.map((tag, index) => (
                                                                 <div className={`tag-item ${toBeRemoved === index ? 'transition-opacity duration-300 opacity-0' : ''}`} key={index}>
                                                                      <Badge className="flex gap-1 my-1.5 rounded-full p-1.5" >
                                                                           <span className="">{tag}</span >
                                                                           <div
                                                                                className="cursor-pointer hover:text-danger rounded-full hover:bg-red-200"
                                                                                onClick={() => handleRemove(index, field)}
                                                                           >
                                                                                <X size={15} className="" />
                                                                           </div>
                                                                      </Badge>
                                                                 </div>
                                                            ))}
                                                            <Input
                                                                 type="text"
                                                                 placeholder="Input yout hobbies"
                                                                 id={field.name}
                                                                 name={field.name}
                                                                 className="w-full text-gray-900 text-sm bg-transparent dark:text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                                 onKeyDown={(e) => handleKeyDown(e, field)}
                                                            />
                                                       </div>
                                                  </div> */}
                                        </div>
                                        )}
                                   />

                                   <div className="flex justify-end">
                                        <form.Subscribe
                                             selector={(state) => [state.canSubmit, state.isSubmitting]}
                                             children={([canSubmit, isSubmitting]) => {
                                                  return (
                                                       <Button type="submit" variant="success" disabled={!canSubmit}>
                                                            { isSubmittingValue ? <div className="flex gap-2">Loading....<LoadingCustom size="20px" /></div>: <div className="flex gap-2"><Send size='20' />Submit</div>}
                                                       </Button>
                                                  )}}
                                        >
                                        </form.Subscribe>
                                   </div>
                              </Form>
                         </fieldset>
                    </div>
                    <div>
                         <fieldset className="border rounded-lg mt-3 py-5 p-4">
                              <legend>Form V2</legend>
                              <FormDocumentation />
                         </fieldset>
                    </div>
               </section>

               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Data Table Basic</legend> 
                         <TableProducts />
               </fieldset>

               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Data Table with Filters</legend>
                         <TableAnime />
               </fieldset>

               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Data Table</legend>
                    {/* <TableProductsDat /> */}
                    <TableAnimeTopDat />
               </fieldset>
          </main>
          </>
     )
}
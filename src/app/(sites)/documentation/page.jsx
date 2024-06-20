'use client'

import { useState } from "react"
import ThemeComponents from "@/components/layout/ThemeComponents"

import { Modal } from "@/components/custom/Modal"
import { SkeletonAvatar, SkeletonBadge, SkeletonBadgeWithBorder, SkeletonText } from "@/components/custom/Skeleton"
import { firstCase } from "@/helpers/Helpers"
import { Loading, LoadingCustom, LoadingV2 } from "@/components/custom/Loading"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/custom/Form/label"
import { Input } from "@/components/custom/Form/input"

import { CircleX, Send, X } from "lucide-react"

import { useForm } from "@tanstack/react-form"
import { Form } from "@/components/custom/Form/index"
import { FieldInfo } from "@/lib/validators/FieldInfo"
import { valid_msisdn, valid_name } from "@/lib/validators/Validator"
import { yupValidator } from "@tanstack/yup-form-adapter"
import { Select } from "@/components/custom/Form/select"

import FormDocumentation from "@/components/pages/Documentation/FormDocumentation"



export default function Documentation(){
     const [open, setOpen] = useState(false)

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

     return (
          <>
          <main className="m-3 p-3">
               <header className="flex justify-between">
                    <h1 className="text-3xl">Playground Page</h1>
                    <div className="flex gap-2">
                         {/* <Label className="mt-3 pr-3">Theme: {themeName}</Label> */}
                         <Label className="mt-3 pr-3" value={`Theme: ${themeName}`} isRequired={false} />
                         <ThemeComponents themeName={handleThemes} />      
                    </div>
               </header>
               <fieldset className='border rounded-lg flex gap-2 mt-3 py-5 p-4'>
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
               </fieldset>
               <fieldset className='border rounded-lg flex gap-2 mt-3 py-5 p-4'>
                    <legend>Badge</legend>
                    <Badge>Primary</Badge>
                    <Badge variant={'secondary'}>Secondary</Badge>
                    <Badge variant={'outline'}>Outline</Badge>
                    <Badge variant={'success'}>Success</Badge>
                    <Badge variant={'warning'}>Warning</Badge>
                    <Badge variant={'danger'}>Danger</Badge>
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
                         Trigger={<Button onClick={() => setOpen(true)}>Open Modal Content</Button>}
                         Title={'Playground Modal'}
                         Content={<Button variant='danger' onClick={() => setOpen(false)}>Cancel</Button>}
                         SubTitle={'lorem ipsum dolor siamet'}
                         FontTitle={'text-2xl'}
                         CloseButton={() => setOpen(false)}
                         Size={'max-w-[400px]'}
                         className={'dark:bg-blue-300'}
                    />
               </fieldset>
               <fieldset className="border rounded-lg flex gap-2 mt-3 py-5 p-4">
                    <legend>Loading</legend>
                    <section className="flex gap-5">
                         <div>
                              <div className="flex justify-center"><Loading /></div>
                              <span className="italic">Loader Default</span>
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
                                             <div className="mb-3">
                                                  <div className="w-full p-1.5 text-center items-center gap-1 text-xs px-1 flex flex-wrap bg-gray-50/50 dark:bg-transparent text-sm rounded-lg rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors dark:focus:border-white">
                                                       {field.state.value.map((tag, index) => (
                                                            // <div className="tag-item" key={index}>
                                                            <div className={`tag-item ${toBeRemoved === index ? 'transition-opacity duration-300 opacity-0' : ''}`} key={index}>
                                                                 <Badge className="flex gap-1 my-1.5 rounded-full p-1.5" >
                                                                      <span className="">{tag}</span >
                                                                      {/* <div className="cursor-pointer hover:text-danger rounded-full hover:bg-red-200" onClick={() => field.removeValue(index)}><X size={15} className="" /></div> */}
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
                                             </div>
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
                    <legend>Data Table</legend>    
               </fieldset>
          </main>
          </>
     )
}
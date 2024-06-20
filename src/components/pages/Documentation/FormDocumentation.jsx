'use client'

import React, {useState} from 'react'

import { Form, Label } from '@/components/custom/Form'
import { useForm } from '@tanstack/react-form'
import { FieldInfo } from '@/lib/validators/FieldInfo'
import { DatePicker } from '@/components/custom/Date/DatePicker'
import { Button } from '@/components/ui/button'
import { LoadingCustom } from '@/components/custom/Loading'
import { Send } from 'lucide-react'
import { format } from 'date-fns'
import { SelectMultiple } from '@/components/custom/Select/SelectMultiple'
import { DateRangePicker } from '@/components/custom/Date/DateRangePicker'

export default function FormDocumentation(){
     const [isSubmittingValue, setIsSubmittingValue] = useState(false);

     const form = useForm({
          defaultValues: ({
               date: '2024-04-10',
               dateRange: {
                    from: "",
                    to: "",
               },
               status: [],  
          }),
          onSubmit: async ({value}) => {
               // console.log(value, "::value::")
               const params = {
                    date: format(value.date, 'yyyy-MM-dd'),
                    status: value.status.map((val, ind) => {
                         // console.log(val.value, '::VAL::')
                         return val.value
                    }),
                    dateFrom: format(value.dateRange.from, 'yyyy-MM-dd'),
                    dateTo: format(value.dateRange.to, 'yyyy-MM-dd')
               }

               
               setIsSubmittingValue(true);
               await new Promise(resolve => setTimeout(resolve, 1000));
               console.log(params, "::params::")
               // console.log(value, '::values::');
               setIsSubmittingValue(false);
          }
     })

     return (
          <>
               <Form form={form}>
                    <form.Field 
                         name="date"
                         // validators={}
                         children={(field) => {
                              return (
                                   <div>
                                        <div className="grid gap-2">
                                             <Label htmlFor={field.name} value="Date Picker" isRequired={false} />
                                             <DatePicker 
                                                  id={field.name}
                                                  name={field.name}
                                                  date={field.state.value}
                                                  onChange={(val) => field.handleChange(val)}
                                                  placeholder={'Pick a date'}
                                                  formatLabel={'d MMMM yyyy'}
                                             />
                                        </div>
                                   </div>
                              )
                         }}
                    />

                    <form.Field 
                      name="status"
                      children={(field) => {
                         return (
                              <div>
                                   <div className='grid gap-2'>
                                        <Label htmlFor={field.name} value="Status" isRequired={true} />
                                        <SelectMultiple 
                                             id={field.name}
                                             name={field.name}
                                             value={field.state.value}
                                             onChange={(val) => field.handleChange(val)}
                                             options={[
                                                  {value: 'male', label: 'Male'},
                                                  {value: 'female', label: 'Female'}
                                             ]}
                                             placeholder={'Pick your status'}
                                             clearable={true}
                                             useCallback={true}
                                             // defaultValue={[{value: 'male', label:'Male'}]}
                                        />
                                   </div>
                              </div>
                         )
                      }}
                    />

                    <form.Field 
                         name='dateRange'
                         children={(field) => {
                              return (
                                   <div>
                                        <div className='grid gap-2'>
                                             <Label htmlFor={field.name} value="Date Range" isRequired={false} />
                                             <DateRangePicker 
                                                   id={field.name}
                                                   name={field.name}
                                                   date={field.state.value}
                                                   onChange={(val) => field.handleChange(val)}
                                                   formatLabel="d MMMM yyyy"
                                                   placeholder="Select date range"
                                                   range={'weekly'}
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
                                                  { isSubmittingValue ? <div className="flex gap-2">Loading....<LoadingCustom size="20px" /></div>: <div className="flex gap-2"><Send size='20' />Submit</div>}
                                             </Button>
                                        )}}
                                   >
                         </form.Subscribe>
                    </div>
               </Form>

          </>
     )
}
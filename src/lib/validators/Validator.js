'use client'

import * as yup from 'yup'

export function valid_name(isRequired = true) {
     return yup
     .string()
     .matches(/^[aA-zZ\s]+$/, "Must be only alphabets")
     .when([], {
       is: () => isRequired,
       then: (schema) => schema.required(),
       otherwise: (schema) => schema.notRequired()
     })
   }

export function valid_msisdn(isRequired = true) {
     return yup
     .string()
     .matches(/^[0-9]+$/, "Must be only digits")
     .when([], {
          is: (val, value) => {
               return true
             },
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.notRequired()
     }  
     )
}

// export function valid_hobbies(name) {
//      return yup
//      .array()
//      .of(
//           yup.object().shape({
//                name:yup.string()
//           })
//      )
//      .min(1, 'At least one hobby is required')
// }
export function valid_hobbies() {
     return yup.array().of(yup.string().required()).min(1, 'At least one hobby is required')
}
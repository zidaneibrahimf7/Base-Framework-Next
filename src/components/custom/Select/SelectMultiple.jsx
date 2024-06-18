'use client'
import React, {useState} from 'react'
import Select, {stylesConfig} from 'react-select'
import makeAnimated from 'react-select/animated'
import AsyncSelect from 'react-select/async'


export function SelectMultiple({
     options, //array object
     defaultValue,
     placeholder,
     clearable,
     useCallback,
     ...props
}){

     const animatedComponents = makeAnimated();

     const optionsValue = (inputValue) => {
          return options
     }

     const promiseOptions = (inputValue) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(optionsValue);
            }, 10000);
     });

     return (
          <>
          {
               useCallback ?
               <AsyncSelect 
                    // options={options}
                    components={animatedComponents}
                    defaultValue={defaultValue}
                    isMulti
                    styles={{
                         control: (baseStyle, state) => ({
                              ...baseStyle,
                              borderColor: '#e1e7ef',
                              backgroundColor: 'white'
                         }),
                         multiValue: (styles, { data }) => {
                              return {
                                ...styles,
                                color: 'white',
                                backgroundColor: '#000000',
                                borderRadius: '20px',
                                ":hover": {
                                   opacity: 50,
                                   backgroundColor: '#000000'
                                }
                              };
                            },
                            multiValueLabel: (styles, { data }) => ({
                              ...styles,
                              color: 'white',
                         }),
                         multiValueRemove: (styles, { data }) => ({
                              ...styles,
                              // color: data.color,
                              ':hover': {
                                borderRadius: '20px',
                                backgroundColor: 'rgb(254 202 202)',
                                color: 'red',
                              },
                            }),
                    }}
                    placeholder={placeholder}
                    {...props}
                    isClearable={clearable ? true : false}
                    loadOptions={promiseOptions}
                    defaultOptions
                    // cacheOptions
               />
               :
               <Select
               options={options}
               components={animatedComponents}
               defaultValue={defaultValue}
               isMulti
               styles={{
                    control: (baseStyle, state) => ({
                         ...baseStyle,
                         borderColor: '#e1e7ef',
                         backgroundColor: 'white'
                    }),
                    multiValue: (styles, { data }) => {
                         return {
                           ...styles,
                           color: 'white',
                           backgroundColor: '#000000',
                           borderRadius: '20px',
                           ":hover": {
                              opacity: 50,
                              backgroundColor: '#000000'
                           }
                         };
                       },
                       multiValueLabel: (styles, { data }) => ({
                         ...styles,
                         color: 'white',
                    }),
                    multiValueRemove: (styles, { data }) => ({
                         ...styles,
                         // color: data.color,
                         ':hover': {
                           borderRadius: '20px',
                           backgroundColor: 'pink',
                           color: 'red',
                         },
                       }),
               }}
               placeholder={placeholder}
               {...props}
               isClearable={clearable ? true : false}
          />
          }
          </>
     )
}
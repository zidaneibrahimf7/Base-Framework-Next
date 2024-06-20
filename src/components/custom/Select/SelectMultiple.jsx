'use client'
import React, {useState} from 'react'
import Select, {components, stylesConfig} from 'react-select'
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

     const customStyles = {
          control: (baseStyle, state) => ({
               ...baseStyle,
               borderColor: 'hsl(var(--input))',
               backgroundColor: 'hsl(var(--background))',
          }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
               return {
                    ...styles,
                    borderColor: 'hsl(var(--input))',
                    backgroundColor: 'hsl(var(--background))',
                    color: 'hsl(var(--primary))',
                    padding: '10px',
                    ':hover': {
                         opacity: 10,
                         // borderColor: 'yellow',
                         backgroundColor: 'hsl(var(--primary-foreground))'
                    }
               }
          },
          menuList:  (styles, {data, }) => {
               return {
                    ...styles,
                    borderColor: 'hsl(var(--input))',
                    backgroundColor: 'hsl(var(--background))',
                    color: 'hsl(var(--primary))',
               }
          },
          placeholder: (styles, { data }) => {
               return {
                 ...styles,
                 color: 'hsl(var(--primary))',
               };
             },
          input: (styles, { data }) => {
               return {
                 ...styles,
                 color: 'hsl(var(--primary))',
               };
             },
          multiValue: (styles, { data }) => {
               return {
                 ...styles,
                 color: 'hsl(var(--primary-foreground))',
                 backgroundColor: 'hsl(var(--primary))',
                 borderRadius: '20px',
                 ":hover": {
                    opacity: 10,
                    backgroundColor: 'hsl(var(--primary))'
                 }
               };
             },
          multiValueLabel: (styles, { data }) => ({
               ...styles,
               color: 'hsl(var(--primary-foreground))',
          }),
          multiValueRemove: (styles, { data }) => ({
               ...styles,
               // color: data.color,
               ':hover': {
                 borderRadius: '20px',
                 backgroundColor: 'rgb(254 202 202)',
                 color: 'red',
                 cursor: 'pointer'
               },
          }),
          indicatorsContainer: (styles, { data }) => ({
               ...styles,
               ':hover': {
                 cursor: 'pointer',
               },
          }),
          noOptionMessage: (styles, { data }) => ({
               ...styles,
               borderColor: 'hsl(var(--input))',
               color: 'yellow'
               // color: data.color,
               // ':hover': {
               //   borderRadius: '20px',
               //   backgroundColor: 'rgb(254 202 202)',
               //   color: 'red',
               // },
          }),
     }
      

     return (
          <>
          {
               useCallback ?
               <AsyncSelect 
                    // options={options}
                    // components={Control}
                    components={animatedComponents}
                    defaultValue={defaultValue}
                    isMulti
                    styles={customStyles}
                    placeholder={placeholder}
                    {...props}
                    isClearable={clearable ? true : false}
                    loadOptions={promiseOptions}
                    defaultOptions
                    IndicatorSeparator={false}
                    // cacheOptions
               />
               :
               <Select
                    options={options}
                    components={animatedComponents}
                    defaultValue={defaultValue}
                    isMulti
                    styles={customStyles}
                    placeholder={placeholder}
                    {...props}
                    isClearable={clearable ? true : false}
               />
          }
          </>
     )
}
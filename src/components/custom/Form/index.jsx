// export function FieldInfo({
//   field
// }) {
//   console.log(field.state.meta)
//   return (
//     <>
//       {field.state.meta.touchedErrors ? (
//                 <p className="text-sm text-destructive mt-1">{field.state.meta.touchedErrors}</p>
//             ) : null}
//             {field.state.meta.isValidating ? (
//                 <p className="text-sm text-muted-foreground">Validating...</p>
//             ) : null}
//     </>
//   )
// }

export function Form({
     form,
     children
   }) {
     return (
       <form
         className="grid gap-6"
         onSubmit={(e) => {
           e.preventDefault()
           e.stopPropagation()
           form.handleSubmit()
         }}
       >
         {children}
       </form>
     )
}

export * from './input'
export * from './label'
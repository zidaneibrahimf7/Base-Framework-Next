export function FieldInfo({
     field
   }) {
     return (
       <>
         {field.state.meta.touchedErrors ? (
                   <p className="text-sm text-danger mt-1">{field.state.meta.touchedErrors}</p>
               ) : null}
               {field.state.meta.isValidating ? (
                   <p className="text-sm text-muted-foreground">Validating...</p>
               ) : null}
       </>
     )
   }
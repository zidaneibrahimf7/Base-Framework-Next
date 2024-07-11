import {
  DropdownMenu as DropdownMenuUI,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function DropdownMenu({
     trigger,
     title,
     content,
     classNameBox,
     classNameMenu,
     ...props
     
}){
     return (
               <DropdownMenuUI {...props}>
                    <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
                    <DropdownMenuContent className={classNameBox}>
                         {
                              title ?
                              <>
                                   <DropdownMenuLabel>{title}</DropdownMenuLabel>
                                   <DropdownMenuSeparator />
                              </>
                              :

                              false
                         }
                         {Object.keys(content).map((key) => (
                              <DropdownMenuItem key={key} className={classNameMenu}>
                                   {content[key]}
                              </DropdownMenuItem>
                         ))}
                    </DropdownMenuContent>
               </DropdownMenuUI>
     )
}
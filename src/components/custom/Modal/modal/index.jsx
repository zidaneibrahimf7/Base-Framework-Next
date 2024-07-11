'use client'

import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
     DialogClose
   } from "@/components/ui/dialog"



export function Modal({
     Trigger,
     Title,
     SubTitle,
     Content,
     Footer,
     className,
     CloseButton,
     FontTitle,
     Size,
     onCloseAutoFocus,
     onEscapeKeyDown,
     onInteractOutside,
     onPointerDownOutside,
     ...props
}){
     let size

     switch(Size){
          case 'xs':
               size = className + " " +  'max-w-[20rem]'
               break;
          case 'sm':
               size=  className + " " + 'max-w-[30rem]'
               break;
          case 'md':
               size = className + " " + 'max-w-[50rem]'
               break;
          case 'lg':
               size = className + " " + 'max-w-[80rem]'
               break;
          case 'xl':
               size = className + " " + 'max-w-[100rem]'
               break;
          default:
               size = className + " " + Size
               break;
     }

     return (
          <Dialog {...props}>
               <DialogTrigger asChild>{Trigger}</DialogTrigger>
               {/* <DialogContent className={className ? className : "sm:max-w-[425px]"}> */}
               <DialogContent className={`${size}`} onEscapeKeyDown={onEscapeKeyDown} onPointerDownOutside={onPointerDownOutside} onCloseAutoFocus={onCloseAutoFocus} onInteractOutside={onInteractOutside}>
                    <DialogHeader>
                         <DialogTitle className={FontTitle ? FontTitle : 'text-md'}>{Title || '?'}</DialogTitle>
                         <DialogDescription>{SubTitle}</DialogDescription>
                    </DialogHeader>
                    {Content}
               <DialogFooter>{ Footer }</DialogFooter>
               {CloseButton ? (
               <DialogClose>{CloseButton}</DialogClose>
               ) : null}
               </DialogContent>
        </Dialog>
     )
}
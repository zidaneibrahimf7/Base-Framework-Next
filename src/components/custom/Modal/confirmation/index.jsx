'use client'

import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
   } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Send, Trash2 } from "lucide-react"



export default function Confirmation({
     trigger,
     title,
     subTitle,
     buttonConfirmation,
     onClickButton
}){
     let uiConfirmation
     let classNameButtonConfirm
     switch(buttonConfirmation){
          case 'submit':
               classNameButtonConfirm = 'bg-success text-primary shadow hover:bg-success/90 flex gap-2'
               uiConfirmation = <><Send />Submit</>
               break;
          case 'delete':
               classNameButtonConfirm = 'bg-danger text-primary-foreground shadow hover:bg-error/90 flex gap-2'
               uiConfirmation = <><Trash2 />Delete</>
               break;
          default:
               classNameButtonConfirm = 'bg-primary text-primary-foreground shadow hover:bg-primary/60 flex gap-2'
               uiConfirmation = <>Confirm</>
               break;
     }

     return (
          <>
          <AlertDialog>
               <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
               <AlertDialogContent>
               <AlertDialogHeader>
                    <AlertDialogTitle>{title ? title : 'Are you absolutely sure?'}</AlertDialogTitle>
                    <AlertDialogDescription>
                         {subTitle ?
                          subTitle :
                              "This action cannot be undone. This will permanently delete your data and remove your data from our servers."
                         }
                    </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onClickButton} className={classNameButtonConfirm}>{uiConfirmation}</AlertDialogAction>
               </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
          </>
     )
}
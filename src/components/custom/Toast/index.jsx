'use client'
import toast, { Toaster } from "react-hot-toast"
import { CircleAlert } from "lucide-react"

export const ToasterNotif = (message, position) => {
     let positionToast
     switch(position){
          case 'left':
               positionToast = 'bottom-left'
               break;
          case 'right':
               positionToast = 'bottom-right'
               break;
          case 'bottom':
               positionToast = 'bottom-center'
               break;
          case 'top':
               positionToast = 'top-center'
               break;
          default:
               positionToast = 'bottom-right'
               break;
     }

     toast(message, {
               icon: '👏',
               duration: 2000,
               position: positionToast,
     })
}

export const ToasterSuccess = (message, position) => {
     let positionToast
     switch(position){
          case 'left':
               positionToast = 'bottom-left'
               break;
          case 'right':
               positionToast = 'bottom-right'
               break;
          case 'bottom':
               positionToast = 'bottom-center'
               break;
          case 'top':
               positionToast = 'top-center'
               break;
          default:
               positionToast = 'bottom-right'
               break;
     }

     toast.success(message, {
               duration: 2000,
               position: positionToast,
               style: {
                    border: '1px solid #55CD6C',
                    padding: '12px',
                    color: '#FFFAEE',
                    backgroundColor: '#55CD6C'
               },
               iconTheme: {
                    primary: '#FFFAEE',
                    secondary: '#55CD6C',
               },
     })
}

export const ToasterError = (message, position) => {
     let positionToast
     switch(position){
          case 'left':
               positionToast = 'bottom-left'
               break;
          case 'right':
               positionToast = 'bottom-right'
               break;
          case 'bottom':
               positionToast = 'bottom-center'
               break;
          case 'top':
               positionToast = 'top-center'
               break;
          default:
               positionToast = 'bottom-right'
               break;
     }

     toast.error(message, {
               duration: 2000,
               position: positionToast,
                style: {
                    border: '1px solid hsl(0 100% 64%)',
                    padding: '12px',
                    color: '#FFFAEE',
                    backgroundColor: 'hsl(0 100% 64%)'
               },
               iconTheme: {
                    primary: '#FFFAEE',
                    secondary: 'hsl(0 100% 64%)'
               },
     })
}

export const ToasterWarning = (message, position) => {
     let positionToast
     switch(position){
          case 'left':
               positionToast = 'bottom-left'
               break;
          case 'right':
               positionToast = 'bottom-right'
               break;
          case 'bottom':
               positionToast = 'bottom-center'
               break;
          case 'top':
               positionToast = 'top-center'
               break;
          default:
               positionToast = 'bottom-right'
               break;
     }

     toast.error(message, {
               duration: 2000,
               position: positionToast,
               icon: <CircleAlert size={23} />,
               style: {
                    border: '1px solid hsl(42.07 78.63% 54.12%)',
                    padding: '12px',
                    color: '#FFFAEE',
                    backgroundColor: 'hsl(42.07 78.63% 54.12%)'
               },
               iconTheme: {
                    primary: '#FFFAEE',
                    secondary: 'hsl(0 100% 64%)'
               },
     })
}


'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Cards({
     title,
     subTitle,
     content,
     footer,
     className,
     ...props
}) {
     return (
          <Card className={className} {...props}>
               <CardHeader>
                    <CardTitle>{title ? title: '?'}</CardTitle>
                    {subTitle ? <CardDescription>{subTitle}</CardDescription> : false}
               </CardHeader>
               <CardContent className="">
                    {content}
               </CardContent>
                    {footer ? <CardFooter>{footer}</CardFooter> : false}
          </Card>
     )
}
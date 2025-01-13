import prisma from '@/lib/prismaClient'

export const getAllProduct = async () => {
     const post = await prisma.post.findMany({})
     return post
}

export const createProduct = async (title, price, category, image) => {
     const post = await prisma.post.create({
          data: {
               title,
               price,
               category,
               image
          }
     })

     return post
}

export const deleteProduct = async (id) => {
     const post = await prisma.post.delete({
          where: {
               id: id
          }
     })

     return post
}
import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server"
import { createProduct, deleteProduct, getAllProduct } from "../../../../prisma/post";

export async function GET(req, res){
     try {
          const getAllProducts = await getAllProduct()
          // console.log(getAllProducts, '::getAlls')

          // return new Response(getAllProducts, {status: 201})
          return new Response(JSON.stringify({
               code: 0,
               content: getAllProducts, // Mengambil hasil produk yang ada dari database
               message: 'show all products'
          }), {
               status: 200,
               headers: {
                    'Content-Type': 'application/json'
               }
          });
     }
     //  try {
     //           const users = await prisma.post.findMany({});
     //           return new Response(JSON.stringify(users), { status: 200 });
     //      } 
     catch (error) {
          console.log('Error Message: ', error)
          return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
     }
}

export async function POST(req, res){
     try {
          const {title, price, category, image} = await req.json()
          // console.log(req, req.body, 'asdsads')
          // console.log(image, title, 'wiwiw')
          const newProduct = await createProduct(title, price, category, image)
          // console.log(newProduct, 'New Product from Prisma')
          // return new Response(newProduct)
          return new Response(JSON.stringify({
               code: 0,
               content: newProduct, // Mengambil hasil produk yang ada dari database
               message: 'Add Products Success'
          }), {
               status: 200,
               headers: {
                    'Content-Type' : 'application/json'
               }
          })
          // const post = await prisma.post.create({
          //      data: {
          //           title,
          //           price,
          //           category
          //      }
          // })

          // return new Response(JSON.stringify(post), { status: 200 });
     }
     catch (error) {
          console.log('Error Message: ', error)
          return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
     }
}

export async function DELETE(req, res){
     try {
          const {id} = await req.json()
          const deleteProducts = await deleteProduct(id)

          return new Response(JSON.stringify({
               code: 0,
               content: {}, // Mengambil hasil produk yang ada dari database
               message: deleteProducts ? 'Delete products success' : ' '
          }), {
               status: 200,
               headers: {
                    'Content-Type' : 'application/json'
               }
          })
     } catch (err) {
          console.log('Error Message', err)
          return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
     }
}
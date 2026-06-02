import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const SHIPPING_THRESHOLD = 75
const SHIPPING_COST = 7.99

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, address, city, state, zip, items } = body

    if (!email || !name || !address || !city || !state || !zip || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const subtotal: number = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    )
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
    const total = subtotal + shipping

    const order = await prisma.order.create({
      data: {
        email,
        name,
        address,
        city,
        state,
        zip,
        subtotal,
        shipping,
        total,
        items: {
          create: items.map((item: { productSlug: string; productName: string; price: number; quantity: number }) => ({
            productSlug: item.productSlug,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json({ success: true, orderId: order.id, order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

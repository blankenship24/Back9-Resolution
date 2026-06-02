import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [orders, subscriberCount] = await Promise.all([
      prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.emailSubscriber.count(),
    ])

    const orderCount = orders.length
    const revenue = orders.reduce((sum: number, order) => sum + order.total, 0)
    const recentOrders = orders.slice(0, 10)

    return NextResponse.json({ orderCount, revenue, recentOrders, subscriberCount })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

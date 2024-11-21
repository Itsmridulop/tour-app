import { useEffect, useState } from "react"
import { CalendarIcon, CreditCardIcon, EditIcon, PlusIcon, TrashIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/component/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/Card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/component/Dialog"
import { Badge } from "@/component/Badge"
import { BookingChart } from "../bookings/BookingChart"
import { useBookingOfUser } from "../bookings/useBookingOfUser"
import { useParams } from "react-router-dom"

import Spinner from "@/component/Spinner"
import { useAlert } from "@/component/Alert"
import { useUpdateBooking } from "../bookings/useUpdateBooking"

const mockBookings = [
  {
    id: "1",
    tour: { name: "Paris Explorer", startDates: [new Date("2023-07-15")] },
    members: 2,
    createdAt: new Date("2023-06-01"),
    paidAt: null,
    canceledAt: null,
    paymentMethod: "credit-card",
    status: "booked",
    paid: false,
  },
  {
    id: "2",
    tour: { name: "Rome Adventure", startDates: [new Date("2023-08-20")] },
    members: 3,
    createdAt: new Date("2023-06-15"),
    paidAt: new Date("2023-06-16"),
    canceledAt: null,
    paymentMethod: "UPI",
    status: "paid",
    paid: true,
  },
  {
    id: "3",
    tour: { name: "Tokyo Discovery", startDates: [new Date("2023-09-10")] },
    members: 1,
    createdAt: new Date("2023-06-20"),
    paidAt: new Date("2023-06-21"),
    canceledAt: null,
    paymentMethod: "credit-card",
    status: "confirmed",
    paid: true,
  },
  {
    id: "4",
    tour: { name: "New York City Tour", startDates: [new Date("2023-07-05")] },
    members: 4,
    createdAt: new Date("2023-06-10"),
    paidAt: null,
    canceledAt: new Date("2023-06-25"),
    paymentMethod: "cash",
    status: "canceled",
    paid: false,
  },
  {
    id: "5",
    tour: { name: "Sydney Harbour Tour", startDates: [new Date("2023-08-01")] },
    members: 2,
    createdAt: new Date("2023-06-05"),
    paidAt: new Date("2023-06-06"),
    canceledAt: null,
    paymentMethod: "credit-card",
    status: "completed",
    paid: true,
  },
]

export default function UserProfile() {
  const { id } = useParams()
  const { bookingData, isLoading } = useBookingOfUser(id ?? "")
  const { showAlert } = useAlert()
  const { updateBooking } = useUpdateBooking()

  const [bookings, setBookings] = useState(bookingData?.data)

  useEffect(() => {
    setBookings(bookingData?.data)
  }, [bookingData?.data])

  const handlePayBooking = (bookingId: string) => {
    showAlert('Yet to implement')
  }

  const handleCancelBooking = (bookingId: string) => {
    const updatedBooking = bookings?.map(booking => booking._id === bookingId ? { ...booking, status: 'canceled', canceledAt: Date.now() } : booking).filter(booking => booking._id === bookingId)[0]
    console.log(updatedBooking)
    updateBooking({ bookingData: { status: 'canceled', canceledAt: Date.now() }, id: bookingId },{
      onSuccess: () => setBookings(bookings?.map(booking => 
        booking._id === bookingId ? { ...booking, status: "canceled", canceledAt: new Date() } : booking
      ))
    })
    
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked": return "bg-yellow-500"
      case "paid": return "bg-green-500"
      case "canceled": return "bg-red-500"
      case "completed": return "bg-blue-500"
      case "confirmed": return "bg-purple-500"
      default: return "bg-gray-500"
    }
  }

  if (isLoading) return <Spinner />

  return (
    <div className="container mx-auto p-4 max-w-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      <div className="mb-8">
        <BookingChart bookings={bookings || []} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookings?.map((booking) => (
          <Card key={booking._id} className="w-full">
            <CardHeader>
              <CardTitle>{typeof booking.tour === 'object' && booking.tour.name}</CardTitle>
              <CardDescription>
                <CalendarIcon className="inline-block mr-2" />
                {typeof booking.tour === 'object' && format(booking.tour.startDates[0], "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Members: {booking.members}</p>
              <p>Created: {format(booking.createdAt, "MMMM d, yyyy")}</p>
              <p>Payment Method: {booking.paymentMethod}</p>
              <Badge className={`mt-2 ${getStatusColor(booking.status)}`}>
                {booking.status}
              </Badge>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 justify-between">
              {!booking.paid && booking.status !== "canceled" && (
                <Button onClick={() => handlePayBooking(booking._id)}>
                  <CreditCardIcon className="mr-2 h-4 w-4" /> Pay Now
                </Button>
              )}
              {booking.status !== "canceled" && (
                <Button variant="destructive" onClick={() => handleCancelBooking(booking._id)}>
                  <TrashIcon className="mr-2 h-4 w-4" /> Cancel
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <EditIcon className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Booking</DialogTitle>
                    <DialogDescription>
                      Make changes to your booking here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    {/* Add form fields for editing booking here */}
                    <p>Edit form would go here</p>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Create New Booking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new booking.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>New booking form would go here</p>
            </div>
            <DialogFooter>
              <Button type="submit">Create Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}


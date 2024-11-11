import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/component/Avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/Card"
import { Button } from "@/component/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/component/Dialog"
import { FaEdit, FaTrashAlt, FaPlus, FaUserEdit, FaKey, FaUserTimes } from 'react-icons/fa'
import { useUser } from './useUser'
import { useDeleteMe } from './useDeleteMe'
import { useTours } from '../tours/useTours'
import { useUpdateTour } from '../tours/useUpdateTour'
import { useCreateTour } from '../tours/useCreateTour'
import { useDeleteTour } from '../tours/useDeleteTour'

import Spinner from '@/component/Spinner'
import Modal from '@/component/Modal'
import UpdateProfileForm from './UpdateProfileForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import TourEditForm from '../tours/EditTourForm'
import Stats from '../tours/Stats'
import Siderbar from '@/component/Siderbar'

export default function Component() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const { user, isLoading } = useUser()
    const { tours: sampleTours, isLoading: isTourLoading } = useTours("sort=price", false)
    const { deleteMe, isPending } = useDeleteMe()
    const { createTour, isPending: isCreating } = useCreateTour()
    const { deleteTour, isPending: isDeleting } = useDeleteTour()
    const { updateTour, isPending: isUpdating } = useUpdateTour()



    if (isLoading || isTourLoading || isCreating || isDeleting || isUpdating) return <Spinner />

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={`${user?.data.photo || '/src/public/img/users/defualt.jpg'}`} alt="User's avatar" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.data.name}</h1>
                        <p className="text-gray-500">{user?.data.email}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Modal>
                        <Modal.Open opens='updateMe'>
                            <Button variant="outline" className="w-full md:w-auto">
                                <FaUserEdit className="mr-2 h-4 w-4" /> Update Profile
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="updateMe">
                            <UpdateProfileForm user={user?.data} />
                        </Modal.Window>
                    </Modal>
                    <Modal>
                        <Modal.Open opens='updatePass'>
                            <Button variant="outline" className="w-full md:w-auto">
                                <FaKey className="mr-2 h-4 w-4" /> Change Password
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="updatePass">
                            <UpdatePasswordForm />
                        </Modal.Window>
                    </Modal>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="w-full md:w-auto" onClick={() => deleteMe()}>
                                <FaUserTimes className="mr-2 h-4 w-4" /> {isPending ? 'Deleting...' : 'Delete Account'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={() => {
                                    setIsDeleteDialogOpen(false)
                                }}>
                                    Yes, delete my account
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {
                user?.data.role === "admin" &&
                <>
                    <div className='flex'>

                        <Siderbar />

                    </div>
                    <div className='flex-1 p-4'>

                        <Stats />

                        <h2 className="text-xl font-semibold mb-4">Manage Tours</h2>

                        <Card>
                            <CardHeader>
                                <CardTitle>Your Tours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 h-96 overflow-scroll">
                                    {sampleTours?.data.map((tour) => (
                                        <div key={tour.id} className="flex items-center  justify-between p-4 bg-gray-100 rounded-lg">
                                            <div>
                                                <h3 className="font-semibold">{tour.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {tour.duration} | Difficulty: {tour.difficulty}
                                                </p>
                                                <p className="text-sm font-medium">${tour.price}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Modal>
                                                    <Modal.Open opens='updateTour'>
                                                        <Button variant="ghost" size="sm" >
                                                            <FaEdit className="h-4 w-4" />
                                                        </Button>
                                                    </Modal.Open>
                                                    <Modal.Window name="updateTour">
                                                        <TourEditForm tour={tour} updationFn={updateTour} title='Edit Tour' />
                                                    </Modal.Window>
                                                </Modal>
                                                <Button variant="ghost" size="sm">
                                                    <FaTrashAlt className="h-4 w-4" onClick={() => deleteTour(tour._id)} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Modal>
                                        <Modal.Open opens='createTour'>
                                            <Button>
                                                <FaPlus className="h-4 w-4 mr-2" />
                                                Add New Tour
                                            </Button>
                                        </Modal.Open>
                                        <Modal.Window name="createTour">
                                            <TourEditForm updationFn={createTour} title='Create Tour' />
                                        </Modal.Window>
                                    </Modal>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </>
            }
        </div>
    )
}
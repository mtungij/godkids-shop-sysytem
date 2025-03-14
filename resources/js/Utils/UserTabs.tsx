import UserTab from '@/components/user-tab'
import { User } from '@/types'
import { TrafficCone, ShoppingBasket, LandmarkIcon, ListCheck } from 'lucide-react'

const UserTabs = ({ user }: { user: User}) => {
  return (
    <nav className="flex items-center gap-3 overflow-x-auto scroll-bar whitespace-nowrap">
                    <UserTab
                        href={route("users.transactions", user.id)}
                        label="Transactions"
                        icon={<TrafficCone className="size-4" />}
                    />
                    <UserTab
                        href={route("users.orders", user.id)}
                        label="Orders"
                        icon={<ShoppingBasket className="size-4" />}
                    />
                    <UserTab
                        href={route("users.expenses", user.id)}
                        label="expenses"
                        icon={<ShoppingBasket className="size-4" />}
                    />
                    <UserTab
                        href={route("users.creditCollections", user.id)}
                        label=" Credit Collections"
                        icon={<LandmarkIcon className="size-4" />}
                    />
                    <UserTab
                        href={route("users.purchases", user.id)}
                        label="Purchases"
                        icon={<ListCheck className="size-4" />}
                    />
                </nav>
  )
}

export default UserTabs
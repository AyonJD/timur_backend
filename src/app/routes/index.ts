import express from 'express'
import { NftRoute } from '../modules/nft/nft.route'
import { CollectionRoute } from '../modules/collection/collection.route'
import { BidRoute } from '../modules/bid/bid.route'
import { OfferRoute } from '../modules/offer/offer.route'
import { UserRoute } from '../modules/auth/user/user.route'
import { AdminRoute } from '../modules/auth/admin/admin.route'

const router = express.Router()

const routes = [
  {
    path: '/nft',
    route: NftRoute,
  },
  {
    path: '/collections',
    route: CollectionRoute,
  },
  {
    path: '/bids',
    route: BidRoute,
  },
  {
    path: '/offers',
    route: OfferRoute,
  },
  {
    path: '/auth/user',
    route: UserRoute,
  },
  {
    path: '/auth/admin',
    route: AdminRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router

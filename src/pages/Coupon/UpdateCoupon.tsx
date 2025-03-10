import LayoutUpdateCoupon from '@/components/pages/Coupon/UpdateCoupon'
import { useLocation } from 'react-router-dom'

const PageUpdateCoupon = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idCoupon = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateCoupon idCoupon={idCoupon} />
    </div>
  )
}

export default PageUpdateCoupon

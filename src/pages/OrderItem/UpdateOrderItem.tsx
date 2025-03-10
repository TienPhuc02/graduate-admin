import LayoutUpdateOrderItem from '@/components/pages/OrderItem/UpdateOrderItem'
import { useLocation } from 'react-router-dom'

const PageUpdateOrderItem = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idOrderItem = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateOrderItem idOrderItem={idOrderItem} />
    </div>
  )
}

export default PageUpdateOrderItem

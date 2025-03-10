import LayoutUpdateOrder from '@/components/pages/Order/UpdateOrder'
import { useLocation } from 'react-router-dom'

const PageUpdateOrder = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idOrder = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateOrder idOrder={idOrder} />
    </div>
  )
}

export default PageUpdateOrder

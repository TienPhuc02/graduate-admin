import LayoutUpdateUser from '@/components/pages/User/UpdateUser'
import { useLocation } from 'react-router-dom'

const PageUpdateUser = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idUser = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateUser idUser={idUser} />
    </div>
  )
}

export default PageUpdateUser

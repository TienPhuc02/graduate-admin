import LayoutUpdateCourse from '@/components/pages/Course/UpdateCourse'
import { useLocation } from 'react-router-dom'

const PageUpdateCourse = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idCourse = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateCourse idCourse={idCourse} />
    </div>
  )
}

export default PageUpdateCourse

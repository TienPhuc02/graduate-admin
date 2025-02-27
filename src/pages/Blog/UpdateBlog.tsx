import LayoutUpdateBlog from '@/components/pages/Blog/UpdateBlog'
import { useLocation } from 'react-router-dom'

const PageUpdateBlog = () => {
  const location = useLocation()
  const pathName = location.pathname
  const idBlog = pathName.split('/')[3]
  return (
    <div>
      <LayoutUpdateBlog idBlog={idBlog} />
    </div>
  )
}

export default PageUpdateBlog

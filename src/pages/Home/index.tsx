import LayoutAdminHome from '@/components/pages/Home'
import { useAppDispatch } from '@/hooks/hookStore'
import { fetchUser } from '@/stores/slice/authSlice'
import { useEffect } from 'react'

const PageAdminHome = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div>
      <LayoutAdminHome />
    </div>
  )
}

export default PageAdminHome

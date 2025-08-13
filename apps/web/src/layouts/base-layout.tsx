import { Outlet } from "react-router-dom"

const BaseLayout = () => {
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto h-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default BaseLayout

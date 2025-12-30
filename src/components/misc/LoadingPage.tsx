import './LoadingPage.css'

const LoadingPage = () => {
  return (
      <div className="fixed inset-0 bg-indigo-50 flex">
        <div className="m-auto">
          <div className="m-auto relative loading-page-container">
            <div className="slice"></div>
            <div className="slice"></div>
            <div className="slice"></div>
            <div className="slice"></div>
            <div className="slice"></div>
            <div className="slice"></div>
          </div>
        </div>


      </div>
  )
}

export default LoadingPage
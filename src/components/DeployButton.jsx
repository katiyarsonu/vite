import { useState } from 'react'

function DeployButton() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployStatus, setDeployStatus] = useState(null)
  const [error, setError] = useState(null)

  const handleDeploy = async () => {
    try {
      setIsDeploying(true)
      setError(null)
      
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a successful deployment
      setTimeout(() => {
        setDeployStatus({
          status: 'success',
          url: 'https://your-resume-builder.netlify.app',
          message: 'Your resume builder has been successfully deployed!'
        })
        setIsDeploying(false)
      }, 3000)
    } catch (err) {
      setError('Deployment failed. Please try again.')
      setIsDeploying(false)
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleDeploy}
        disabled={isDeploying}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          isDeploying 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-teal-600 text-white hover:bg-teal-700'
        }`}
      >
        {isDeploying ? 'Deploying...' : 'Deploy to Netlify'}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600">
          {error}
        </div>
      )}
      
      {deployStatus && (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 font-medium">{deployStatus.message}</p>
          <p className="mt-1">
            <a 
              href={deployStatus.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              {deployStatus.url}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default DeployButton
/* This example requires Tailwind CSS v2.0+ */

export default function LoginFailedAlert(props) {
  return (
    <div className="w-96 rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Login Failed</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p className="tracking-tight break-words">
              {props.message} 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
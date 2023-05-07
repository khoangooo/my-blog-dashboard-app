import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error: unknown = useRouteError()
  
  return (
    <div
      id='error-page'
      className=''
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as Error)?.message || (error as { statusText?: string })?.statusText}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage;



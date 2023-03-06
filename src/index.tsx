import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from '@/App'
import '@/assets/style/root.less'

function render(props: any) {
  const { container } = props
  const root = ReactDOM.createRoot(
    container
      ? (container.getElementById('root') as HTMLElement)
      : (document.getElementById('root') as HTMLElement),
  )

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

render({})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

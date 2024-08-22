import CustomThemeProvider from "./providers/CustomThemeProvider"
import Layout from "./layout/Layout"
import Router from "./router/Router"
import { BrowserRouter } from "react-router-dom"
import UserProvider from "./providers/UserProvider"
import SnackbarProvider from "./providers/SnackBarProvider"

function App() {

  return (
    <>
      <BrowserRouter>
        <CustomThemeProvider>
          <SnackbarProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </SnackbarProvider>
        </CustomThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
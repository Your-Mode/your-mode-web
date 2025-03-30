import { AppRouterProvider, AppThemeProvider } from "@app/providers";
import { GlobalStyle } from "@app/styles";


function App() {

  return (
    <AppThemeProvider>
      <GlobalStyle />
      <AppRouterProvider />
    </AppThemeProvider>
  );
}

export default App;

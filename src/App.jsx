import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/Error.jsx'
import Login from './pages/Login.jsx'
import Credits from './pages/Credits.jsx'
import Choice from './pages/Choice.jsx'
import Legales from './pages/Legales.jsx'
import Parametres from './pages/Parametres.jsx'
import Home from './pages/home/Home.jsx'
import Renfort from './pages/home/Renfort.jsx'
import Historique from './pages/home/Historique.jsx'
import Layout from './components/Layout.jsx'
import Restrictedaccess from './components/Restrictedaccess.jsx'
import ProviderPile from './components/ProviderPile.jsx'

function App() {
	return (
		<ProviderPile>
			<Router>
				<Routes>
					<Route path='/*' element={<ErrorPage />} />
					<Route path='/sign-in' element={<Login />} />
					<Route path='/box-choice' element={<Choice />} />
					<Route element={<Restrictedaccess />}>
						<Route element={<Layout />}>
							<Route path='/' element={<Home />} />
							<Route path='/history' element={<Historique />} />
							<Route path='/help' element={<Renfort />} />
						</Route>
						<Route path='/credits' element={<Credits />} />
						<Route path='/legales' element={<Legales />} />
						<Route path='/parametres' element={<Parametres />} />
					</Route>
				</Routes>
			</Router>
		</ProviderPile>
	)
}

export default App

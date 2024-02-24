// EXPLICATION : Ce composant permet de mettre le Header, le Footer et le coeur de l'application ensemble, car ils sont tous impactés par le currentBox du fetch context

import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { BoxContext } from '../utils/context/fetchContext.jsx'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const Layout = () => {
	const { currentBox } = useContext(BoxContext)
	if (currentBox == null) {
		return <Navigate to='/box-choice' />
	}
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layout

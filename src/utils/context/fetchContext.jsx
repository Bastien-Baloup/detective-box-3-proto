/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useState, createContext, useEffect, useReducer } from 'react'
import useApi from '../hooks/useApi.js'
import eventReducer from '../reducer/eventReducer.js'

// EXPLICATION : Context pour avoir la bonne boîte utilisée

export const BoxContext = createContext('')

export const BoxProvider = ({ children }) => {
	const [currentBox, setCurrentBox] = useState(null)

	return <BoxContext.Provider value={{ setCurrentBox, currentBox }}>{children}</BoxContext.Provider>
}

export const AuthContext = createContext('')

// EXPLICATION : Context pour avoir le token dans le local storage et gérer l'accès aux différentes pages de l'application.

const getInitialState = () => {
	return localStorage.getItem('token')
}

const getInitialLogin = () => {
	return localStorage.getItem('token')
}

export const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(getInitialLogin)
	const [token, setToken] = useState(getInitialState)
	const { getMe } = useApi()

	const login = (token) => {
		localStorage.setItem('token', token)
		setToken(token)
		setLoggedIn(true)
	}

	const logout = () => {
		localStorage.clear()
		setLoggedIn(false)
	}

	useEffect(() => {
		;(async () => {
			if (!token) {
				setLoggedIn(false)
				return
			}
			const res = await getMe(token)
			if (res.status === 401) {
				logout()
			}
		})()
	}, [])

	return (
		<AuthContext.Provider value={{ setLoggedIn, loggedIn, setToken, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

// EXPLICATION : Context pour activer et désactiver la nappe d'ambiance

export const AmbianceContext = createContext('')

export const AmbianceProvider = ({ children }) => {
	const [nappeIsMute, setNappeIsMute] = useState(true)
	const [wasMuted, setWasMuted] = useState(true)
	// console.log(nappeIsMute);

	const pauseNappe = () => {
		setWasMuted(nappeIsMute)
		setNappeIsMute(true)
	}

	const resumeNappe = () => {
		setNappeIsMute(wasMuted)
	}

	return (
		<AmbianceContext.Provider value={{ setNappeIsMute, pauseNappe, resumeNappe, nappeIsMute }}>
			{children}
		</AmbianceContext.Provider>
	)
}

// EXPLICATION : Context pour activer et désactiver la nappe d'ambiance

export const DataContext = createContext('')

export const DataProvider = ({ children }) => {
	const [toggleDataAdele, setToggleDataAdele] = useState(true)
	const [toggleDataCeline, setToggleDataCeline] = useState(true)
	const [toggleDataLauren, setToggleDataLauren] = useState(true)
	const [toggleDataRaphaelle, setToggleDataRaphaelle] = useState(true)
	const [toggleDataTim, setToggleDataTim] = useState(true)
	const [toggleDataEvent, setToggleDataEvent] = useState(true)
	const [toggleDataHelp, setToggleDataHelp] = useState(true)
	const [toggleDataHistory, setToggleDataHistory] = useState(true)
	const [toggleDataObjectif, setToggleDataObjectif] = useState(true)

	const actionToggleDataAdele = () => {
		setToggleDataAdele(!toggleDataAdele)
	}
	const actionToggleDataCeline = () => {
		setToggleDataCeline(!toggleDataCeline)
	}
	const actionToggleDataLauren = () => {
		setToggleDataLauren(!toggleDataLauren)
	}
	const actionToggleDataRaphaelle = () => {
		setToggleDataRaphaelle(!toggleDataRaphaelle)
	}
	const actionToggleDataTim = () => {
		setToggleDataTim(!toggleDataTim)
	}
	const actionToggleDataEvent = () => {
		setToggleDataEvent(!toggleDataEvent)
	}
	const actionToggleDataHelp = () => {
		setToggleDataHelp(!toggleDataHelp)
	}
	const actionToggleDataHistory = () => {
		setToggleDataHistory(!toggleDataHistory)
	}
	const actionToggleDataObjectif = () => {
		setToggleDataObjectif(!toggleDataObjectif)
	}

	return (
		<DataContext.Provider
			value={{
				actionToggleDataAdele,
				toggleDataAdele,
				actionToggleDataCeline,
				toggleDataCeline,
				actionToggleDataLauren,
				toggleDataLauren,
				actionToggleDataRaphaelle,
				toggleDataRaphaelle,
				actionToggleDataTim,
				toggleDataTim,
				actionToggleDataEvent,
				toggleDataEvent,
				actionToggleDataHelp,
				toggleDataHelp,
				actionToggleDataHistory,
				toggleDataHistory,
				actionToggleDataObjectif,
				toggleDataObjectif
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export const EventContext = createContext()

const initialState = {
	id: '',
	toogleEvent: false
}

export const EventProvider = ({ children }) => {
	const [state, dispatch] = useReducer(eventReducer, initialState)

	return <EventContext.Provider value={{ state, dispatch }}>{children}</EventContext.Provider>
}

export const CompteContext = createContext()

export const CompteProvider = ({ children }) => {
	const [active, setActive] = useState(false)
	const closeCompte = () => {
		setActive(false)
	}

	return <CompteContext.Provider value={{ active, setActive, closeCompte }}>{children}</CompteContext.Provider>
}

BoxProvider.propTypes = {
	children: PropTypes.any
}
AuthProvider.propTypes = {
	children: PropTypes.any
}
AmbianceProvider.propTypes = {
	children: PropTypes.any
}
DataProvider.propTypes = {
	children: PropTypes.any
}
EventProvider.propTypes = {
	children: PropTypes.any
}
CompteProvider.propTypes = {
	children: PropTypes.any
}

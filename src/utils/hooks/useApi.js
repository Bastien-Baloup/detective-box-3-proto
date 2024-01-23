const url = import.meta.env.VITE_API

const useApi = () => {
	const apiFunctions = {
		getHistories : (token, ids) => {
			return fetch(url + `/history?ids=${ids.join(",")}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
		},
		
		updateTimeEndBox : (token, id) => {
			return fetch(url + `/users/end_box/` + id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
		},
		
		getMe : (token) => {
			return fetch(url + "/users/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
		},
		
		getToken : (credentials) => {
			return fetch(url + "/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			})
		},
		
		createUser : (newaccount) => {
			return fetch(url + "/users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newaccount),
			})
			// .then((response) => response.json())
			// .then((data) => {
			// 	return data
			// })
			// .catch((error) => {
			// 	console.error(error)
			// })
		},
		
		getUser : (token) => {
			return fetch(url + "/users/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		forgotPassword : (email) => {
			return fetch(url + "/users/forgot_password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updatePassword : (token, newpassword) => {
			return fetch(url + "/users/password", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					password: newpassword,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateName : (token, id, newinfos) => {
			return fetch(url + "/users/" + id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newinfos),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetAll : (token) => {
			return fetch(url + "/game/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		getBox : (token) => {
			return fetch(url + "/box/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateBox : (token, boxid, newstatus) => {
			return fetch(url + `/box/` + boxid, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					status: newstatus,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetBox : (token) => {
			return fetch(url + "/box/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		getQuizzByBox : (token, boxid) => {
			return fetch(url + "/quizz/" + boxid, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateQuizz : (token, boxid) => {
			return fetch(url + "/quizz/" + boxid, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					status: true,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetQuizz : (token) => {
			return fetch(url + "/quizz/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		getHelpByBox : (token, boxid) => {
			return fetch(url + "/help/" + boxid, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateHelp : (token, boxid, helpid, newstatus) => {
			return fetch(url + "/help/" + boxid + "/?id=" + helpid, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					status: newstatus,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetHelp : (token) => {
			return fetch(url + "/help/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		getObjectivesByBox : (token, boxid) => {
			return fetch(url + "/objectives/" + boxid, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateObjectives : (token, boxid, objectiveid, newstatus) => {
			return fetch(url + "/objectives/" + boxid + "/?id=" + objectiveid, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					status: newstatus,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetObjectives : (token) => {
			return fetch(url + "/objectives/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		getHistoryByBox : (token, boxid) => {
			return fetch(url + "/history/" + boxid, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateHistory : (token, boxid, objectiveid) => {
			return fetch(url + "/history/" + boxid + "/?id=" + objectiveid, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					status: true,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetHistory : (token) => {
			return fetch(url + "/history/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		// getCharacters : () => {
		// 	return fetch(url + "/characters/", {
		// 		method: "GET",
		// 	})
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			console.log(data)
		// 			return data
		// 		})
		// 		.catch((error) => {
		// 			console.error(error)
		// 		})
		// }
		
		getCharactersById : (token, personnage) => {
			return fetch(url + "/characters/" + personnage, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateCharactersById : (token, personnage, boxid, answer) => {
			return fetch(url + "/characters/" + personnage + "/" + boxid + "/?answer=" + answer, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetCharacters : (token) => {
			return fetch(url + "/characters/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		getEventByBox : (token, boxid) => {
			return fetch(url + "/events/" + boxid, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		updateEvent : (token, boxid, id, newstatus) => {
			return fetch(url + "/events/" + boxid + "/?id=" + id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					status: newstatus,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		},
		
		resetEvent : (token) => {
			return fetch(url + "/events/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error(error)
				})
		}
		
	}
	return apiFunctions
}

export default useApi

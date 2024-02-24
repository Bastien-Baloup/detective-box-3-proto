// EXPLICATION : Page Erreur 404

import { Link } from 'react-router-dom'

function ErrorPage() {
	return (
		<main className='error'>
			<h1 className='error__title'>404</h1>
			<p className='error__info'>Oups! La page que vous demandez n&apos;existe pas.</p>
			<Link className='error__link' to='/'>
				Retourner à l&apos;enquête
			</Link>
		</main>
	)
}
export default ErrorPage

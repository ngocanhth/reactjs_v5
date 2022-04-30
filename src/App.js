import Header from 'components/Header';
import ProductFeature from 'features/Product';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div className="app">
			<Header />
			<Switch>
				<Redirect from="/home" to="/" exact />
				<Route path="/products" component={ProductFeature} />
			</Switch>
		</div>
	);
}

export default App;

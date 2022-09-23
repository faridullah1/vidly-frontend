import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
	return ( 
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/movies">Vidly</Link>
				
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav" style={{ display: 'flex', flex: 1 }}>
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/movies">Movies</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/customers">Customers</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/rentals">Rentals</NavLink>
						</li>
						{ !user && (
							<React.Fragment>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login">Login</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/register">Register</NavLink>
								</li>
							</React.Fragment>
						)}

						{ user && (
							<div className="d-flex justify-content-end" style={{ flex: 1 }}>
								<li className="nav-item">
									<NavLink className="nav-link" to="/profile">{ user.name }</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/logout">Logout</NavLink>
								</li>
							</div>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
 
export default NavBar;
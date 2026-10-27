import React from 'react';

type ComponentNavbarComponentProps = {
    data?: Record<string, any>;
};

export const ComponentNavbarComponent: React.FC<ComponentNavbarComponentProps> = ({ data = {} }) => {
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const { ADMIN, APPOINTMENT, DOCTOR, USER, VIEW } = data;

    return (
        <>
<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#4568dc' }}>
        	<div className="container-fluid">
        		<a className="navbar-brand" href="/"><i className="fa-sharp fa-solid fa-hospital"></i> Doctor Patient Portal</a>
        		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        			<span className="navbar-toggler-icon"></span>
        		</button>
        		<div className="collapse navbar-collapse" id="navbarSupportedContent">
        			
        			<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        				
        				
        
        				{(!userObj) && (<>
        
        					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/adminlogin"><i className="fa-solid fa-right-to-bracket"></i> ADMIN</a></li>
        					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/doctorlogin">
        						<i className="fas fa-sign-in-alt"></i> DOCTOR</a></li>
        					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/userappointment"><i className="fa fa-book fa-1x"></i> APPOINTMENT</a></li>
        					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/userlogin"><i className="fas fa-sign-in-alt"></i> USER</a></li>
        
        				</>)}
        
        				
        
        
        
        				
        				
        
        				{(Boolean(userObj) ) && (<>
        					
        					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/userappointment"><i className="fa fa-book fa-1x"></i> APPOINTMENT</a></li>
        					<li className="nav-item"><a className="nav-link active" aria-current="page" href="/viewappointment"><i className="fa fa-calendar-check-o"></i> VIEW APPOINTMENT</a></li>
        
        
        
        
        					<div className="dropdown">
        						<button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        							<i className="fa-solid fa-circle-user"></i> {userObj?.fullName}
        						</button>
        						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        							<li><a className="dropdown-item" href="/changepassword">Change Password</a></li>
        							<li><a className="dropdown-item" href="userLogout">Logout</a></li>
        
        						</ul>
        					</div>
        
        
        					
        
        				</>)}
        				
        
        
        
        
        
        
        
        
        			</ul>
        
        		</div>
        	</div>
        </nav>
        </>
    );
};

export default ComponentNavbarComponent;
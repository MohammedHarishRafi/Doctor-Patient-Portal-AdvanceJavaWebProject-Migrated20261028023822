import React from 'react';

type IndexComponentProps = {
    data?: Record<string, any>;
};

export const IndexComponent: React.FC<IndexComponentProps> = ({ data = {} }) => {
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
        
        
        
        	
        
        	<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        		<div className="carousel-indicators">
        			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        			
        		</div>
        		<div className="carousel-inner">
        			<div className="carousel-item active">
        				<img src="img/doctor_2.jpg" className="d-block w-100" alt="..." height="500px" />
        			</div>
        			<div className="carousel-item">
        				<img src="img/doctor_1.jpg" className="d-block w-100" alt="..." height="500px" />
        			</div>
        			<div className="carousel-item">
        				<img src="img/hospital4.jpg" className="d-block w-100" alt="..." height="500px" />
        			</div>
        			<div className="carousel-item">
        				<img src="img/doctor_3.jpg" className="d-block w-100" alt="..." height="500px" />
        			</div>
        			
        
        		</div>
        		<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        			<span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="visually-hidden">Previous</span>
        		</button>
        		<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        			<span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="visually-hidden">Next</span>
        		</button>
        	</div>
        
        	
        
        
        
        	
        	<div className="container p-3">
        		<p className="text-center mt-2 mb-5 fs-2 myP-color">Some key Features of our
        			Doctor Patient Portal</p>
        		<div className="row">
        			
        			<div className="col-md-8 p-5">
        
        				<div className="row">
        					<div className="col-md-6">
        						<div className="card my-card">
        							<div className="card-body">
        								<p className="fs-5 myP-color">11000+ Healing Hands</p>
        								<p>Largest network of the world’s finest and brightest
        									medical experts who provide compassionate care using
        									outstanding expertise.</p>
        							</div>
        						</div>
        					</div>
        
        					<div className="col-md-6">
        						<div className="card my-card">
        							<div className="card-body">
        								<p className="fs-5 myP-color">Most Advance Healthcare Technology</p>
        								<p>E-Hospitals has been the pioneer in bringing
        									ground-breaking health care technologies to Bangladesh.</p>
        							</div>
        						</div>
        					</div>
        
        					<div className="col-md-6 mt-2">
        						<div className="card my-card">
        							<div className="card-body">
        								<p className="fs-5 myP-color">Best Clinical Outcomes</p>
        								<p>Leveraging its vast medical expertise & technological
        									advantage, E-Hospitals has consistently delivered best in class
        									clinical outcomes.</p>
        							</div>
        						</div>
        					</div>
        
        					<div className="col-md-6 mt-2">
        						<div className="card my-card">
        							<div className="card-body">
        								<p className="fs-5 myP-color">500+ Pharmacies</p>
        								<p>E-Hospital Pharmacy is our first, largest and most
        									trusted branded pharmacy network, with over 50s0 plus outlets
        									covering the entire nation</p>
        							</div>
        						</div>
        					</div>
        				</div>
        
        
        			</div>
        			
        
        			
        			
        				<div className="col-md-4 mt-2 mys-card">
        					<img className="mt-3" alt="" src="img/doctor_1.jpg" height="440px" width="470px" />
        				</div>
        			
        			
        
        		</div>
        	</div>
        	
        
        	<hr />
        
        	
        
        	<div className="container p-2">
        		<p className="text-center fs-2 myP-color">Our Team</p>
        		<div className="row">
        			<div className="col-md-3">
        				<div className="card my-card">
        					<div className="card-body text-center">
        						<img alt="" src="img/doc1.jpg" height="300px" width="230px" />
        						<p className="fw-bold fs-5">Dr. John</p>
        						<p className="fs-7">(CEO & Chairman)</p>
        					</div>
        				</div>
        			</div>
        			<div className="col-md-3">
        				<div className="card my-card">
        					<div className="card-body text-center">
        						<img alt="" src="img/doc2.jpg" height="300px" width="230px" />
        						<p className="fw-bold fs-5">Dr. Brad</p>
        						<p className="fs-7">(Chief Doctor)</p>
        					</div>
        				</div>
        			</div>
        			<div className="col-md-3">
        				<div className="card my-card">
        					<div className="card-body text-center">
        						<img alt="" src="img/doc3.jpg" height="300px" width="230px" />
        						<p className="fw-bold fs-5">Dr. Jennifer</p>
        						<p className="fs-7">(Chief Doctor)</p>
        					</div>
        				</div>
        			</div>
        
        			<div className="col-md-3">
        				<div className="card my-card">
        					<div className="card-body text-center">
        						<img alt="" src="img/doc4.jpg" height="300px" width="230px" />
        						<p className="fw-bold fs-5">Dr. Maria</p>
        						<p className="fs-7">(Dean)</p>
        					</div>
        				</div>
        			</div>
        
        		</div>
        
        	</div>
        
        	
        
        
        
        
        
        	
        	
        
        
        
        <footer className="my-bg-color text-center text-white mt-5">
          
          <div className="container p-4 pb-0">
            
            <section className="mb-4">
              
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button" ><i className="fab fa-facebook-f"></i ></a>
        
              
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button" ><i className="fab fa-twitter"></i ></a>
        
              
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button" ><i className="fab fa-google"></i ></a>
        
              
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button" ><i className="fab fa-instagram"></i ></a>
        
              
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button" ><i className="fab fa-linkedin-in"></i ></a>
        
              
              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button" ><i className="fab fa-github"></i ></a>
            </section>
            
          </div>
          
        
          
          
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2022 Copyright:
            <a className="text-white" href="https://github.com/mdtalalwasim">Md.Talal Wasim</a> (Developer)
          </div>
          
        </footer>
        </>
    );
};

export default IndexComponent;
import React, { useEffect } from 'react';

interface ViewAppointmentComponentData {
    apptList?: any[];
}

type ViewAppointmentComponentProps = {
    data?: Record<string, any>;
};

export const ViewAppointmentComponent: React.FC<ViewAppointmentComponentProps> = ({ data = {} }) => {
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const { ADMIN, APPOINTMENT, DOCTOR, USER, VIEW, doctor, errorMsg, successMsg } = data;
    const [list, setList] = useState<any[]>(Array.isArray(data?.list) ? data.list : []);
    useEffect(() => {
        if (Array.isArray(data?.list) && data.list.length > 0) {
            setList(data.list);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_appointment", "apex_store_appointments", "apex_store_list"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setList(parsed);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Sandbox store read failed:', err);
            }
        };
        syncStore();
        if (typeof window !== 'undefined') {
            window.addEventListener('apex-store-updated', syncStore);
            return () => window.removeEventListener('apex-store-updated', syncStore);
        }
    }, [data?.list]);

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
        
        
        	
        	{(!userObj ) && (<>
        
        		
        
        	</>)}
        
        	
        
        	<div className="container-fluid my-bg-img p-5">
        		
        		<p className="text-center fs-2 text-white"></p>
        
        	</div>
        
        	
        
        	
        
        	<div className="container-fluid p-3">
        		<p className="fs-2"></p>
        
        		<div className="row">
        
        
        
        			
        			<div className="col-md-9">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="fw-bold text-center myP-color fs-4">Appointment
        							List</p>
        
        						
        
        						<div className="modern-table-wrapper"><table className="table table-striped">
        							<thead>
        								<tr className="my-bg-color text-white">
        									
        									<th scope="col">Full Name</th>
        									<th scope="col">Gender</th>
        									<th scope="col">Age</th>
        									<th scope="col">Appointment Date</th>
        									
        									<th scope="col">Phone</th>
        									<th scope="col">Diseases</th>
        									<th scope="col">Doctor Name</th>
        									
        									
        									<th scope="col">Status</th>
        								</tr>
        							</thead>
        							<tbody>
        								{(list && list?.length > 0 ? list : []).map((apptList: any, index: number) => (<>
        
        
        								<tr>
        									
        									<td>{apptList.fullName}</td>
        									<td>{apptList.gender}</td>
        									<td>{apptList.age}</td>
        									<td>{apptList.appointmentDate}</td>
        									
        									<td>{apptList.phone}</td>
        									<td>{apptList.diseases}</td>
        									<td>{doctor?.fullName}</td>
        									
        									
        									<td>
        										{"Pending" === apptList.getStatus() && (<> <a href="" className="btn btn-sm btn-warning">Pending</a> </>)}{!("Pending" === apptList.getStatus()) && (<>true) && (<> {apptList.status} </></>)}
        									</td>
        
        
        								</tr>
        
        
        								</>))}
        
        
        							</tbody>
        						</table></div>
        
        
        
        
        					</div>
        				</div>
        
        			</div>
        
        			
        			<div className="col-md-3 p-3">
        				
        				
        				<img alt="" src="img/wdoc.jpg" width="250" height="" />
        			</div>
        
        
        
        		</div>
        
        
        	</div>
        </>
    );
};

export default ViewAppointmentComponent;
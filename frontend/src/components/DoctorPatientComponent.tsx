import React, { useEffect } from 'react';

interface DoctorPatientComponentData {
    successMsg?: string;
    errorMsg?: string;
    applist?: any[];
}

type DoctorPatientComponentProps = {
    data?: Record<string, any>;
};

export const DoctorPatientComponent: React.FC<DoctorPatientComponentProps> = ({ data = {} }) => {
    const { Comment, Prescription, doctorObj, errorMsg, successMsg } = data;
    const [list, setList] = useState<any[]>(Array.isArray(data?.list) ? data.list : []);
    useEffect(() => {
        if (Array.isArray(data?.list) && data.list.length > 0) {
            setList(data.list);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_doctorpatient", "apex_store_doctorpatients", "apex_store_list"];
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
<nav className="navbar navbar-expand-lg navbar-dark bg-success">
        	<div className="container-fluid">
        		<a className="navbar-brand" href="/doctorindex"><i className="fa-sharp fa-solid fa-hospital"></i> Doctor Patient Portal</a>
        		
        		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        			<span className="navbar-toggler-icon"></span>
        		</button>
        		<div className="collapse navbar-collapse" id="navbarSupportedContent">
        			
        			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="/doctorindex"><i className="fa fa-home"></i>
        						HOME</a></li>
        
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="/doctorpatient"><i className="fa fa-wheelchair"></i> PATIENT</a></li>
        			</ul>
        
        			<div className="dropdown">
        				<button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        					<i className="fa-solid fa-user-doctor"></i> {doctorObj?.fullName}
        				</button>
        				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        					<li><a className="dropdown-item" href="/doctoreditprofile">Edit
        							Profile</a></li>
        					<li><a className="dropdown-item" href="../doctorLogout">Logout</a></li>
        
        				</ul>
        			</div>
        
        
        		</div>
        	</div>
        </nav>
        
        
        	
        
        	{(!doctorObj ) && (<>
        
        		
        
        	</>)}
        
        	
        
        
        	<div className="container p-3">
        		<div className="row">
        			<div className="col-md-12">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="text-center text-success fs-3">Patient Details</p>
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-5">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-5">{errorMsg}</p>
        							
        						</>)}
        						
        
        						
        
        						<div className="modern-table-wrapper"><table className="table table-striped">
        							<thead>
        								<tr>
        									<th scope="col" style={{ paddingRight: '100px' }}>Full Name</th>
        									<th scope="col">Gender</th>
        									<th scope="col">Age</th>
        									<th scope="col">Appointment Date</th>
        									<th scope="col">Email</th>
        									<th scope="col">Phone</th>
        									<th scope="col">Diseases</th>
        									<th scope="col">Status</th>
        									<th scope="col">Action</th>
        								</tr>
        							</thead>
        							<tbody>
        
        								{(list && list?.length > 0 ? list : []).map((applist: any, index: number) => (<>
        
        								<tr>
        									<th>{applist.fullName}</th>
        									<td>{applist.gender}</td>
        									<td>{applist.age}</td>
        									<td>{applist.appointmentDate}</td>
        									<td>{applist.email}</td>
        									<td>{applist.phone}</td>
        									<td>{applist.diseases}</td>
        									<td>{applist.status}</td>
        
        									<td>
        										{"Pending" === applist.getStatus() && (<> <a href={`comment.jsp?id=${applist.id}`} className="btn btn-success btn-sm">Comment / Prescription</a> 
        										</>)}{!("Pending" === applist.getStatus()) && (<>true) && (<> 
         										 <a href="#!" className="btn btn-success btn-sm disabled"><i className="fa fa-comment"></i> Comment / Prescription</a>
        											 
        										</></>)}
        
        
        									</td>
        									
        								</tr>
        
        
        
        								</>))}
        
        
        							</tbody>
        						</table></div>
        
        						
        
        
        
        					</div>
        				</div>
        			</div>
        
        		</div>
        
        	</div>
        </>
    );
};

export default DoctorPatientComponent;
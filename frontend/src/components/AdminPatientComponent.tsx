import React, { useEffect } from 'react';

interface AdminPatientComponentData {
    appList?: any[];
}

type AdminPatientComponentProps = {
    data?: Record<string, any>;
};

export const AdminPatientComponent: React.FC<AdminPatientComponentProps> = ({ data = {} }) => {
    const { doctor } = data;
    const [list, setList] = useState<any[]>(Array.isArray(data?.list) ? data.list : []);
    useEffect(() => {
        if (Array.isArray(data?.list) && data.list.length > 0) {
            setList(data.list);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_patient", "apex_store_patients", "apex_store_list"];
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
<nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        	<div className="container-fluid">
        		<a className="navbar-brand" href="/adminindex"><i className="fa-sharp fa-solid fa-hospital"></i> Doctor Patient Portal</a>
        		
        		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        			<span className="navbar-toggler-icon"></span>
        		</button>
        		<div className="collapse navbar-collapse" id="navbarSupportedContent">
        			
        			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="/adminindex"><i className="fa fa-home"></i>
        						HOME</a></li>
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="doctor?.jsp"><i className="fa-solid fa-user-doctor"></i> DOCTOR</a></li>
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="/adminviewdoctor"><i className="fa-solid fa-list"></i> VIEW DOCTOR</a></li>
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="/adminpatient"><i className="fa fa-wheelchair"></i> PATIENT</a></li>
        			</ul>
        
        			<div className="dropdown">
        				<button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        					<i className="fa fa-universal-access"></i> Admin
        				</button>
        				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        					<li><a className="dropdown-item" href="../adminLogout">Logout</a></li>
        
        				</ul>
        			</div>
        
        
        		</div>
        	</div>
        </nav>
        
        
        	<div className="col-md-12 p-5">
        		<div className="card my-card">
        			<div className="card-body">
        				<p className="text-center text-danger fs-3">Patient Details</p>
        
        				<div className="modern-table-wrapper"><table className="table table-success table-striped">
        					<thead>
        						<tr className="table">
        							<th scope="col" style={{ paddingRight: '70px' }}>Full Name</th>
        							<th scope="col">Gender</th>
        							<th scope="col">Age</th>
        							<th scope="col">Appointment</th>
        							<th scope="col">Email</th>
        							<th scope="col">Phone</th>
        							<th scope="col" style={{ paddingRight: '50px' }}>Diseases</th>
        							<th scope="col" style={{ paddingRight: '70px' }}>Doctor Name</th>
        							<th scope="col">Address</th>
        							<th scope="col" style={{ paddingRight: '100px' }}>Status</th>
        
        						</tr>
        					</thead>
        					<tbody>
        
        						{(list && list?.length > 0 ? list : []).map((appList: any, index: number) => (<>
        						
        						<tr>
        							<th>{appList.fullName}</th>
        							<td>{appList.gender}</td>
        							<td>{appList.age}</td>
        							
        							<td>{appList.appointmentDate}</td>
        							<td>{appList.email}</td>
        							<td>{appList.phone}</td>
        							<td>{appList.diseases}</td>
        							<td>{doctor?.fullName}</td>
        							<td>{appList.address}</td>
        							<td>{appList.status}</td>
        
        						</tr>
        						
        						
        						</>))}
        
        						
        					</tbody>
        
        				</table></div>
        
        			</div>
        
        
        		</div>
        
        	</div>
        </>
    );
};

export default AdminPatientComponent;
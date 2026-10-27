import React, { useEffect } from 'react';

interface AdminViewDoctorComponentData {
    successMsg?: string;
    errorMsg?: string;
    doctorLst?: string;
}

type AdminViewDoctorComponentProps = {
    data?: Record<string, any>;
};

export const AdminViewDoctorComponent: React.FC<AdminViewDoctorComponentProps> = ({ data = {} }) => {
    const { errorMsg, successMsg } = data;
    const [listOfDoc, setListOfDoc] = useState<any[]>(Array.isArray(data?.listOfDoc) ? data.listOfDoc : []);
    useEffect(() => {
        if (Array.isArray(data?.listOfDoc) && data.listOfDoc.length > 0) {
            setListOfDoc(data.listOfDoc);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_doctor", "apex_store_doctors", "apex_store_listofdoc"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setListOfDoc(parsed);
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
    }, [data?.listOfDoc]);

const handleDeleteRecord = (id: any, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try {
            if (typeof window !== 'undefined') {
                const candidateKeys = ["apex_store_doctor", "apex_store_doctors", "apex_store_listofdoc"];
                for (const k of candidateKeys) {
                    const saved = localStorage.getItem(k);
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        if (Array.isArray(parsed)) {
                            const filtered = parsed.filter((item: any) => String(item.id || item.docId || item.doctorId || '') !== String(id));
                            localStorage.setItem(k, JSON.stringify(filtered));
                            setListOfDoc(filtered);
                            window.dispatchEvent(new CustomEvent('apex-store-updated', { detail: { key: k, deletedId: id } }));
                            break;
                        }
                    }
                }
            }
        } catch (err) {
            console.warn('Sandbox delete failed:', err);
        }
    };

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
        				<li className="nav-item"><a className="nav-link active" aria-current="page" href="/admindoctor"><i className="fa-solid fa-user-doctor"></i> DOCTOR</a></li>
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
        
        
        
        	<div className="container-fluid p-3">
        		<div className="row">
        			
        			<div className="col-md-12">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="fs-3 text-center text-danger">List of Doctors</p>
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-3">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-3">{errorMsg}</p>
        							
        						</>)}
        						
        
        						
        
        						<div className="modern-table-wrapper"><table className="table table-striped">
        							<thead>
        								<tr className="table-info">
        									
        									<th scope="col">Full Name</th>
        									<th scope="col">DOB</th>
        									<th scope="col">Qualification</th>
        									<th scope="col">Specialist</th>
        									<th scope="col">Email</th>
        									<th scope="col">Phone</th>
        									<th colSpan="2" className="text-center" scope="col">Action</th>
        								</tr>
        							</thead>
        							<tbody>
        
        								{(listOfDoc && listOfDoc?.length > 0 ? listOfDoc : []).map((doctorLst: any, index: number) => (<>
        								<tr>
        									
        									<th>{doctorLst.fullName}</th>
        									<td>{doctorLst.dateOfBirth}</td>
        									<td>{doctorLst.qualification}</td>
        									<td>{doctorLst.specialist}</td>
        									<td>{doctorLst.email}</td>
        									<td>{doctorLst.phone}</td>
        
        
        									<td><a className="btn btn-sm btn-primary" href={`edit_doctor.jsp?id=${doctorLst.id}`}>Edit</a></td>
        									<td><a className="btn btn-sm btn-danger" href={`../deleteDoctor?id=${doctorLst.id}`} onClick={(e) => handleDeleteRecord(doctorLst.id, e)}>Delete</a></td>
        
        
        
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

export default AdminViewDoctorComponent;
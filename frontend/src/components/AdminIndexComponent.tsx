import React, { useState, useEffect } from 'react';

interface AdminIndexComponentData {
    successMsg?: string;
    errorMsg?: string;
    totalNumberOfDoctor?: number;
    totalNumberOfUser?: number;
    totalNumberOfAppointment?: number;
    totalNumberOfSpecialist?: number;
}

type AdminIndexComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const AdminIndexComponent: React.FC<AdminIndexComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'specialistName': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'specialistName': data?.['specialistName'] ?? prev['specialistName'] ?? '',
            }));
        }
    }, [data]);
    const { adminObj, errorMsg, successMsg, totalNumberOfAppointment, totalNumberOfDoctor, totalNumberOfSpecialist, totalNumberOfUser } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const formEl = e.currentTarget;
            const actionAttr = formEl ? formEl.getAttribute('action') : null;
            const rawTarget = actionAttr || '../addSpecialist' || (typeof window !== 'undefined' ? window.location.pathname : '');
            const formMethod = (formEl ? formEl.getAttribute('method') : null) || 'POST';
            const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '') : '';
            const targetUrl = (apiBase && !rawTarget.startsWith('http')) ? `${apiBase}${rawTarget.startsWith('/') ? '' : '/'}${rawTarget}` : rawTarget;
            let res: Response;
            try {
                res = await fetch(targetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } catch (networkErr: any) {
                if (apiBase && !rawTarget.startsWith('http')) {
                    res = await fetch(rawTarget, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    });
                } else {
                    throw networkErr;
                }
            }
            if (res.ok) {
                setSubmitSuccess(true);
            } else {
                setSubmitError(`Request failed with status ${res.status}`);
            }
        } catch (err: any) {
            setSubmitError(err?.message || 'Submission failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackendAction = async (
        e: React.MouseEvent<HTMLElement>,
        action: string = "",
    ) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice(
            action
                ? `The original backend action '${action}' has not been migrated to an API endpoint, so the action was not sent.`
                : "This form originally submitted to '../addSpecialist' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (<>
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        </>)}
        {submitSuccess && (<>
            <div className="alert alert-success" role="alert">Form submitted successfully.</div>
        </>)}
        {submitError && (<>
            <div className="alert alert-danger" role="alert">{submitError}</div>
        </>)}
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
        
        
        	
        	
        	{(!adminObj ) && (<>
        		
        	</>)}
        
        
        
        	<div className="container p-5">
        		<p className="text-center text-danger fs-3">Admin Dashboard</p>
        
        		
        		
        		{(Boolean(successMsg) ) && (<>
        			<p className="text-center text-success fs-5">{successMsg}</p>
        			
        		</>)}
        
        		
        		{(Boolean(errorMsg) ) && (<>
        			<p className="text-center text-danger fs-5">{errorMsg}</p>
        			
        		</>)}
        		
        
        		
        		
        
        		
        		<div className="row">
        			<div className="col-md-4">
        				<div className="card my-card">
        					<div className="card-body text-center text-danger">
        						<i className="fa-solid fa-user-doctor fa-3x"></i><br />
        						<p className="fs-4 text-center">
        							Doctor <br />{totalNumberOfDoctor}
        
        						</p>
        					</div>
        				</div>
        
        			</div>
        			<div className="col-md-4">
        				<div className="card my-card">
        					<div className="card-body text-center text-danger">
        						<i className="fas fa-user-circle fa-3x"></i><br />
        						<p className="fs-4 text-center">
        							User <br />{totalNumberOfUser}
        						</p>
        					</div>
        				</div>
        
        			</div>
        			<div className="col-md-4">
        				<div className="card my-card">
        					<div className="card-body text-center text-danger">
        						<i className="fa-solid fa-calendar-check fa-3x"></i><br />
        						<p className="fs-4 text-center">
        							Total Appointment <br />{totalNumberOfAppointment}
        						</p>
        					</div>
        				</div>
        
        			</div>
        			<div className="col-md-4 mt-2">
        				<div className="card my-card" data-bs-toggle="modal" data-bs-target="#exampleModal">
        					<div className="card-body text-center text-danger">
        						<i className="fa-solid fa-user-doctor fa-3x"></i><br />
        						<p className="fs-4 text-center">
        							Specialist <br />{totalNumberOfSpecialist}
        						</p>
        					</div>
        				</div>
        
        			</div>
        		</div>
        
        
        	</div>
        
        
        
        	
        
        
        
        	
        	<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        		<div className="modal-dialog">
        			<div className="modal-content">
        				<div className="modal-header">
        					<h5 className="modal-title text-danger" id="exampleModalLabel">Add Specialist</h5>
        					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        				</div>
        				<div className="modal-body">
        
        					<form onSubmit={handleSubmit} action="../addSpecialist" method="post">
        
        						<div className="form-group">
        							<label className="form-label">Enter Specialist Name</label> <input onChange={handleInputChange} type="text" name="specialistName" placeholder="Enter Specialist Name" className="form-control" />
        						</div>
        						<div className="text-center mt-2">
        							<button type="submit" className="btn btn-outline-danger ">Add</button>
        						</div>
        
        					</form>
        
        
        
        				</div>
        				<div className="modal-footer">
        					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
        				</div>
        			</div>
        		</div>
        	</div>
        </>
    );
};

export default AdminIndexComponent;
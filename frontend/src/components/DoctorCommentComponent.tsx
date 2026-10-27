import React, { useState, useEffect } from 'react';

interface DoctorCommentComponentData {
    successMsg?: string;
    errorMsg?: string;
}

type DoctorCommentComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const DoctorCommentComponent: React.FC<DoctorCommentComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'userId': '',
        'fullName': '',
        'age': '',
        'phone': '',
        'diseases': '',
        'id': '',
        'doctorId': '',
        'comment': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'age': data?.['age'] ?? prev['age'] ?? '',
                'comment': data?.['comment'] ?? prev['comment'] ?? '',
                'diseases': data?.['diseases'] ?? prev['diseases'] ?? '',
                'doctorId': data?.['doctorId'] ?? prev['doctorId'] ?? '',
                'fullName': data?.['fullName'] ?? prev['fullName'] ?? '',
                'id': data?.['id'] ?? prev['id'] ?? '',
                'phone': data?.['phone'] ?? prev['phone'] ?? '',
                'userId': data?.['userId'] ?? prev['userId'] ?? '',
            }));
        }
    }, [data]);
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const { appointment, doctorObj, errorMsg, successMsg } = data;

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
            const rawTarget = actionAttr || '../updateStatus' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
                : "This form originally submitted to '../updateStatus' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        <div className="alert alert-warning" role="alert" data-apex-data-source="unmigrated">{"This page originally loaded data through getAppointmentById (appointment). That server-side data source has not been migrated to an API endpoint, so the page is showing the source design without that data."}</div>
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
        
        	
        
        
        	
        
        	<div className="container-fluid my-bg-img p-5">
        		
        		<p className="text-center fs-2 text-white"></p>
        
        	</div>
        
        	
        
        
        	
        
        	<div className="container p-3">
        		<p className="fs-2"></p>
        
        		<div className="row">
        
        
        
        			
        			<div className="col-md-6 offset-md-3">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="text-center fs-3">Leave a Treatment Comment</p>
        
        						
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-5">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-5">{errorMsg}</p>
        							
        						</>)}
        						
        
        
        						
        						
        						
        						
        						
        						<form onSubmit={handleSubmit} className="row g-3" action="../updateStatus" method="post">
        
        							
        							
        
        							<div className="col-md-6">
        								<label className="form-label">Full Name</label> <input onChange={handleInputChange} name="fullName" type="text" placeholder="Enter full name" className="form-control"  readOnly  value={appointment?.fullName} />
        
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Age</label> <input onChange={handleInputChange} name="age" type="number" placeholder="Enter your Age" className="form-control"  readOnly  value={appointment?.age} />
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Phone</label> <input onChange={handleInputChange} name="phone" type="number" maxLength="11" placeholder="Enter Mobile no." className="form-control"  readOnly  value={appointment?.phone} />
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Diseases</label> <input onChange={handleInputChange} name="diseases" type="text" placeholder="Enter diseases" className="form-control"  readOnly  value={appointment?.diseases} />
        							</div>
        
        
        
        							<div className="col-md-12">
        								<label className="form-label">Leave a Comment / Prescription</label>
        								<textarea onChange={handleInputChange} name="comment" placeholder="Leave a comment" className="form-control" rows="" cols=""></textarea>
        							</div>
        
        							
        							<input type="hidden" name="id" value={appointment?.id} className="form-control" />
        
        							
        							<input type="hidden" name="doctorId" value={appointment?.doctorId} className="form-control" />
        
        
        
        							<div className="col-md-12">
        								<button type="submit" className="btn btn-success col-md-12">Submit</button>
        							</div>
        
        
        						</form>
        
        						
        
        					</div>
        				</div>
        
        			</div>
        
        		</div>
        
        
        	</div>
        </>
        </>
    );
};

export default DoctorCommentComponent;
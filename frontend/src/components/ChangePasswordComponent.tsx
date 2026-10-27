import React, { useState, useEffect } from 'react';

interface ChangePasswordComponentData {
    successMsg?: string;
    errorMsg?: string;
}

type ChangePasswordComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const ChangePasswordComponent: React.FC<ChangePasswordComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'newPassword': '',
        'oldPassword': '',
        'id': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'id': data?.['id'] ?? prev['id'] ?? '',
                'newPassword': data?.['newPassword'] ?? prev['newPassword'] ?? '',
                'oldPassword': data?.['oldPassword'] ?? prev['oldPassword'] ?? '',
            }));
        }
    }, [data]);
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const { ADMIN, APPOINTMENT, DOCTOR, USER, VIEW, errorMsg, successMsg } = data;

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
            const rawTarget = actionAttr || 'userChangePassword' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
                : "This form originally submitted to 'userChangePassword' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
        	<div className="container p-4">
        		<div className="row">
        			<div className="col-md-4 offset-md-4">
        				<div className="card my-card">
        
        					<div className="card-body">
        						<p className="fs-3 text-center myP-color">Change Password</p>
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-5">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-5">{errorMsg}</p>
        							
        						</>)}
        						
        
        
        						<form onSubmit={handleSubmit} action="userChangePassword" method="post">
        							<div className="mb-3">
        								<label className="form-label">Enter New Password</label> <input onChange={handleInputChange} name="newPassword" type="password" placeholder="Enter new password" className="form-control" required="required" />
        
        							</div>
        							<div className="mb-3">
        								<label className="form-label">Enter Old Password</label> <input onChange={handleInputChange} name="oldPassword" type="password" placeholder="Enter old password" className="form-control" required />
        							</div>
        							<input type="hidden" value={userObj?.id} name="userId" />
        
        							<button type="submit" className="btn my-bg-color text-white col-md-12">Change
        								Password</button>
        						</form>
        					</div>
        				</div>
        
        			</div>
        		</div>
        	</div>
        </>
    );
};

export default ChangePasswordComponent;
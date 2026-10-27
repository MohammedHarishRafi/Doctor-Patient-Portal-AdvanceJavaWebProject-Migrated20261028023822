import React, { useState, useEffect } from 'react';

interface DoctorEditProfileComponentData {
    successMsg?: string;
    errorMsg?: string;
    successMsgForD?: string;
    errorMsgForD?: string;
    sp?: string;
}

type DoctorEditProfileComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const DoctorEditProfileComponent: React.FC<DoctorEditProfileComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'newPassword': '',
        'oldPassword': '',
        'id': '',
        'fullName': '',
        'dateOfBirth': '',
        'qualification': '',
        'email': '',
        'phone': '',
        'specialist': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'dateOfBirth': data?.['dateOfBirth'] ?? prev['dateOfBirth'] ?? '',
                'email': data?.['email'] ?? prev['email'] ?? '',
                'fullName': data?.['fullName'] ?? prev['fullName'] ?? '',
                'id': data?.['id'] ?? prev['id'] ?? '',
                'newPassword': data?.['newPassword'] ?? prev['newPassword'] ?? '',
                'oldPassword': data?.['oldPassword'] ?? prev['oldPassword'] ?? '',
                'phone': data?.['phone'] ?? prev['phone'] ?? '',
                'qualification': data?.['qualification'] ?? prev['qualification'] ?? '',
                'specialist': data?.['specialist'] ?? prev['specialist'] ?? '',
            }));
        }
    }, [data]);
    const { doctorObj, errorMsg, errorMsgForD, successMsg, successMsgForD } = data;
    const [spList, setSpList] = useState<any[]>(Array.isArray(data?.spList) ? data.spList : []);
    useEffect(() => {
        if (Array.isArray(data?.spList) && data.spList.length > 0) {
            setSpList(data.spList);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_specialist", "apex_store_specialists", "apex_store_sp", "apex_store_sps", "apex_store_doctorchangepassword", "apex_store_doctorchangepasswords", "apex_store_splist"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setSpList(parsed);
                                return;
                            }
                        }
                    }
                    const defaultSpecs = [
                        { id: 1, specialistName: 'Dentist', name: 'Dentist' },
                        { id: 2, specialistName: 'Cardiologist', name: 'Cardiologist' },
                        { id: 3, specialistName: 'General Physician', name: 'General Physician' },
                        { id: 4, specialistName: 'Neurologist', name: 'Neurologist' },
                        { id: 5, specialistName: 'Orthopedic', name: 'Orthopedic' },
                        { id: 6, specialistName: 'Surgeon', name: 'Surgeon' },
                    ];
                    localStorage.setItem('apex_store_specialist', JSON.stringify(defaultSpecs));
                    setSpList(defaultSpecs);
                    return;
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
    }, [data?.spList]);

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
            const rawTarget = actionAttr || '../doctorChangePassword' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
                : "This form originally submitted to '../doctorChangePassword' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
        	
        
        	<div className="container p-4">
        		<div className="row">
        			<div className="col-md-4">
        				<div className="card my-card">
        
        					<div className="card-body">
        						<p className="fs-3 text-center text-success">Change Password</p>
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-5">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-5">{errorMsg}</p>
        							
        						</>)}
        						
        
        						
        
        						<form onSubmit={handleSubmit} action="../doctorChangePassword" method="post">
        							<div className="mb-3">
        								<label className="form-label">Enter New Password</label> <input onChange={handleInputChange} name="newPassword" type="password" placeholder="Enter new password" className="form-control" required="required" />
        
        							</div>
        							<div className="mb-3">
        								<label className="form-label">Enter Old Password</label> <input onChange={handleInputChange} name="oldPassword" type="password" placeholder="Enter old password" className="form-control" required />
        							</div>
        							<input type="hidden" value={doctorObj?.id} name="doctorId" />
        
        							<button type="submit" className="btn btn-success col-md-12">Change
        								Password</button>
        						</form>
        						
        					</div>
        				</div>
        
        			</div>
        
        			
        
        			<div className="col-md-6 offset-md-2">
        				<div className="card my-card">
        
        					<div className="card-body">
        						<p className="fs-3 text-center text-success">Edit Doctor Profile</p>
        
        						
        						
        						{(Boolean(successMsgForD) ) && (<>
        							<p className="text-center text-success fs-5">{successMsgForD}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsgForD) ) && (<>
        							<p className="text-center text-danger fs-5">{errorMsgForD}</p>
        							
        						</>)}
        						
        
        
        						
        
        
        							
        							<form onSubmit={handleSubmit} action="../doctorEditProfile" method="post">
        								<div className="mb-3">
        									<label className="form-label">Full Name</label> <input onChange={handleInputChange} name="fullName" type="text" placeholder="Enter full name" className="form-control" value={doctorObj?.fullName} />
        
        								</div>
        								<div className="mb-3">
        									<label className="form-label">Date of Birth</label> <input onChange={handleInputChange} name="dateOfBirth" type="date" placeholder="Enter DOB" className="form-control" value={doctorObj?.dateOfBirth} />
        
        								</div>
        								<div className="mb-3">
        									<label className="form-label">Qualification</label> <input onChange={handleInputChange} name="qualification" type="text" placeholder="Enter qualification" className="form-control" value={doctorObj?.qualification} />
        								</div>
        
        								<div className="mb-3">
        									<label className="form-label">Specialist</label> <select onChange={handleInputChange} className="form-control" name="specialist">
        										<option>{doctorObj?.specialist}</option>
        
        										{(spList && spList?.length > 0 ? spList : []).map((sp: any, index: number) => (<>
        										<option>
        											{sp.specialistName}
        										</option>
        										</>))}
        
        									</select>
        								</div>
        
        								<div className="mb-3">
        									<label className="form-label">Email address</label> <input onChange={handleInputChange} name="email" type="email" placeholder="Enter Email" className="form-control"  readOnly  value={doctorObj?.email} />
        
        								</div>
        								<div className="mb-3">
        									<label className="form-label">Phone</label> <input onChange={handleInputChange} name="phone" type="text" placeholder="Enter mobile number" className="form-control" value={doctorObj?.phone} />
        
        								</div>
        								
        								<input type="hidden" value={doctorObj?.id} name="doctorId" />
        
        
        								<button type="submit" className="btn btn-success text-white col-md-12">Update</button>
        							</form>
        						
        					</div>
        				</div>
        
        			</div>
        
        			
        
        		</div>
        	</div>
        </>
    );
};

export default DoctorEditProfileComponent;
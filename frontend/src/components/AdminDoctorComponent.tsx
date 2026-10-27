import React, { useState, useEffect } from 'react';

interface AdminDoctorComponentData {
    successMsg?: string;
    errorMsg?: string;
    sp?: string;
}

type AdminDoctorComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const AdminDoctorComponent: React.FC<AdminDoctorComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'fullName': '',
        'dateOfBirth': '',
        'qualification': '',
        'email': '',
        'phone': '',
        'password': '',
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
                'password': data?.['password'] ?? prev['password'] ?? '',
                'phone': data?.['phone'] ?? prev['phone'] ?? '',
                'qualification': data?.['qualification'] ?? prev['qualification'] ?? '',
                'specialist': data?.['specialist'] ?? prev['specialist'] ?? '',
            }));
        }
    }, [data]);
    const { errorMsg, successMsg } = data;
    const [spList, setSpList] = useState<any[]>(Array.isArray(data?.spList) ? data.spList : []);
    useEffect(() => {
        if (Array.isArray(data?.spList) && data.spList.length > 0) {
            setSpList(data.spList);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_specialist", "apex_store_specialists", "apex_store_sp", "apex_store_sps", "apex_store_doctor", "apex_store_doctors", "apex_store_splist"];
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
            const rawTarget = actionAttr || '../addDoctor' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
                : "This form originally submitted to '../addDoctor' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
        
        
        	<div className="container-fluid p-3">
        		<div className="row">
        			<div className="col-md-5 offset-4">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="fs-3 text-center text-danger">Add Doctor</p>
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-3">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-3">{errorMsg}</p>
        							
        						</>)}
        						
        
        						
        						<form onSubmit={handleSubmit} action="../addDoctor" method="post">
        							<div className="mb-3">
        								<label className="form-label">Full Name</label> <input onChange={handleInputChange} name="fullName" type="text" placeholder="Enter full name" className="form-control" />
        
        							</div>
        							<div className="mb-3">
        								<label className="form-label">Date of Birth</label> <input onChange={handleInputChange} name="dateOfBirth" type="date" placeholder="Enter DOB" className="form-control" />
        
        							</div>
        							<div className="mb-3">
        								<label className="form-label">Qualification</label> <input onChange={handleInputChange} name="qualification" type="text" placeholder="Enter qualification" className="form-control" />
        							</div>
        
        							<div className="mb-3">
        								<label className="form-label">Specialist</label> <select onChange={handleInputChange} className="form-control" name="specialist">
        									<option disabled="disabled" selected="selected">---Select---</option>
        
        									{(spList && spList?.length > 0 ? spList : []).map((sp: any, index: number) => (<>
        									<option>
        										{sp.specialistName}
        									</option>
        									</>))}
        
        								</select>
        							</div>
        
        							<div className="mb-3">
        								<label className="form-label">Email address</label> <input onChange={handleInputChange} name="email" type="email" placeholder="Enter Email" className="form-control" />
        
        							</div>
        							<div className="mb-3">
        								<label className="form-label">Phone</label> <input onChange={handleInputChange} name="phone" type="text" placeholder="Enter mobile number" className="form-control" />
        
        							</div>
        							<div className="mb-3">
        								<label className="form-label">Password</label> <input onChange={handleInputChange} name="password" type="password" placeholder="Enter password" className="form-control" />
        							</div>
        
        							<button type="submit" className="btn btn-danger text-white col-md-12">Register</button>
        						</form>
        						
        						
        
        					</div>
        
        				</div>
        			</div>
        			
        		</div>
        	</div>
        </>
    );
};

export default AdminDoctorComponent;
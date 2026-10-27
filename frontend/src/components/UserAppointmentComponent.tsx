import React, { useState, useEffect } from 'react';

interface UserAppointmentComponentData {
    successMsg?: string;
    errorMsg?: string;
    d?: string;
}

type UserAppointmentComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const UserAppointmentComponent: React.FC<UserAppointmentComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'userId': '',
        'fullName': '',
        'age': '',
        'appointmentDate': '',
        'email': '',
        'phone': '',
        'diseases': '',
        'gender': '',
        'doctorNameSelect': '',
        'address': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | boolean>(false);
    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                'address': data?.['address'] ?? prev['address'] ?? '',
                'age': data?.['age'] ?? prev['age'] ?? '',
                'appointmentDate': data?.['appointmentDate'] ?? prev['appointmentDate'] ?? '',
                'diseases': data?.['diseases'] ?? prev['diseases'] ?? '',
                'doctorNameSelect': data?.['doctorNameSelect'] ?? prev['doctorNameSelect'] ?? '',
                'email': data?.['email'] ?? prev['email'] ?? '',
                'fullName': data?.['fullName'] ?? prev['fullName'] ?? '',
                'gender': data?.['gender'] ?? prev['gender'] ?? '',
                'phone': data?.['phone'] ?? prev['phone'] ?? '',
                'userId': data?.['userId'] ?? prev['userId'] ?? '',
            }));
        }
    }, [data]);
    const userObj = (data?.userObj || data?.sessionScope?.user || data?.currentUser || data?.user || null);
    const { ADMIN, APPOINTMENT, DOCTOR, USER, VIEW, errorMsg, successMsg } = data;
    const [listOfDoctor, setListOfDoctor] = useState<any[]>(Array.isArray(data?.listOfDoctor) ? data.listOfDoctor : []);
    useEffect(() => {
        if (Array.isArray(data?.listOfDoctor) && data.listOfDoctor.length > 0) {
            setListOfDoctor(data.listOfDoctor);
            return;
        }
        const syncStore = () => {
            try {
                if (typeof window !== 'undefined') {
                    const candidateKeys = ["apex_store_doctor", "apex_store_doctors", "apex_store_appointment", "apex_store_appointments", "apex_store_listofdoctor"];
                    for (const k of candidateKeys) {
                        const saved = localStorage.getItem(k);
                        if (saved) {
                            const parsed = JSON.parse(saved);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                                setListOfDoctor(parsed);
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
    }, [data?.listOfDoctor]);

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
            const rawTarget = actionAttr || 'addAppointment' || (typeof window !== 'undefined' ? window.location.pathname : '');
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
                : "This form originally submitted to 'addAppointment' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
        
        	
        
        	<div className="container-fluid my-bg-img p-5">
        		
        		<p className="text-center fs-2 text-white"></p>
        
        	</div>
        
        	
        
        
        	
        
        	<div className="container p-3">
        		<p className="fs-2"></p>
        
        		<div className="row">
        			
        			
        			<div className="col-md-6 p-5">
        				
        				
        				<img alt="" src="img/doc3.jpg" width="370" height="" />
        			</div>
        			
        			
        			<div className="col-md-6">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="text-center fs-3">User Appointment</p>
        
        						
        						
        						{(Boolean(successMsg) ) && (<>
        							<p className="text-center text-success fs-5">{successMsg}</p>
        							
        						</>)}
        
        						
        						{(Boolean(errorMsg) ) && (<>
        							<p className="text-center text-danger fs-5">{errorMsg}</p>
        							
        						</>)}
        						
        
        
        						
        						<form onSubmit={handleSubmit} className="row g-3" action="addAppointment" method="post">
        							
        							
        							<input type="hidden" name="userId" value={userObj?.id} />
        							
        							<div className="col-md-6">
        								<label className="form-label">Full Name</label> <input onChange={handleInputChange} required="required" name="fullName" type="text" placeholder="Enter full name" className="form-control" />
        
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Gender</label> <select onChange={handleInputChange} className="form-control" name="gender" required="required">
        									<option selected="selected" disabled="disabled">---Select
        										Gender---</option>
        									<option value="male">Male</option>
        									<option value="female">Female</option>
        								</select>
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Age</label> <input onChange={handleInputChange} name="age" required="required" type="number" placeholder="Enter your Age" className="form-control" />
        							</div>
        							<div className="col-md-6">
        								<label className="form-label">Appointment Date</label> <input onChange={handleInputChange} required="required" name="appointmentDate" type="date" className="form-control" />
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Email</label> <input onChange={handleInputChange} name="email" required="required" type="email" placeholder="Enter email" className="form-control" />
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Phone</label> <input onChange={handleInputChange} name="phone" required="required" type="number" maxLength="11" placeholder="Enter Mobile no." className="form-control" />
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Diseases</label> <input onChange={handleInputChange} required="required" name="diseases" type="text" placeholder="Enter diseases" className="form-control" />
        							</div>
        
        							<div className="col-md-6">
        								<label className="form-label">Doctor</label> <select onChange={handleInputChange} required="required" className="form-control" name="doctorNameSelect">
        									<option selected="selected" disabled="disabled">---Select---</option>
        									
        									{(listOfDoctor && listOfDoctor?.length > 0 ? listOfDoctor : []).map((d: any, index: number) => (<>
        									
        									<option value={d.id}> {d.fullName} ({d.specialist}) </option>
        									
        									</>))}
        									
        									
        								</select>
        							</div>
        
        
        							
        
        							<div className="col-md-12">
        								<label className="form-label">Full Address</label>
        								<textarea onChange={handleInputChange} name="address" required="required" className="form-control" rows="3" cols=""></textarea>
        							</div>
        
        
        							{(!userObj) && (<>
        								<div className="col-md-12">
        									<a href="/userlogin" className="btn my-bg-color text-white col-md-12">Submit</a>
        								</div>
        							</>)}
        
        
        							{(Boolean(userObj)) && (<>
        
        								<div className="col-md-12">
        									<button type="submit" className="btn my-bg-color text-white col-md-12">Submit</button>
        								</div>
        
        							</>)}
        
        						</form>
        
        						
        
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

export default UserAppointmentComponent;
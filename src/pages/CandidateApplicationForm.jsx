import React, { useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/Footer';
import SubmissionSuccess from '../components/common/SubmissionSuccess';

const CandidateApplicationForm = () => {
  const [presentAddress, setPresentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Dynamic Sections
  const [experiences, setExperiences] = useState([
    { companyName: '', designation: '', from: '', to: '', salary: '', reason: '' },
  ]);
  const [educations, setEducations] = useState([
    { qualification: '', institute: '', year: '', marks: '', subject: '' },
  ]);
  const [skills, setSkills] = useState([
    { skillName: '', institute: '', experience: '', details: '' },
  ]);

  const inputClass = 'border px-4 py-3 rounded';

  // Required fields configuration
  const requiredFields = {
    firstName: 'First Name is required',
    lastName: 'Last Name is required',
    guardianName: "Father's/Spouse Name is required",
    dob: 'Date of Birth is required',
    gender: 'Gender is required',
    contact: 'Contact Number is required',
    email: 'Email ID is required',
    presentAddress: 'Present Address is required',
    jobApplied: 'Job Applied For is required',
    nationality: 'Nationality is required',
    maritalStatus: 'Marital Status is required'
  };

  // Validate form function
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check required fields
    Object.keys(requiredFields).forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = requiredFields[field];
        isValid = false;
      }
    });

    // Special check for presentAddress (since it's managed separately)
    if (!presentAddress || presentAddress.trim() === '') {
      newErrors.presentAddress = requiredFields.presentAddress;
      isValid = false;
    }

    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone number format (basic validation)
    if (formData.contact && !/^[0-9+]{10,15}$/.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid contact number (10-15 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    const finalPayload = {
      ...formData,
      presentAddress,
      permanentAddress: sameAsPresent ? presentAddress : permanentAddress,
      experiences,
      educations,
      skills,
    };
    console.log('Submitting form:', finalPayload);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange =
    (field, type, maxLength = 100) =>
    (e) => {
      const sanitizedValue = sanitizeInput(e.target.value, type).slice(0, maxLength);
      setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
      
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  // Prevent invalid characters from being entered
  const handleKeyPress = (type) => (e) => {
    const key = e.key;
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    if (allowedKeys.includes(key)) return;

    const patterns = {
      name: /^[A-Za-z\s]$/,
      phone: /^[0-9+]$/,
      numeric: /^[0-9]$/,
      decimal: /^[0-9.]$/,
      alphanumeric: /^[A-Za-z0-9\s-]$/,
      address: /^[A-Za-z0-9\s\-.,]$/,
      marks: /^[0-9%]$/,
      generalText: /^[A-Za-z0-9\s\-.,]$/,
    };

    switch (type) {
      case 'name':
        if (!patterns.name.test(key)) e.preventDefault();
        break;
      case 'phone':
        if (!patterns.phone.test(key)) e.preventDefault();
        break;
      case 'numeric':
        if (!patterns.numeric.test(key)) e.preventDefault();
        break;
      case 'decimal':
        if (!patterns.decimal.test(key)) e.preventDefault();
        break;
      case 'alphanumeric':
      case 'generalText':
      case 'address':
      case 'marks':
        if (!patterns[type].test(key)) e.preventDefault();
        break;
      default:
        break;
    }
  };

  // Sanitize input on paste
  const handlePaste = (type) => (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const sanitized = sanitizeInput(text, type);
    document.execCommand('insertText', false, sanitized);
  };

  const sanitizeInput = (value, type) => {
    if (!value) return '';

    const sanitizers = {
      name: value.replace(/[^A-Za-z\s]/g, ''),
      phone: value.replace(/[^0-9+]/g, ''),
      email: value.replace(/[^\w@.-]/g, ''),
      alphanumeric: value.replace(/[^A-Za-z0-9\s-]/g, ''),
      numeric: value.replace(/[^0-9]/g, ''),
      decimal: value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'),
      year: value.replace(/[^0-9]/g, '').slice(0, 4),
      address: value.replace(/[^A-Za-z0-9\s\-,.]/g, ''),
      marks: value.replace(/[^0-9%]/g, ''),
      generalText: value.replace(/[^A-Za-z0-9\s\-.,]/g, ''),
      default: value,
    };

    return sanitizers[type] || sanitizers.default;
  };

  const handlePresentAddressChange = (e) => {
    const value = sanitizeInput(e.target.value, 'address').slice(0, 200);
    setPresentAddress(value);
    setFormData((prev) => ({ ...prev, presentAddress: value }));
    if (sameAsPresent) {
      setPermanentAddress(value);
      setFormData((prev) => ({ ...prev, permanentAddress: value }));
    }
    
    if (errors.presentAddress) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.presentAddress;
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsPresent(isChecked);
    if (isChecked) {
      setPermanentAddress(presentAddress);
      setFormData((prev) => ({ ...prev, permanentAddress: presentAddress }));
    }
  };

  // Dynamic Updates
  const updateArray = (setter, index, field, value, type, maxLength = 100) => {
    const sanitizedValue = sanitizeInput(value, type).slice(0, maxLength);
    setter((prev) => {
      const updated = [...prev];
      updated[index][field] = sanitizedValue;
      return updated;
    });
  };

  const addExperience = () =>
    setExperiences([
      ...experiences,
      { companyName: '', designation: '', from: '', to: '', salary: '', reason: '' },
    ]);

  const addEducation = () =>
    setEducations([...educations, { qualification: '', institute: '', year: '', marks: '' }]);

  const addSkill = () => setSkills([...skills, { skillName: '', institute: '', experience: '' }]);

  const getInputClass = (fieldName) => {
    return errors[fieldName] 
      ? `${inputClass} border-red-500` 
      : inputClass;
  };

  const handleReturnHome = () => {
    setIsSubmitted(false);
    // Reset form if needed
    setPresentAddress('');
    setPermanentAddress('');
    setSameAsPresent(false);
    setFormData({});
    setExperiences([{ companyName: '', designation: '', from: '', to: '', salary: '', reason: '' }]);
    setEducations([{ qualification: '', institute: '', year: '', marks: '', subject: '' }]);
    setSkills([{ skillName: '', institute: '', experience: '', details: '' }]);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#f3f5ed] flex flex-col">
      <Header />
      <div className="flex-1 w-full flex flex-col items-center px-4 py-6 overflow-auto pt-16 lg:pt-20">
        {isSubmitted ? (
          <SubmissionSuccess onReturnHome={handleReturnHome} />
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white rounded-lg shadow p-8">
            <h1 className="text-[#642c92] text-3xl font-bold mb-2 text-center">
              Candidate Application Form
            </h1>
            <p className="text-center text-base mb-6">
              Please fill in the details in capital letter
            </p>
            <p className="text-red-500 text-sm mb-4">* Indicates required fields</p>

            {/* Personal Details to Job Applied For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* First Name - Required */}
              <div className="flex flex-col">
                <label>First Name *</label>
                <input
                  id="firstName"
                  className={getInputClass('firstName')}
                  onChange={handleInputChange('firstName', 'name', 50)}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={50}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Middle Name - Not required */}
              <div className="flex flex-col">
                <label>Middle Name</label>
                <input
                  className={inputClass}
                  onChange={handleInputChange('middleName', 'name', 50)}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={50}
                />
              </div>

              {/* Last Name - Required */}
              <div className="flex flex-col">
                <label>Last Name *</label>
                <input
                  id="lastName"
                  className={getInputClass('lastName')}
                  onChange={handleInputChange('lastName', 'name', 50)}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={50}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Father's/Spouse Name - Required */}
              <div className="flex flex-col">
                <label>Father's / Spouse Name *</label>
                <input
                  id="guardianName"
                  className={getInputClass('guardianName')}
                  onChange={handleInputChange('guardianName', 'name', 100)}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={100}
                />
                {errors.guardianName && (
                  <p className="text-red-500 text-sm mt-1">{errors.guardianName}</p>
                )}
              </div>

              {/* Date of Birth - Required */}
              <div className="flex flex-col">
                <label>Date of Birth *</label>
                <input
                  id="dob"
                  type="date"
                  className={getInputClass('dob')}
                  placeholder="dd-mm-yyyy"
                  onChange={handleInputChange('dob', 'default')}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>

              {/* Gender - Required */}
              <div className="flex flex-col">
                <label>Gender *</label>
                <select 
                  id="gender"
                  className={getInputClass('gender')}
                  onChange={handleInputChange('gender', 'default')}
                  value={formData.gender || ''}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              {/* Nationality - Required */}
              <div className="flex flex-col">
                <label>Nationality *</label>
                <input
                  id="nationality"
                  className={getInputClass('nationality')}
                  placeholder="Nationality"
                  onChange={handleInputChange('nationality', 'name', 50)}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={50}
                />
                {errors.nationality && (
                  <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
                )}
              </div>

              {/* Marital Status - Required */}
              <div className="flex flex-col">
                <label>Marital Status *</label>
                <select
                  id="maritalStatus"
                  className={getInputClass('maritalStatus')}
                  onChange={handleInputChange('maritalStatus', 'default')}
                  value={formData.maritalStatus || ''}
                >
                  <option value="">Select Status</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
                {errors.maritalStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>
                )}
              </div>

              {/* Contact Number - Required */}
              <div className="flex flex-col">
                <label>Contact Number *</label>
                <input
                  id="contact"
                  className={getInputClass('contact')}
                  placeholder="Contact Number"
                  onChange={handleInputChange('contact', 'phone', 15)}
                  onKeyPress={handleKeyPress('phone')}
                  onPaste={handlePaste('phone')}
                  maxLength={15}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              {/* Email - Required */}
              <div className="flex flex-col">
                <label>Email ID *</label>
                <input
                  id="email"
                  className={getInputClass('email')}
                  placeholder="Email ID"
                  onChange={handleInputChange('email', 'email', 100)}
                  maxLength={100}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Present Address - Required */}
              <div className="flex flex-col md:col-span-2">
                <label>Present Address *</label>
                <textarea
                  id="presentAddress"
                  rows={2}
                  className={getInputClass('presentAddress')}
                  placeholder="Present Address"
                  value={presentAddress}
                  onChange={handlePresentAddressChange}
                  onKeyPress={handleKeyPress('address')}
                  onPaste={handlePaste('address')}
                  maxLength={200}
                />
                {errors.presentAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.presentAddress}</p>
                )}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={sameAsPresent}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Same as Present Address
                </label>
              </div>

              {/* Permanent Address - Not required unless different */}
              <div className="flex flex-col md:col-span-2">
                <label>Permanent Address {!sameAsPresent && '*'}</label>
                <textarea
                  rows={2}
                  className={inputClass}
                  placeholder="Permanent Address"
                  value={permanentAddress}
                  onChange={(e) => {
                    const value = sanitizeInput(e.target.value, 'address').slice(0, 200);
                    setPermanentAddress(value);
                    setFormData((prev) => ({ ...prev, permanentAddress: value }));
                  }}
                  onKeyPress={handleKeyPress('address')}
                  onPaste={handlePaste('address')}
                  maxLength={200}
                  disabled={sameAsPresent}
                />
              </div>

              {/* Job Applied For - Required */}
              <div className="flex flex-col md:col-span-2">
                <label>Job Applied For *</label>
                <input
                  id="jobApplied"
                  className={getInputClass('jobApplied')}
                  placeholder="Job Applied For"
                  onChange={handleInputChange('jobApplied', 'generalText', 100)}
                  onKeyPress={handleKeyPress('generalText')}
                  onPaste={handlePaste('generalText')}
                  maxLength={100}
                />
                {errors.jobApplied && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobApplied}</p>
                )}
              </div>

              {/* Agent Name - Not required */}
              <div className="flex flex-col">
                <label>Agent Name</label>
                <input
                  className={inputClass}
                  placeholder="Agent Name"
                  onChange={handleInputChange('agentName', 'name', 50)}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={50}
                />
              </div>

              {/* Agent Code - Not required */}
              <div className="flex flex-col">
                <label>Agent Code</label>
                <input
                  className={inputClass}
                  placeholder="Agent Code"
                  onChange={handleInputChange('agentCode', 'alphanumeric', 20)}
                  onKeyPress={handleKeyPress('alphanumeric')}
                  onPaste={handlePaste('alphanumeric')}
                  maxLength={20}
                />
              </div>
            </div>

            {/* EXPERIENCE SECTION - Not required */}
            <h2 className="text-[#642c92] text-lg font-semibold mt-6 mb-2">EXPERIENCE DETAILS</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label>Company Name</label>
                  <input
                    className={inputClass}
                    value={exp.companyName}
                    onChange={(e) =>
                      updateArray(
                        setExperiences,
                        index,
                        'companyName',
                        e.target.value,
                        'generalText',
                        100
                      )
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="Company Name"
                    maxLength={100}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Designation</label>
                  <input
                    className={inputClass}
                    value={exp.designation}
                    onChange={(e) =>
                      updateArray(
                        setExperiences,
                        index,
                        'designation',
                        e.target.value,
                        'generalText',
                        50
                      )
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="Designation"
                    maxLength={50}
                  />
                </div>
                <div className="flex flex-col">
                  <label>From</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={exp.from}
                    onChange={(e) =>
                      updateArray(setExperiences, index, 'from', e.target.value, 'default')
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label>To</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={exp.to}
                    onChange={(e) =>
                      updateArray(setExperiences, index, 'to', e.target.value, 'default')
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label>Final Salary</label>
                  <input
                    className={inputClass}
                    value={exp.salary}
                    onChange={(e) =>
                      updateArray(setExperiences, index, 'salary', e.target.value, 'decimal', 15)
                    }
                    onKeyPress={handleKeyPress('decimal')}
                    onPaste={handlePaste('decimal')}
                    placeholder="Final Salary"
                    maxLength={15}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Reason for Exit</label>
                  <input
                    className={inputClass}
                    value={exp.reason}
                    onChange={(e) =>
                      updateArray(
                        setExperiences,
                        index,
                        'reason',
                        e.target.value,
                        'generalText',
                        200
                      )
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="Reason for Exit"
                    maxLength={200}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addExperience();
              }}
              className="bg-[#642c92] text-white px-4 py-2 rounded mb-6"
            >
              Add More Experience
            </button>

            {/* EDUCATION SECTION - Not required */}
            <h2 className="text-[#642c92] text-lg font-semibold mt-6 mb-2">
              EDUCATION QUALIFICATION
            </h2>
            {educations.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label>Qualification</label>
                  <input
                    className={inputClass}
                    value={edu.qualification}
                    onChange={(e) =>
                      updateArray(
                        setEducations,
                        index,
                        'qualification',
                        e.target.value,
                        'generalText',
                        100
                      )
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="Qualification"
                    maxLength={100}
                  />
                </div>
                <div className="flex flex-col">
                  <label>University/Institute</label>
                  <input
                    className={inputClass}
                    value={edu.institute}
                    onChange={(e) =>
                      updateArray(
                        setEducations,
                        index,
                        'institute',
                        e.target.value,
                        'generalText',
                        150
                      )
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="University/Institute"
                    maxLength={150}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Year of Passing</label>
                  <input
                    className={inputClass}
                    value={edu.year}
                    onChange={(e) =>
                      updateArray(setEducations, index, 'year', e.target.value, 'year', 4)
                    }
                    onKeyPress={handleKeyPress('numeric')}
                    onPaste={handlePaste('numeric')}
                    placeholder="Year of Passing"
                    maxLength={4}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Marks</label>
                  <input
                    className={inputClass}
                    value={edu.marks}
                    onChange={(e) =>
                      updateArray(setEducations, index, 'marks', e.target.value, 'marks', 10)
                    }
                    onKeyPress={handleKeyPress('marks')}
                    onPaste={handlePaste('marks')}
                    placeholder="Marks"
                    maxLength={10}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addEducation();
              }}
              className="bg-[#642c92] text-white px-4 py-2 rounded mb-6"
            >
              Add More Education
            </button>

            {/* SKILL SECTION - Not required */}
            <h2 className="text-[#642c92] text-lg font-semibold mt-6 mb-2">
              SKILL & TRADE DETAILS
            </h2>
            {skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label>Skill/Trade Name</label>
                  <input
                    className={inputClass}
                    value={skill.skillName}
                    onChange={(e) =>
                      updateArray(setSkills, index, 'skillName', e.target.value, 'generalText', 50)
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="Skill/Trade Name"
                    maxLength={50}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Institute Name</label>
                  <input
                    className={inputClass}
                    value={skill.institute}
                    onChange={(e) =>
                      updateArray(setSkills, index, 'institute', e.target.value, 'generalText', 100)
                    }
                    onKeyPress={handleKeyPress('generalText')}
                    onPaste={handlePaste('generalText')}
                    placeholder="Institute Name"
                    maxLength={100}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Years of Experience</label>
                  <input
                    className={inputClass}
                    value={skill.experience}
                    onChange={(e) =>
                      updateArray(setSkills, index, 'experience', e.target.value, 'numeric', 2)
                    }
                    onKeyPress={handleKeyPress('numeric')}
                    onPaste={handlePaste('numeric')}
                    placeholder="Years of Experience"
                    maxLength={2}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addSkill();
              }}
              className="bg-[#642c92] text-white px-4 py-2 rounded mb-6"
            >
              Add More Skills
            </button>

            {/* Language Section - Not required */}
            <h2 className="text-[#642c92] text-lg font-semibold mt-6 mb-2">LANGUAGES KNOWN</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                  className="border px-4 py-2 rounded"
                  placeholder="Language"
                  onChange={(e) => {
                    const value = sanitizeInput(e.target.value, 'name').slice(0, 20);
                    e.target.value = value;
                  }}
                  onKeyPress={handleKeyPress('name')}
                  onPaste={handlePaste('name')}
                  maxLength={20}
                />
                <select className="border px-4 py-2 rounded">
                  <option>Read</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <select className="border px-4 py-2 rounded">
                  <option>Write</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <select className="border px-4 py-2 rounded">
                  <option>Speak</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            ))}

            {/* Declaration with checkbox */}
            <div className="mt-4 mb-6">
              <label className="inline-flex items-start text-base text-gray-700">
                <input 
                  type="checkbox" 
                  className="mr-2 mt-1" 
                  required 
                  checked={formData.declaration || false}
                  onChange={(e) => setFormData(prev => ({...prev, declaration: e.target.checked}))}
                />
                <span>
                  I declare that the information given, herein above, is true and correct to the
                  best of my knowledge and belief and nothing material has been concealed.
                </span>
              </label>
              {errors.declaration && (
                <p className="text-red-500 text-sm mt-1">You must accept the declaration</p>
              )}
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <button
                type="submit"
                className="bg-[#642c92] text-white px-8 py-3 rounded font-semibold text-base transition-transform duration-200 hover:scale-105 hover:bg-[#4f2275]"
              >
                SUBMIT
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CandidateApplicationForm;
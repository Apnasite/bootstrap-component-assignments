class InterviewSelectionComponent extends HTMLElement {
  constructor() {
    super();
    this.industrySelect = null;
    this.roleSelect = null;
    this.skillsContainer = null;
    this.submitBtn = null;
    this.industryError = null;
    this.roleError = null;
    this.skillsError = null;
    this.popup = null;
    this.closePopup = null;
    this.data = null;
  }

  connectedCallback() {
    this.renderComponent();
    this.updateData();
    this.industrySelect.addEventListener('change', () => this.populateRoles());
    this.roleSelect.addEventListener('change', () => this.populateSkills());
    this.submitBtn.addEventListener('click', () => this.submitSelection());
    this.closePopup.addEventListener('click', () => this.popup.style.display = 'none');
  }

  renderComponent() {
    this.innerHTML = `
       <div class="p-3 bg-dark text-white" data-bs-theme="dark">
        <div class="container">
          <div class="text-center mb-4">
                <h2>🚀 Apna AI Interviewer – Your Smart Interview Coach!</h2>
                <p>🎯 Personalized Mock Interviews for Your Dream Job. Select your industry, role, and key skills, and let AI guide you with real-time feedback. Sign up now and start your free mock interview!</p>
          </div>
          <div class="row text-left ">
            <div class="col-md-6">
              <div class="form-group">
                <label for="industrySelect">Industry</label>
                <select class="form-control" id="industrySelect">
                  <option value="">Select Industry</option>
                  <option value="It-Industry">IT Industry</option>
                </select>
                <div id="industryError" class="text-danger"></div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="roleSelect">Role</label>
                <select class="form-control" id="roleSelect">
                  <option value="">Select Role</option>
                </select>
                <div id="roleError" class="text-danger"></div>
              </div>
            </div>
          </div>
          <div class="form-group" id="skillsContainer" class="text-left">
            <label>Skills</label><br>
            <div id="skillsError" class="text-danger"></div>
            <div class="d-flex flex-wrap" id="skillsList">
            </div>
          </div>
          <div class="text-center p-3">
            <button id="submitBtn" class="btn btn-success">Start Interview</button>
          </div>
          
        </div>
      </div>
      <div id="popup" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
        <p>Please select at least one skill.</p>
        <button id="closePopup" class="btn btn-secondary">Close</button>
      </div>
    `;

    this.industrySelect = this.querySelector('#industrySelect');
    this.roleSelect = this.querySelector('#roleSelect');
    this.skillsContainer = this.querySelector('#skillsContainer');
    this.submitBtn = this.querySelector('#submitBtn');
    this.industryError = this.querySelector('#industryError');
    this.roleError = this.querySelector('#roleError');
    this.skillsError = this.querySelector('#skillsError');
    this.popup = this.querySelector('#popup');
    this.closePopup = this.querySelector('#closePopup');
  }
  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data') {
      this.updateData();
    }
  }

  updateData() {
    const rawData = this.getAttribute('data');
    try {
      this.data = JSON.parse(rawData);
      console.log('Received data:', this.data);
    } catch (error) {
      console.error('Invalid JSON data:', rawData);
    }
  }

  populateRoles() {
    const selectedIndustry = this.industrySelect.value;
    this.roleSelect.innerHTML = '<option value="">Select Role</option>';
    this.skillsContainer.innerHTML = '<label>Skills</label><br>';

    if (selectedIndustry === 'It-Industry') {
      this.addRoleOptions([
        'Full Stack Developer',
        'Software Tester',
        'DevOps Engineer',
        'Software Engineer',
        'Data Scientist',
        'Project Manager',
        'MEAN Stack Developer',
        'MERN Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Mobile App Developer'
      ]);
    }
     else if (selectedIndustry === 'finance') {
      this.addRoleOptions(['Financial Analyst', 'Accountant', 'Investment Banker']);
    } else if (selectedIndustry === 'healthcare') {
      this.addRoleOptions(['Doctor', 'Nurse', 'Medical Technician']);
    } else if (selectedIndustry === 'education') {
        this.addRoleOptions(['Teacher', 'Professor', 'Administrator']);
    }
  }

  addRoleOptions(roles) {
    roles.forEach(role => {
      const option = document.createElement('option');
      option.value = role.toLowerCase().replace(/\s+/g, '-');
      option.textContent = role;
      this.roleSelect.appendChild(option);
    });
  }

  populateSkills() {
    const selectedRole = this.roleSelect.value;
    this.skillsContainer.innerHTML = '<label>Skills</label><br>';

    if (selectedRole === 'software-engineer') {
      this.addSkillCheckboxes(['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'C++']);
    } else if (selectedRole === 'data-scientist') {
      this.addSkillCheckboxes(['Python', 'R', 'Machine Learning', 'Data Analysis', 'SQL', 'TensorFlow', 'PyTorch']);
    } else if (selectedRole === 'financial-analyst') {
      this.addSkillCheckboxes(['Financial Modeling', 'Data Analysis', 'Accounting', 'Excel', 'Bloomberg Terminal', 'Financial Reporting']);
    } else if (selectedRole === 'teacher') {
      this.addSkillCheckboxes(['Communication', 'Lesson Planning', 'Classroom Management', 'Subject Matter Expertise', 'Pedagogy']);
    } else if (selectedRole === 'software-tester') {
      this.addSkillCheckboxes(['Test Planning', 'Test Execution', 'Bug Tracking', 'Automation Testing', 'Selenium', 'Jira']);
    } else if (selectedRole === 'devops-engineer') {
      this.addSkillCheckboxes(['CI/CD', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'Terraform']);
    } else if (selectedRole === 'full-stack-developer') {
      this.addSkillCheckboxes(['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Databases', 'API Design']);
    } else if (selectedRole === 'mean-stack-developer') {
      this.addSkillCheckboxes(['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JavaScript', 'TypeScript']);
    } else if (selectedRole === 'mern-stack-developer') {
      this.addSkillCheckboxes(['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript']);
    } else if (selectedRole === 'frontend-developer') {
      this.addSkillCheckboxes(['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js', 'UI/UX']);
    } else if (selectedRole === 'backend-developer') {
      this.addSkillCheckboxes(['Node.js', 'Python', 'Java', 'Databases', 'API Development', 'Server Management']);
    } else if (selectedRole === 'mobile-app-developer') {
        this.addSkillCheckboxes(['Android Development', 'iOS Development', 'React Native', 'Flutter', 'Java', 'Swift', 'Kotlin']);
    }
  }

  addSkillCheckboxes(skills) {
    skills.forEach(skill => {
      const skillId = skill.toLowerCase().replace(/\s+/g, '-');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = skillId;
      checkbox.value = skillId;
      checkbox.classList.add('m-2');
      const label = document.createElement('label');
      label.htmlFor = skillId;
      label.textContent = skill;
      label.classList.add('mr-2');
      this.skillsContainer.appendChild(checkbox);
      this.skillsContainer.appendChild(label);
    });
  }

  submitSelection() {
    this.industryError.textContent = '';
    this.roleError.textContent = '';
    this.skillsError.textContent = '';

    const selectedIndustry = this.industrySelect.value;
    const selectedRole = this.roleSelect.value;
    const selectedSkills = Array.from(this.skillsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    let isValid = true;

    if (!selectedIndustry) {
      this.industryError.textContent = 'Industry is required.';
      isValid = false;
      return;
    }
    if (!selectedRole) {
      this.roleError.textContent = 'Role is required.';
      isValid = false;
      return;
    }
    if (selectedSkills.length === 0) {
      this.popup.style.display = 'block';
      isValid = false;
      return;
    }

    if (!isValid) {
      return;
    }

    const selectionData = {
      industry: selectedIndustry,
      role: selectedRole,
      skills: selectedSkills.join(' '),
    };

    console.log('Selected data:', selectionData);
    if(this.data && this.data.UserDetails && this.data.UserDetails.id){
      const customEvent = new CustomEvent('redirect', {
        bubbles: true,
        cancelable: true,
        detail: {
          data: {
            isExternalRedirect: false,
            redirectUrl: `/test/67b97e9b6da0f38ed9f7bf7a/Interview`,
            queryParams: JSON.stringify(selectionData)
          }
        }
      });
      this.dispatchEvent(customEvent);
    }else{
      let queryParams = {
        source:'InterviewLandingPage',
        leadCategory:'Service',
        leadType:'Interview',
        module:'LMS',
        placement:'SkillsSelectionComponent',
        redirect:`test/67b97e9b6da0f38ed9f7bf7a/interview?industry=${selectedIndustry}&role=${selectedRole}&skills=${selectedSkills.join(',')}`
      }
      const customEvent = new CustomEvent('redirect', {
        bubbles: true,
        cancelable: true,
        detail: {
          data: {
            isExternalRedirect: false,
            redirectUrl: `/auth/quick-register`,
            queryParams:JSON.stringify( queryParams)
          }
        }
      });
      this.dispatchEvent(customEvent);
    }
  }
}

customElements.define('interview-selection-component', InterviewSelectionComponent);